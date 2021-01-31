import {AppDB} from '../../../../src/model/database/AppDB';

AppDB.dbPath = ':memory:';
var db: AppDB = AppDB.getInstance();

test("Saving User", ()=> {
    
});