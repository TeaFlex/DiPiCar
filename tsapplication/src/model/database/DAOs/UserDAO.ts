import sqlite3 from 'sqlite3';
import {BaseDAO} from './BaseDAO';
import {User} from '../Entities/User';

export class UserDAO extends BaseDAO{

    constructor(db: sqlite3.Database) {
        super(db, "User");
    }

    saveUser(user: User) {
        this.db.run(`INSERT INTO ${this.tableName} (name) VALUES (?);`, [user.name], 
        (error) => {
            if(error)
                throw new Error(error.message);
            console.log(`User "${user.name}" created.`);
        });
    }

    getUserById(dbId: number): User{
        return {id: dbId, 
            name:"test"
        }
    }

    getAllUsers(): Promise<Array<User>> {
        return new Promise((resolve, reject) => {
            var res = new Array<User>();
            this.db.all(`SELECT userID, name FROM ${this.tableName};`, (error, rows) => {
                if(error)
                    throw new Error(error.message);
                rows.forEach((row) => {
                    res.push({id: row.id, name: row.name});
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