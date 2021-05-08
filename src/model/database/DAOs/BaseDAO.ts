import { AppDB } from '../AppDB';
import {Base} from '../Entities';

export abstract class BaseDAO {

    protected tableName: string;

    constructor(tableName: string) {
        this.tableName = tableName;
        const table: any = {};
        table[this.tableName] = [];
        AppDB.structure = {
            ...AppDB.structure,
            ...table
        };
    }
    
    public async doesEntryExist(rowid: number): Promise<boolean> {
        return !!await this.getEntryById<Base>(rowid);
    }

    protected async saveEntry<T extends Base>(entry: T): Promise<number> {
        entry.id = 1;
        for(const el of AppDB.db.get(this.tableName).value() as T[])
            entry.id = (el.id ?? 0 > entry.id)? el.id! + 1: entry.id;

        AppDB.db
            .get(this.tableName)
            .push(entry)
        await AppDB.db.save();
        return entry.id!;
    }

    protected async deleteEntry(rowid: number): Promise<void> {
        const purged = (AppDB.db
            .get(this.tableName)
            .value() as Base[])
            .filter(v => v.id != rowid);

        AppDB.db.set(this.tableName, purged);
        return AppDB.db.save()!;
    }

    protected async getEntryById<T extends Base>(rowid: number): Promise<T> {
        return (AppDB.db.get(this.tableName).value() as T[])
            .find(v => v.id === rowid)!;
    }

    protected async getEntryByColumn<T>(column: string, value: string): Promise<T> {
        return (AppDB.db.get(this.tableName).value() as T[])
            .find((v: any) => v[column] === value)!;
    }

    protected async getAllEntries<T extends Base>(): Promise<Array<T>> {
        return (AppDB.db.get(this.tableName).value() as T[]);
    }

    protected async updateEntry<T extends Base>(rowid: number, updatedEntry: T): Promise<void> {
        const updateIndex = (AppDB.db
            .get(this.tableName)
            .value() as T[])
            .findIndex(v => v.id === rowid);

        AppDB.db
            .get(this.tableName)
            .set(updateIndex, updatedEntry);

        return AppDB.db.save()!;
    }
}