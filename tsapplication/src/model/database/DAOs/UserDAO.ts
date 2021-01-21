import {Database} from 'sqlite3';
import sqlite3 from 'sqlite3';
import {BaseDAO} from './BaseDAO';
import {User} from '../Entities/User';

export class UserDAO extends BaseDAO{

    constructor(db: sqlite3.Database) {
        super(db, "User");
    }

    saveUser(user: User) {
        //this.db.run(`INSERT INTO ${this.tableName} ()`)
    }

    getUserById(dbId: number): User{
        return {id: dbId, 
            firstname:"test",
            lastname: "test",
            password: "test"
        }
    }

    createTable(): void{
        super.initTable({
            id: "integer PRIMARY KEY",
            fisrtname: "text NOT NULL",
            lastname: "text NOT NULL",
            password: "text NOT NULL"
        });
    }
}