import { AppDB } from "../model/database/AppDB";

export abstract class BaseController {

    protected db?: AppDB;

    constructor() {
        AppDB.getInstance()
        .then((val) => {
            this.db = val;
        })
        .catch((err) => {
            throw Error(err);
        });
    }
}