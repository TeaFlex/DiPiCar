import sqlite3 from 'sqlite3';

export abstract class BaseDAO {

    protected tableName: string;
    protected db: sqlite3.Database;

    constructor(db: sqlite3.Database, tableName: string) {
        this.db = db;
        this.tableName = tableName;
        this.createTable();
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