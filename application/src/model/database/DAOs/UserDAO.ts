import sqlite from 'sqlite';
import {BaseDAO} from './BaseDAO';
import {User} from '../Entities/User';

export class UserDAO extends BaseDAO{

    constructor(db: sqlite.Database) {
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

    async createTable(): Promise<void>{
        await super.initTable({
            id: ["integer"],
            name: ["text", "not null", "unique"],
            pk: ["id"] 
        });
    }
}