import sqlite3 from 'sqlite3';
import {BaseDAO} from './BaseDAO';
import {User} from '../Entities/User';

export class UserDAO extends BaseDAO{

    constructor(db: sqlite3.Database) {
        super(db, "User");
    }

    saveUser(user: User): Promise<void> {
        return new Promise((resolve, reject) => {
            this.db.run(`INSERT INTO ${this.tableName} (name) VALUES (?);`, [user.name], 
            (error) => {
                if(error)
                    reject(error.message);
                console.log(`User "${user.name}" created.`);
                resolve();
            });
        })
    }

    getUserById(dbId: number): Promise<User>{
        return new Promise((resolve, reject) => {
            
        });
    }

    getAllUsers(): Promise<Array<User>> {
        return new Promise((resolve, reject) => {
            var res = new Array<User>();
            this.db.all(`SELECT userID AS id, name FROM ${this.tableName};`, (error, rows) => {
                if(error)
                    reject(error.message);
                rows.forEach((row) => {
                    res.push(row);
                });
                resolve(res);
            });
        });
    }

    createTable(): void{
        super.initTable({
            userID: ["integer"],
            name: ["text", "not null", "unique"],
            pk: ["userID"] 
        });
    }
}