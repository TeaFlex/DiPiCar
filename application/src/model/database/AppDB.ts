import sqlite3 from 'sqlite3';
import {UserDAO} from './DAOs/UserDAO';
import {UserStatsDAO} from './DAOs/UserStatsDAO';

export class AppDB {

    public static dbPath: string = './data/dbapp.db';
    private db: sqlite3.Database;
    private static appDB: AppDB;
    public userDAO: UserDAO;
    public userStatsDAO: UserStatsDAO;

    private constructor() { 
        this.db = new sqlite3.Database(AppDB.dbPath, error => {
            if(error) 
                throw new Error(`Connection impossible: ${error.message}`);
            console.log("Connection to database successful.");
        });
        //DAOs
        this.userDAO = new UserDAO(this.db);
        this.userStatsDAO = new UserStatsDAO(this.db);
    }

    public closeDB(): void {
        this.db.close(error => {
            if(error) 
                throw new Error(error.message);
            console.log("Database closed.");
        });
    }

    public static getInstance(): AppDB {
        if(AppDB.appDB == null)
            AppDB.appDB = new AppDB();
        return this.appDB;
    }
}