import {UserDAO} from './DAOs/UserDAO';
import StormDB from 'stormdb';

export class AppDB {

    public static dbPath: string = './data/dbapp.json';
    private static db: StormDB;
    private static appDB: AppDB;
    //Only DAO attributes can be non static.
    public userDAO: UserDAO;
    public static structure: any = {};

    private constructor() { 
        //DAOs
        this.userDAO = new UserDAO(AppDB.db);
    }

    public static async getInstance(): Promise<AppDB> {
        if(AppDB.appDB == null){ 
            const engine = new StormDB.localFileEngine(this.dbPath);
            this.db = new StormDB(engine);
            
            AppDB.appDB = new AppDB();
            this.db.default(this.structure);
            await this.db.save();
        }
        return this.appDB;
    }
}