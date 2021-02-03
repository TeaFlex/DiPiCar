import { NextFunction, Request, Response } from "express";
import { HttpError } from "../utilities/errors/HttpError";
import { NotFoundError } from "../utilities/errors/NotFoundError";
import { AppDB } from "../model/database/AppDB";
import { User } from "../model/database/Entities/User";

export class UserController {

    async initUser(req: Request, res: Response, next: NextFunction) {
        try {
            const db = await AppDB.getInstance()
            var u: User = req.body;
            if(await db.userDAO.doesUserNameExist(u.name))
                next(new HttpError(409, `User "${u.name}" already exists.`));
            else {
                var id = await db.userDAO.saveUser(u);
                await db.userStatsDAO.initStats(id);
                res.locals.message = `User "${u.name}" created`
                res.locals.status = 201;
                next();
            }
        } catch (error) {
            next(new HttpError(500));
        }
    }

    async getUser(req: Request, res: Response, next: NextFunction) {
        try {
            const db = await AppDB.getInstance()
            var id = parseInt(req.params["id"], 10);
            if (!await db.userDAO.getUserById(id))
                next(new NotFoundError(`User of id "${id}" doesn't exist.`));
            else {
                var json = await db.userDAO.getUserById(id);
                res.locals.message = `User "${id}" sent.`
                res.locals.status = 200;
                res.locals.json = json;
                next();
            }
        } catch (error) {
            next(new HttpError(500));
        }
    }

    async getAllUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const db = await AppDB.getInstance()
            var json = await db.userDAO.getAllUsers();
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
        } catch (error) {
            next(new HttpError(500));
        }
    }

    async deleteUser(req: Request, res: Response, next: NextFunction) {
        try {
            //TODO: Token needed
            const db = await AppDB.getInstance()
            var id = parseInt(req.params["id"], 10);
            if(!await db.userDAO.getUserById(id))
                next(new NotFoundError(`User of id "${id}" doesn't exist.`));
            else {
                await db.userDAO.deleteUser(id);
                res.locals.message = `User of id "${id}" deleted.`
                res.locals.status = 200;
                next();
            }
        } catch (error) {
            next(new HttpError(500));
        }
    }
}