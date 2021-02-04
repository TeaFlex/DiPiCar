import { NextFunction, Request, Response } from "express";
import { HttpError } from "../utilities/errors/HttpError";
import { NotFoundError } from "../utilities/errors/NotFoundError";
import { AppDB } from "../model/database/AppDB";
import { UserStats } from "../model/database/Entities/UserStats";

export class StatsController{

    async getStatsOfUser(req: Request, res: Response, next: NextFunction) {
        const db = await AppDB.getInstance();
        var id = parseInt(req.params["id"], 10);
        if (!await db.userStatsDAO.doesEntryExist(id))
            next(new NotFoundError(`Stats of id "${id}" doesn't exist.`));
        else {
            var json = await db.userStatsDAO.getStatsById(id);
            res.locals.message = `Stats of user "${id}" sent.`
            res.locals.status = 200;
            res.locals.json = json;
            next();
        }
    }
    
    async updateStatsOfUser(req: Request, res: Response, next: NextFunction) {
        const db = await AppDB.getInstance()
        var s: UserStats = req.body;
        if (!await db.userStatsDAO.doesEntryExist(s.userID))
            next(new NotFoundError(`Stats of id "${s.userID}" doesn't exist.`));
        else {
            await db.userStatsDAO.updateStats(s);
            res.locals.message = `Stats of user "${s.userID}" updated.`
            res.locals.status = 200;
            next();
        }
    }
}


