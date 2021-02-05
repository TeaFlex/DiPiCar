import { Express, Router } from "express";
import { StatsController } from "../controller/StatsController";
import { bodyControl, statsSchema } from "../middlewares/bodyControl";
import { checkSchema, param } from "express-validator";
import { catchError } from "../middlewares/errorHandlers";

export class StatsRoute {
    
    static init(app: Express): void {

        const router = Router();
        const stats = new StatsController();

        //Get stats of a user
        router.get('/:id', param('id').isInt(), catchError(stats.getStatsOfUser));

        //Update stats of a user
        router.put('/',checkSchema(statsSchema), bodyControl, catchError(stats.updateStatsOfUser));

        app.use('/stats', router);
    }
}