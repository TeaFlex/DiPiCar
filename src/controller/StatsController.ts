import { NextFunction, Request, Response } from "express";
import { NotFoundError } from "../utilities/errors/NotFoundError";
import { UserStats } from "../model/database/Entities/User";
import { BaseController } from "./BaseController";

export class StatsController extends BaseController {

    getStatsOfUser = async (req: Request, res: Response, next: NextFunction) => {
        const id = parseInt(req.params["id"], 10);
        if (!await this.db!.userDAO.doesEntryExist(id))
            next(new NotFoundError(`Stats of id "${id}" doesn't exist.`));
        else {
            res.locals.message = `Stats of user "${id}" sent.`
            res.locals.status = 200;
            res.locals.json = await this.db!.userDAO.getStatsById(id);
            next();
        }
    }
    
    updateStatsOfUser = async (req: Request, res: Response, next: NextFunction) => {
        const id = parseInt(req.params["id"], 10);
        const s: UserStats = req.body;
        if (!await this.db!.userDAO.doesEntryExist(id!))
            next(new NotFoundError(`Stats of id "${id}" doesn't exist.`));
        else {
            await this.db!.userDAO.updateStats(id, s);
            res.locals.message = `Stats of user "${id}" updated.`
            res.locals.status = 200;
            next();
        }
    }
}


