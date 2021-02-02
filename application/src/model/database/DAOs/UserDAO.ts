import sqlite from 'sqlite';
import {BaseDAO} from './BaseDAO';
import {User} from '../Entities/User';

export class UserDAO extends BaseDAO{

    constructor(db: sqlite.Database) {
        super(db, "User");
    }

    saveUser(user: User): Promise<number> {
        return this.saveEntry<User>(user);
    }

    deleteUser(id: number): Promise<void> {
        return this.deleteEntry(id);
    }

    async doesUserNameExist(name: string): Promise<boolean> {
        try {
            if(await this.getUserByName(name) === undefined)
                return new Promise((resolve) => resolve(false));
            return new Promise((resolve) => resolve(true));
        } catch (error) {
            return new Promise((resolve) => resolve(false));
        }
    }

    getUserById(id: number): Promise<User>{
        return this.getEntryById<User>(id);
    }

    getUserByName(name: string): Promise<User> {
        return this.getEntryByColumn<User>("name", name);
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