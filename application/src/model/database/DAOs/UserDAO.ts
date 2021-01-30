import sqlite3 from 'sqlite3';
import {BaseDAO} from './BaseDAO';
import {User} from '../Entities/User';

export class UserDAO extends BaseDAO{

    constructor(db: sqlite3.Database) {
        super(db, "User");
    }

    saveUser(user: User): Promise<void> {
        return this.saveEntry<User>(user);
    }

    deleteUser(id: number): Promise<void> {
        return this.deleteEntry(id);
    }

    getUserById(id: number): Promise<User>{
        return this.getEntryById<User>(id);
    }

    getAllUsers(): Promise<Array<User>> {
        return this.getAllEntries<User>();
    }

    createTable(): void{
        super.initTable({
            id: ["integer"],
            name: ["text", "not null", "unique"],
            pk: ["id"] 
        });
    }
}