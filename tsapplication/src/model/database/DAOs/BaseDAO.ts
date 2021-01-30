import sqlite3 from 'sqlite3';

export abstract class BaseDAO {

    protected tableName: string;
    protected db: sqlite3.Database;
    protected columns: Array<string>;

    constructor(db: sqlite3.Database, tableName: string) {
        this.db = db;
        this.tableName = tableName;
        this.createTable();
        this.columns = new Array();
    }

    private doesTableExist(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.db.get(`SELECT name FROM sqlite_master WHERE type='table' AND name='${this.tableName}';`,
            (error, row) => {
                if(error)
                    throw new Error(error.message);
                resolve(row? true : false);
            });
        });
    }
    
    protected doesEntryExist(rowid: number): Promise<boolean> {
        return new Promise ((resolve, reject) => {
            this.db.get(`SELECT * FROM ${this.tableName} WHERE rowid = ?;`, [rowid],
            (error, row) => {
                if(error)
                    reject(error.message);
                resolve(row ? true : false);
            });
        });
    }

    protected saveEntry<T extends Object>(entry: T): Promise<void> {
        return new Promise((resolve, reject) => {
            var cols = Object.keys(entry).join(', ');
            var vals = Object.values(entry);
            this.db.run(`INSERT INTO ${this.tableName} (${cols}) VALUES (${'?'.repeat(vals.length)});`, vals, 
            (error) => {
                if(error)
                    reject(error.message);
                console.log(`"${entry.toString()}" created.`);
                resolve();
            });
        })
    }

    protected deleteEntry(rowid: number): Promise<void> {
        return new Promise((resolve, reject) => {
            this.db.run(`DELETE FROM ${this.tableName} WHERE rowid = ?;`, [rowid],
            (error) => {
                if(error)
                    reject(error.message);
                resolve();
            });
        });
    }

    protected getEntryById<T>(rowid: number): Promise<T> {
        return new Promise((resolve, reject) => {
            this.db.get(`SELECT * FROM ${this.tableName} WHERE rowid = ?;`, [rowid],
            (error, row) => {
                if(error)
                    reject(error.message);
                resolve(row);
            });
        });
    }

    protected getAllEntries<T>(): Promise<Array<T>> {
        return new Promise((resolve, reject) => {
            var res = new Array<T>();
            this.db.all(`SELECT * FROM ${this.tableName};`, (error, rows) => {
                    if(error)
                        reject(error.message);
                    rows.forEach((row) => {
                        res.push(row);
                });
                resolve(res);
            });
        });
    }

    protected updateEntry<T extends Object>(rowid: number, updatedEntry: T): Promise<void> {
        return new Promise ((resolve, reject) => {
            var fields = [];
            for(var key in updatedEntry)
                fields.push(`${key} = '${updatedEntry[key]}'`);
            this.db.get(`UPDATE ${this.tableName} SET ${fields.join(', ')} WHERE rowid = ?;`, [rowid],
            (error, row) => {
                if(error)
                    reject(error.message);
                resolve(row);
            });
        });
    }
    
    abstract createTable(): void;

    protected async initTable(tableColumns: {[columnName: string] : Array<string>}) {

        if(!await this.doesTableExist()){
            var content = "";
            for(let column in tableColumns) {
            
                var options = '';
                var current = tableColumns[column];
    
                switch (column.toLowerCase()) {
                    case "pk":
                        for(let option in current)
                            options += ` ${current[option]},`;
                        options = options.slice(0, -1);
                        content += ` PRIMARY KEY(${options})`;
                        break;
                    case "fk":
                        var sliced = current.slice(3);
                        for(let option in sliced) 
                            options += `${sliced[option].toUpperCase()}`;
                        content += ` FOREIGN KEY(${current[0]}) REFERENCES ${current[1]}(${current[2]}) ${options}`;
                        break
                    default:
                        content += column;
                        for(let option in tableColumns[column])
                            content += ` ${tableColumns[column][option].toUpperCase()}`;
                        break;
                }
                content += ',';
            }
    
            content = content.slice(0, -1);
            var fullQuery = `CREATE TABLE IF NOT EXISTS ${this.tableName}(${content});`
            //console.log(fullQuery);
            this.db.run(fullQuery, (error) => {
                if(error)
                    throw new Error(error.message);
                console.log(`Table "${this.tableName}" created.`);
            });
        }
        this.db.run("PRAGMA foreign_keys = ON;");
    }
}