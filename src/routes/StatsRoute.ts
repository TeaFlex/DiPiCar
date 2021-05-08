import { Express, Router } from "express";
import { StatsController } from "../controller/StatsController";
import { bodyControl, statsSchema } from "../middlewares/bodyControl";
import { checkSchema, param } from "express-validator";
import { catchError } from "../middlewares/responseHandlers";

export class StatsRoute {
    
    static init(app: Express): void {

        const router = Router();
        const stats = new StatsController();

        //Gets stats by id
        router.get('/:id', param('id').isInt(), catchError(stats.getStatsOfUser));

        //Updates stats by id
        router.put('/:id',checkSchema(statsSchema), bodyControl, catchError(stats.updateStatsOfUser));

        app.use('/api/stats', router);
    }
}