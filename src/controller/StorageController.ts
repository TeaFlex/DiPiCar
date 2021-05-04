import { BaseController } from "./BaseController";
import { NextFunction, Request, Response } from "express";
import { NotFoundError } from "../utilities/errors";
import { HttpNoContent, HttpSuccess } from "../utilities/successes";

export class StorageController extends BaseController {

    getUserStorage = async (req: Request, res: Response, next: NextFunction) => {
        const id = parseInt(req.params["id"], 10);
        if (!await this.db!.userDAO.doesEntryExist(id!))
            next(new NotFoundError(`Storage of id "${id}" doesn't exist.`));
        else {
            const data = await this.db!.userDAO.getUserStorage(id);
            let success = new HttpSuccess(`Storage of user "${id}" sent.`, data);
            if(!Object.keys(data).length)
                success = new HttpNoContent(`Storage of user "${id}" is empty.`);
            next(success);
        }
    };

    updateUserStorage = async (req: Request, res: Response, next: NextFunction) => {
        const id = parseInt(req.params["id"], 10);
        const s: any = req.body;
        if (!await this.db!.userDAO.doesEntryExist(id!))
            next(new NotFoundError(`Storage of id "${id}" doesn't exist.`));
        else {
            await this.db!.userDAO.mergeToUserStorage(id, s);
            next(new HttpSuccess(`Storage of user "${id}" updated.`));
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
            next(new HttpSuccess(`Key "${key}" in storage of user "${id}" deleted.`));
        }
    }

    clearUserStorage = async (req: Request, res: Response, next: NextFunction) => {
        const id = parseInt(req.params["id"], 10);
        if (!await this.db!.userDAO.doesEntryExist(id!))
            next(new NotFoundError(`Storage of id "${id}" doesn't exist.`));
        else {
            await this.db!.userDAO.clearUserStorage(id);
            next(new HttpSuccess(`Storage of user "${id}" cleared.`));
        }
    }
}