import StormDB from 'stormdb';
import { AppDB } from '../AppDB';
import {Base} from '../Entities/Base';

export abstract class BaseDAO {

    protected tableName: string;
    protected db: StormDB;

    constructor(db: StormDB, tableName: string) {
        this.db = db;
        this.tableName = tableName;
        const table: any = {};
        table[this.tableName] = [];
        AppDB.structure = {
            ...AppDB.structure,
            ...table
        };
    }
    
    public async doesEntryExist(rowid: number): Promise<boolean> {
        return (this.db
        .get(this.tableName).value() as Base[])
        .find((v) => v.id === rowid) != null;
    }

    protected async saveEntry<T extends Base>(entry: T): Promise<number> {
        entry.id = 1;
        for(const el of this.db.get(this.tableName).value() as T[])
            entry.id = (el.id ?? 0 > entry.id)? el.id! + 1: entry.id;

        this.db
        .get(this.tableName)
        .push(entry)
        await this.db.save();
        return entry.id!;
    }

    protected async deleteEntry(rowid: number): Promise<void> {
        const purged = (this.db
        .get(this.tableName)
        .value() as Base[])
        .filter(v => v.id != rowid);

        this.db.set(this.tableName, purged);
        return this.db.save()!;
    }

    protected async getEntryById<T extends Base>(rowid: number): Promise<T> {
        return (this.db.get(this.tableName).value() as T[])
        .find(v => v.id === rowid)!;
    }

    protected async getEntryByColumn<T>(column: string, value: string): Promise<T> {
        return (this.db.get(this.tableName).value() as T[])
        .find((v: any) => v[column] === value)!;
    }

    protected async getAllEntries<T extends Base>(): Promise<Array<T>> {
        return (this.db.get(this.tableName).value() as T[]);
    }

    protected async updateEntry<T extends Base>(rowid: number, updatedEntry: T): Promise<void> {
        const updateIndex = (this.db
        .get(this.tableName)
        .value() as T[])
        .findIndex(v => v.id === rowid);

        this.db
        .get(this.tableName)
        .set(updateIndex, updatedEntry);

        return this.db.save()!;
    }
}