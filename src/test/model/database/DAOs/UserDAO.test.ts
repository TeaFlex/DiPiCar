import { expect, assert } from 'chai';
import {AppDB} from '../../../../model/database/AppDB';
import { User } from '../../../../model/database/Entities/User';

describe("User in database", async function() {
    
    const u: User = {
        name: "TestBoy"
    };
    let db: AppDB;
    
    before(async () => {
        AppDB.dbFile = "test.json";
        db = await AppDB.getInstance();
    })

    after(async () => {
        await AppDB.deleteDatabase();
    });

    it("Creates basic user", async () => {        
        const uid = await db.userDAO.saveUser(u);
        const ulist = await db.userDAO.getAllUsers();
        const dbu = ulist.find(v=>v.id === uid);

        assert.strictEqual(uid, 1);
        assert.strictEqual(ulist.length, 1);
        assert.strictEqual(dbu?.name, u.name);
    });

    it("Generates user id dynamically", async () => {        
        const u2 = await db.userDAO.saveUser(u);
        const u3 = await db.userDAO.saveUser(u);
        const dbu = await db.userDAO.getAllUsers();

        assert.strictEqual(u2, 2);
        assert.strictEqual(u3, 3);
        assert.strictEqual(dbu.length, 3);
    });

    it("Generates user stats dynamically", async () => {        
        const uid = await db.userDAO.saveUser(u);
        const ulist = await db.userDAO.getAllUsers();
        const dbu = ulist.find(v=>v.id === uid);

        assert.isObject(dbu?.stats);
        assert.isNotEmpty(dbu?.stats);
        assert.strictEqual(dbu?.stats?.gameTime, 0);
        assert.isDefined(dbu?.stats?.firstConnection);
        assert.isDefined(dbu?.stats?.lastConnection);
        assert.typeOf(dbu?.stats?.firstConnection, "Date");
        assert.typeOf(dbu?.stats?.lastConnection, "Date");
    });

    it("Creates a working user storage", async () => {  
        const uid = await db.userDAO.saveUser(u);
        await db.userDAO.mergeToUserStorage(uid, {
            myKey: "some random infos",
            otherKey: "other infos",
            someKey: 123
        });

        let udb = await db.userDAO.getUserById(uid);
        assert.strictEqual(udb.storage.myKey, "some random infos");
        assert.strictEqual(udb.storage.otherKey, "other infos");
        assert.strictEqual(udb.storage.someKey, 123);
        
        await db.userDAO.deleteKeyFromUserStorage(uid, "myKey");
        
        udb = await db.userDAO.getUserById(uid);
        assert.isUndefined(udb.storage.myKey);

        await db.userDAO.clearUserStorage(uid);

        udb = await db.userDAO.getUserById(uid);
        assert.isEmpty(udb.storage);   
    });

    it("Gets user stats from stats method after creation", async () => {        
        const uid = await db.userDAO.saveUser(u);
        const stats = await db.userDAO.getStatsById(uid);

        assert.isObject(stats);
        assert.isNotEmpty(stats);
        assert.strictEqual(stats.gameTime, 0);
        assert.isDefined(stats.firstConnection);
        assert.isDefined(stats.lastConnection);
        assert.typeOf(stats.firstConnection, "Date");
        assert.typeOf(stats.lastConnection, "Date");
    });
});
