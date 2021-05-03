import { Express, Router } from "express";
import { body, param } from "express-validator";
import { StorageController } from "../controller/StorageController";
import { catchError } from "../middlewares/errorHandlers";

export class StorageRoute {
    static init(app: Express) {

        const router = Router();
        const store = new StorageController();

        router.get('/:id', param('id').isInt(), catchError(store.getUserStorage));

        router.put('/:id', param('id').isInt(), body().isObject(), catchError(store.updateUserStorage));

        router.delete('/:id/:key', param('id').isInt(), param('key').isString(), catchError(store.deleteKeyInUserStorage));

        router.purge('/:id', param('id').isInt(), catchError(store.clearUserStorage));

        app.use('/api/store', router);
    }
}