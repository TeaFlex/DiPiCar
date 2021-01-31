import sqlite from 'sqlite';
import { UserStats } from '../Entities/UserStats';
import { BaseDAO } from './BaseDAO';

export class UserStatsDAO extends BaseDAO {


    constructor(db: sqlite.Database) {
        super(db, "UserStats");
    }

    setTimeZone(timeZone: string) {
    }

    setTimeFormat(timeFormat: string) {
    }

    async initStats(id: number): Promise<void> {
        var stats: UserStats = {
            userID: id,
            gameTime: 0,
            firstConnection: new Date(),
            lastConnection: new Date()
        }
        await this.saveEntry<UserStats>(stats);
    }

    async getStats(id: number): Promise<UserStats> {
        var s = await this.getEntryById<UserStats>(id);
        return s;
    }

    async updateStats(stats: UserStats) {
        await this.updateEntry(stats.userID, stats);
    }

    async createTable(): Promise<void> {
        await super.initTable({
            userID: ["integer"],
            firstConnection: ["text", "not null"],
            lastConnection: ["text", "not null"],
            gameTime: ["text", "not null"],
            pk: ["userID"],
            fk: ["userID", "User", "id", "on delete cascade"]
        });
    }
}