import { Request, Response } from "express";
import { AppDB } from "../model/database/AppDB";
import { UserStats } from "../model/database/Entities/UserStats";

export class StatsController{

    async getStatsOfUser(req: Request, res: Response) {
        try {
            const db = await AppDB.getInstance()
            var id = parseInt(req.params["id"], 10);
            var json = await db.userStatsDAO.getStatsById(id);
            res.status(200).json(json);
        } catch (error) {
            console.error(error);
            res.status(404).send(error.message);
        }
    }
    
    async updateStatsOfUser(req: Request, res: Response) {
        try {
            const db = await AppDB.getInstance()
            var s: UserStats = req.body;
            await db.userStatsDAO.updateStats(s);
            res.status(200).send();
        } catch (error) {
            console.error(error);
            res.status(500).send(error.message);
        }
    }
}


