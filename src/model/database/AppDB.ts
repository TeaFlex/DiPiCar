import {UserDAO} from './DAOs/UserDAO';
import fs from 'fs/promises';
import StormDB from 'stormdb';
import { resolvePath, Path } from '../../utilities/Path';

export class AppDB {

    public static dbFile: string = 'dbapp.json';
    private static db: StormDB;
    private static appDB: AppDB;
    //Only DAO attributes can be non static.
    public userDAO: UserDAO;
    public static structure: any = {};

    private constructor() { 
        //DAOs
        this.userDAO = new UserDAO(AppDB.db);
    }

    public static async getInstance() {
        if(!AppDB.appDB){ 
            await fs.mkdir(Path.env.dbPath , {recursive: true});
            const engine = new StormDB.localFileEngine(
                resolvePath(Path.env.dbPath, this.dbFile), 
                {
                    serialize: (data: any) => JSON.stringify(data, undefined, 4)
                }
            );
            this.db = new StormDB(engine);
            AppDB.appDB = new AppDB();
            this.db.default(this.structure);
            await this.db.save();
        }
        return this.appDB;
    }

    public static async deleteDatabase() {
        try {
            return await fs.rm(resolvePath(Path.env.dbPath, this.dbFile));
        } catch (error) {
            return false;
        }
    }
}