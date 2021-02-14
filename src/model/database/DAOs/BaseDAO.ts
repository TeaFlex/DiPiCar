import sqlite from 'sqlite';

export abstract class BaseDAO {

    protected tableName: string;
    protected db: sqlite.Database;

    constructor(db: sqlite.Database, tableName: string) {
        this.db = db;
        this.tableName = tableName;
    }

    public async doesTableExist(): Promise<boolean> {
        var query = `SELECT name FROM sqlite_master 
                    WHERE type='table' 
                    AND name='${this.tableName}';`;
        var s = await this.db.get(query);
        return s != null;
    }
    
    public async doesEntryExist(rowid: number): Promise<boolean> {
        var query = `SELECT * 
                    FROM ${this.tableName} 
                    WHERE rowid = ?;`;
        var s = await this.db.get(query , [rowid]);
        return s != null;
    }

    protected async saveEntry<T extends Object>(entry: T): Promise<number> {
        var cols = Object.keys(entry).join(', ');
        var vals = Object.values(entry);
        var query = `INSERT INTO ${this.tableName} (${cols}) 
                    VALUES (${'?,'.repeat(vals.length).slice(0, -1)});`;          
        await this.db.run(query, vals);
        var s = await this.db.get('SELECT last_insert_rowid() as last_id;');
        return s["last_id"];
    }

    protected async deleteEntry(rowid: number): Promise<void> {
        var query = `DELETE FROM ${this.tableName} WHERE rowid = ?;`;
        await this.db.run(query, [rowid]);
    }

    protected async getEntryById<T>(rowid: number): Promise<T> {
        var query = `SELECT * FROM ${this.tableName} WHERE rowid = ?;`;
        var s = await this.db.get(query, [rowid]);
        return s;
    }

    protected async getEntryByColumn<T>(column: string, value: string): Promise<T> {
        var query = `SELECT * FROM ${this.tableName} WHERE ${column.trim()} = ?;`;
        var s = await this.db.get(query, [value.trim()]);
        return s;
    }

    protected async getAllEntries<T>(): Promise<Array<T>> {
        var res = new Array<T>();
        var query = `SELECT * FROM ${this.tableName};`;
        var s = await this.db.all(query);
        s.forEach((row) => {
            res.push(row);
        });
        return res;
    }

    protected async updateEntry<T extends Object>(rowid: number, updatedEntry: T): Promise<void> {
        var fields = [];
        for(var key in updatedEntry)
            fields.push(`${key} = '${updatedEntry[key]}'`);
        var query = `UPDATE ${this.tableName} 
                    SET ${fields.join(', ')} 
                    WHERE rowid = ?;`;
        await this.db.get(query, [rowid]);
    }
    
    abstract createTable(): Promise<void>;

    protected async initTable(tableColumns: {[columnName: string] : Array<string>}): Promise<void> {
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
            var query = `CREATE TABLE IF NOT EXISTS ${this.tableName}(${content});`;
            await this.db.run(query);
            console.log(`Table ${this.tableName} created.`);
        }
        await this.db.run("PRAGMA foreign_keys = ON;");
    }
}