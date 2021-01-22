import sqlite3 from 'sqlite3';

export abstract class BaseDAO {

    protected tableName: string;
    protected db: sqlite3.Database;

    constructor(db: sqlite3.Database, tableName: string) {
        this.db = db;
        this.tableName = tableName;
        this.createTable();
    }
    
    abstract createTable(): void;

    protected initTable(tableColumns: {[columnName: string] : string}) {
        var cols = "";
        for(let key in tableColumns) {
            cols += `${key} ${tableColumns[key]},`
        }
        cols = cols.slice(0, -1);
        this.db.run(`CREATE TABLE IF NOT EXISTS ${this.tableName}(${cols});`, 
        (error) => {
            if(error)
                throw new Error(error.message);
            console.log(`Table "${this.tableName}" initialized.`);
        });
    }
}