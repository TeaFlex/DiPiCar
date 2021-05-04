import { json, NextFunction, Request, Response } from "express";
import { HttpError, NotFoundError } from "../utilities/errors";
import { User } from "../model/database/Entities";
import { BaseController } from "./BaseController";
import { HttpSuccess, HttpCreated, HttpNoContent } from "../utilities/successes";

export class UserController extends BaseController {

    initUser = async (req: Request, res: Response, next: NextFunction) => {
        const u: User = req.body;
        if(await this.db!.userDAO.doesUserNameExist(u.name))
            next(new HttpError(`User "${u.name}" already exists.`, 409));
        else {
            const id = await this.db!.userDAO.saveUser(u);
            const data = await this.db!.userDAO.getUserById(id);
            next(new HttpCreated(`User "${u.name}" created`, data));
        }
    };

    getUser = async (req: Request, res: Response, next: NextFunction) => {
        const id = parseInt(req.params["id"], 10);
        if (!await this.db!.userDAO.getUserById(id))
            next(new NotFoundError(`User of id "${id}" doesn't exist.`));
        else {
            const data = await this.db!.userDAO.getUserById(id);
            next(new HttpSuccess(`User "${id}" sent.`, data));
        }
    };

    getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
        const data = await this.db!.userDAO.getAllUsers();
        next((!data.length)? new HttpNoContent('There\'s no user to send.') : new HttpSuccess(`All users sent.`, data));
    };

    deleteUser = async (req: Request, res: Response, next: NextFunction) => {
        const id = parseInt(req.params["id"], 10);
        if(!await this.db!.userDAO.getUserById(id))
            next(new NotFoundError(`User of id "${id}" doesn't exist.`));
        else {
            await this.db!.userDAO.deleteUser(id);
            next(new HttpSuccess(`User of id "${id}" deleted.`));
        }
    };
}