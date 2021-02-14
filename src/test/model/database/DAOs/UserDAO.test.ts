import {AppDB} from '../../../../model/database/AppDB';
import { User } from '../../../../model/database/Entities/User';

var db: AppDB;
var user: User;

beforeAll(async () => {
    AppDB.dbPath = ':memory:';
    user = {
        id: 1,
        name: "Richard"
    };
    db = await AppDB.getInstance();
});

test("Saving User", async ()=> {
    await db.userDAO.saveUser(user);
    var dbUser = await db.userDAO.getUserById(1);
    
    expect(dbUser).toEqual(user);
});