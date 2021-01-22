import sqlite3 from 'sqlite3';
import {BaseDAO} from './BaseDAO';

export class UserStatsDAO extends BaseDAO {

    constructor(db: sqlite3.Database) {
        super(db, "UserStats");
    }


    createTable(): void {
        super.initTable({
            id: ["integer"],
            firstConnection: ["text", "not null"],
            lastConnection: ["text", "not null"],
            gameTime: ["text", "not null"],
            pk: ["id"],
            fk: ["id", "User", "id", "on delete cascade"]
        });
    }
}