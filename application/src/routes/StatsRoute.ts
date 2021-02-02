import { Express, Router } from "express";
import { StatsController } from "../controller/StatsController";

export class StatsRoute {
    
    static init(app: Express): void {

        var router = Router();
        var stats = new StatsController();

        //Get stats of a user
        router.get('/:id', stats.getStatsOfUser);

        //Update stats of a user
        router.put('/', stats.updateStatsOfUser);

        app.use('/stats', router);
    }
}