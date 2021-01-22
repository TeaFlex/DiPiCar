import {Database} from 'sqlite3';
import sqlite3 from 'sqlite3';
import {BaseDAO} from './BaseDAO';
import {User} from '../Entities/User';
import { resolveModuleName } from 'typescript';

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
            this.db.all(`SELECT id, name FROM ${this.tableName};`, (error, rows) => {
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
            id: "integer PRIMARY KEY",
            name: "text NOT NULL"        
        });
    }
}