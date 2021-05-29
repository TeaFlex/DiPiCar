import { Express, Router } from "express";
import { body, param } from "express-validator";
import { StorageController } from "../controller/StorageController";
import { catchError } from "../middlewares/responseHandlers";
import { BaseRoute } from "./BaseRoute";

export class StorageRoute extends BaseRoute {
    static init(app: Express) {

        const router = Router();
        const store = new StorageController();

        //Gets the storage of a specific user
        router.get('/:id', param('id').isInt(), catchError(store.getUserStorage));

        //Merges the new object with the actual storage
        router.put('/:id', param('id').isInt(), body().isObject(), catchError(store.updateUserStorage));

        //Deletes a specific key inside the storage
        router.delete('/:id/:key', param('id').isInt(), param('key').isString(), catchError(store.deleteKeyInUserStorage));

        //Clears the whole storage of a given user
        router.purge('/:id', param('id').isInt(), catchError(store.clearUserStorage));

        app.use(this.getFullURI("store"), router);
    }
}