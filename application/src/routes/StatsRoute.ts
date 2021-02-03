import { Express, Router } from "express";
import { StatsController } from "../controller/StatsController";
import { bodyControl, statsSchema } from "../middlewares/bodyControl";
import { checkSchema, param } from "express-validator";

export class StatsRoute {
    
    static init(app: Express): void {

        var router = Router();
        var stats = new StatsController();

        //Get stats of a user
        router.get('/:id', param('id').isInt(), stats.getStatsOfUser);

        //Update stats of a user
        router.put('/',checkSchema(statsSchema), bodyControl, stats.updateStatsOfUser);

        app.use('/stats', router);
    }
}