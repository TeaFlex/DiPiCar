import sqlite3 from 'sqlite3';
import {UserDAO} from './DAOs/UserDAO';
import {UserStatsDAO} from './DAOs/UserStatsDAO';

export class AppDB {

    private dbPath: string = './data/dbapp.db';
    private db: sqlite3.Database;
    public  userDAO: UserDAO;
    public  userStatsDAO: UserStatsDAO;

    constructor() { 
        this.db = new sqlite3.Database(this.dbPath, error => {
            if(error) 
                throw new Error(`Connection impossible: ${error.message}`);
            console.log("Connection to database successful.");
        });
        //DAOs
        this.userDAO = new UserDAO(this.db);
        this.userStatsDAO = new UserStatsDAO(this.db);
    }

    closeDB(): void {
        this.db.close(error => {
            if(error) 
                throw new Error(error.message);
            console.log("Database closed.");
        });
    } 

    setPath(path: string): void {
        this.dbPath = path;
    }

    getPath(): string {
        return this.dbPath;
    }
}