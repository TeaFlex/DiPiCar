import {AppDB} from '../../../../src/model/database/AppDB';
import { User } from '../../../../src/model/database/Entities/User';

var db: AppDB;
var user: User;

beforeAll(() => {
    AppDB.dbPath = ':memory:';
    db = AppDB.getInstance();
    user = {
        name: "Richard"
    };
});

test("Saving User", ()=> {
    /*await db.userDAO.saveUser(user);
    var dbUser = await db.userDAO.getUserById(1);
    
    expect(dbUser).toBe(user);*/
    console.log(db);
});