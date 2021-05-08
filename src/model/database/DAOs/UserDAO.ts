import {BaseDAO} from './BaseDAO';
import {User, UserStats} from '../Entities';

export class UserDAO extends BaseDAO{

    constructor() {
        super("User");
    }

    saveUser(user: User): Promise<number> {
        user = {
            name: user.name,
            stats: {
                gameTime: 0,
                firstConnection: new Date(),
                lastConnection: new Date()
            },
            storage: {}
        }
        return this.saveEntry<User>(user);
    }

    deleteUser(id: number): Promise<void> {
        return this.deleteEntry(id);
    }

    async deleteMultipleUsers(...ids: number[]) {
        for (const id of ids) 
            await this.deleteUser(id);
    }

    async doesUserNameExist(name: string): Promise<boolean> {
        try {
            return !!(await this.getUserByName(name));
        } catch (error) {
            return false;
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
        return (await this.getUserById(id)).stats!;
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
        await this.updateEntry<User>(id, u);
    }

    async getUserStorage(id: number) {
        return (await this.getUserById(id)).storage ?? {};
    }

    async clearUserStorage(id: number) {
        const u = await this.getUserById(id);
        u.storage = {};
        await this.updateEntry<User>(id, u);
    }

    async mergeToUserStorage(id: number, obj: {[key: string]: any}) {
        const u = await this.getUserById(id);
        u.storage = {
            ...u.storage ?? {},
            ...obj
        };
        await this.updateEntry<User>(id, u);
    }

    async deleteKeyFromUserStorage(id: number, key: string) {
        const u = await this.getUserById(id);
        delete (u.storage ?? {})[key];
        await this.updateEntry<User>(id, u);
    }
}