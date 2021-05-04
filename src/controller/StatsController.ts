import { NextFunction, Request, Response } from "express";
import { NotFoundError } from "../utilities/errors";
import { UserStats } from "../model/database/Entities";
import { BaseController } from "./BaseController";
import { HttpSuccess } from "../utilities";

export class StatsController extends BaseController {

    getStatsOfUser = async (req: Request, res: Response, next: NextFunction) => {
        const id = parseInt(req.params["id"], 10);
        if (!await this.db!.userDAO.doesEntryExist(id))
            next(new NotFoundError(`Stats of id "${id}" doesn't exist.`));
        else {
            const data = await this.db!.userDAO.getStatsById(id);
            next(new HttpSuccess(`Stats of user "${id}" sent.`, data));
        }
    }
    
    updateStatsOfUser = async (req: Request, res: Response, next: NextFunction) => {
        const id = parseInt(req.params["id"], 10);
        const s: UserStats = req.body;
        if (!await this.db!.userDAO.doesEntryExist(id!))
            next(new NotFoundError(`Stats of id "${id}" doesn't exist.`));
        else {
            await this.db!.userDAO.updateStats(id, s);
            next(new HttpSuccess(`Stats of user "${id}" updated.`));
        }
    }
}


