import sqlite3 from 'sqlite3';
import { UserStats } from '../Entities/UserStats';
import { BaseDAO } from './BaseDAO';

export class UserStatsDAO extends BaseDAO {

    private timeFormat: string = "en-GB";
    private timeZone: string = "Europe/Brussels";

    constructor(db: sqlite3.Database) {
        super(db, "UserStats");
    }

    setTimeZone(timeZone: string) {
        this.timeZone = timeZone;
    }

    setTimeFormat(timeFormat: string) {
        this.timeFormat = timeFormat;
    }

    async saveStats(stats: UserStats) {
        var now = new Date().toLocaleString(this.timeFormat, {timeZone: this.timeZone});
        if(await this.doesStatsExists(stats.id)) {
            this.db.run(`UPDATE ${this.tableName} 
            SET lastConnection = ?,
            gameTime = ? 
            WHERE userID = ?;`, [
                stats.lastConnection.toLocaleString(this.timeFormat, {timeZone: this.timeZone}),
                stats.gameTime,
                stats.id
            ],(error) => {
                if(error)
                    throw new Error(error.message);
            });
        }
        else {
            this.db.run(`INSERT INTO ${this.tableName} (userID, firstConnection, lastConnection, gameTime) 
            VALUES ( $id , $firstConnection , $lastConnection , $gameTime );`, {
                $id: stats.id,
                $firstConnection: now,
                $lastConnection: now,
                $gameTime: 0
            });
        }
    }

    private doesStatsExists(id: number): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.db.get(`SELECT * from ${this.tableName} WHERE userID = ? ;`, [id], 
            (error, row) => {
                if(error)
                    throw new Error(error.message);
                resolve(row ? true : false);
            });
        });
    }

    createTable(): void {
        super.initTable({
            userID: ["integer"],
            firstConnection: ["text", "not null"],
            lastConnection: ["text", "not null"],
            gameTime: ["text", "not null"],
            pk: ["userID"],
            fk: ["userID", "User", "userID", "on delete cascade"]
        });
    }
}