import { NextFunction, Request, Response } from "express";
import { HttpError } from "../utilities/errors/HttpError";
import { NotFoundError } from "../utilities/errors/NotFoundError";
import { User } from "../model/database/Entities/User";
import { BaseController } from "./BaseController";

export class UserController extends BaseController {

    initUser = async (req: Request, res: Response, next: NextFunction) => {
        const u: User = req.body;
        if(await this.db!.userDAO.doesUserNameExist(u.name))
            next(new HttpError(`User "${u.name}" already exists.`, 409));
        else {
            const id = await this.db!.userDAO.saveUser(u);
            res.locals.message = `User "${u.name}" created`
            res.locals.status = 201;
            res.locals.json = await this.db!.userDAO.getUserById(id);;
            next();
        }
    };

    getUser = async (req: Request, res: Response, next: NextFunction) => {
        const id = parseInt(req.params["id"], 10);
        if (!await this.db!.userDAO.getUserById(id))
            next(new NotFoundError(`User of id "${id}" doesn't exist.`));
        else {
            res.locals.message = `User "${id}" sent.`
            res.locals.status = 200;
            res.locals.json = await this.db!.userDAO.getUserById(id);
            next();
        }
    };

    getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
        const json = await this.db!.userDAO.getAllUsers();
        if(json.length == 0) {
            res.locals.status = 204;
            res.locals.message = 'There\'s no user to send.';
        }
        else{
            res.locals.message = `All users sent.`
            res.locals.status = 200;
            res.locals.json = json;
        }
        next();
    };

    deleteUser = async (req: Request, res: Response, next: NextFunction) => {
        const id = parseInt(req.params["id"], 10);
        if(!await this.db!.userDAO.getUserById(id))
            next(new NotFoundError(`User of id "${id}" doesn't exist.`));
        else {
            await this.db!.userDAO.deleteUser(id);
            res.locals.message = `User of id "${id}" deleted.`
            res.locals.status = 200;
            next();
        }
    };
}