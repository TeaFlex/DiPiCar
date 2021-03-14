import StormDB from 'stormdb';
import {BaseDAO} from './BaseDAO';
import {User, UserStats} from '../Entities/User';

export class UserDAO extends BaseDAO{

    constructor(db: StormDB) {
        super(db, "User");
    }

    saveUser(user: User): Promise<number> {
        user = {
            name: user.name,
            stats: {
                gameTime: 0,
                firstConnection: new Date(),
                lastConnection: new Date()
            }
        }
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

    async getStatsById(id: number): Promise<UserStats> {
        const u = await this.getUserById(id);
        return u.stats!;
    }

    async updateStats(id: number, stats: UserStats): Promise<void>{
        const u = await this.getUserById(id);
        u.stats = {
            ...u.stats,
            ...{
                gameTime: stats.gameTime,
                lastConnection: new Date()
            }
        };
        this.updateEntry<User>(id, u);
    }
}