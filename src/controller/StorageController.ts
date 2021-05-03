import { BaseController } from "./BaseController";
import { NextFunction, Request, Response } from "express";
import { NotFoundError } from "../utilities/errors/NotFoundError";

export class StorageController extends BaseController {

    getUserStorage = async (req: Request, res: Response, next: NextFunction) => {
        const id = parseInt(req.params["id"], 10);
        if (!await this.db!.userDAO.doesEntryExist(id!))
            next(new NotFoundError(`Storage of id "${id}" doesn't exist.`));
        else {
            res.locals.message = `Storage of user "${id}" sent.`;
            res.locals.status = 200;
            res.locals.json = await this.db!.userDAO.getUserStorage(id);
            next();
        }
    };

    updateUserStorage = async (req: Request, res: Response, next: NextFunction) => {
        const id = parseInt(req.params["id"], 10);
        const s: any = req.body;
        if (!await this.db!.userDAO.doesEntryExist(id!))
            next(new NotFoundError(`Storage of id "${id}" doesn't exist.`));
        else {
            await this.db!.userDAO.mergeToUserStorage(id, s);
            res.locals.message = `Storage of user "${id}" updated.`;
            res.locals.status = 200;
            next();
        }
    };

    deleteKeyInUserStorage = async (req: Request, res: Response, next: NextFunction) => {
        const id = parseInt(req.params["id"], 10);
        const key = req.params["key"];
        if (!await this.db!.userDAO.doesEntryExist(id!))
            next(new NotFoundError(`Storage of id "${id}" doesn't exist.`));
        if (!(await this.db!.userDAO.getUserStorage(id))[key])
            next(new NotFoundError(`Key "${key}" in storage of id "${id}" doesn't exist.`));
        else {
            await this.db!.userDAO.deleteKeyFromUserStorage(id, key);
            res.locals.message = `Key "${key}" in storage of user "${id}" deleted.`;
            res.locals.status = 200;
            next();
        }
    }

    clearUserStorage = async (req: Request, res: Response, next: NextFunction) => {
        const id = parseInt(req.params["id"], 10);
        if (!await this.db!.userDAO.doesEntryExist(id!))
            next(new NotFoundError(`Storage of id "${id}" doesn't exist.`));
        else {
            await this.db!.userDAO.clearUserStorage(id);
            res.locals.message = `Storage of user "${id}" cleared.`;
            res.locals.status = 200;
            next();
        }
    }
}