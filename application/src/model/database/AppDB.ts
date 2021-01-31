import sqlite3 from 'sqlite3';
import {open, Database} from 'sqlite';
import {BaseDAO} from './DAOs/BaseDAO';
import {UserDAO} from './DAOs/UserDAO';
import {UserStatsDAO} from './DAOs/UserStatsDAO';

export class AppDB {

    public static dbPath: string = './data/dbapp.db';
    private static db: Database;
    private static appDB: AppDB;
    //Only DAO attributes can be non static.
    public userDAO: UserDAO;
    public userStatsDAO: UserStatsDAO;

    private constructor() { 
        //DAOs
        this.userDAO = new UserDAO(AppDB.db);
        this.userStatsDAO = new UserStatsDAO(AppDB.db);
    }

    public static async closeDB() {
        await this.db.close();
        console.log("Database closed.");
    }

    public static async getInstance(): Promise<AppDB> {
        if(AppDB.appDB == null){ 
            this.db = await open({
                filename: AppDB.dbPath,
                driver: sqlite3.Database
            });
            AppDB.appDB = new AppDB();
            for(var dao of Object.values(this.appDB))
                await (<BaseDAO>dao).createTable();
        }
        return this.appDB;
    }
}