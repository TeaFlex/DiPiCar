import sqlite3 from 'sqlite3';
import {UserDAO} from './DAOs/UserDAO';

export class AppDB {

    private db: sqlite3.Database;
    public  userDAO: UserDAO;

    constructor(dbPath: string) { 
        this.db = new sqlite3.Database(dbPath, error => {
            if(error) 
                throw new Error(`Connection impossible: ${error.message}`);
            console.log("Connection to database successful.");
        });
        //DAOs
        this.userDAO = new UserDAO(this.db);
    }

    closeDB() {
        this.db.close(error => {
            if(error) 
                throw new Error(error.message);
            console.log("Database closed.");
        });
    } 
}