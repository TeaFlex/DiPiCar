import { BaseRoute } from "./BaseRoute";
import { Express, Router } from 'express';
import { AuthController } from "../controller";
import { catchError } from "../middlewares";

export class AuthRoute extends BaseRoute {

    static init(app: Express) {
        const router = Router();
        const auth = new AuthController();
        
        router.get('/', catchError(auth.genToken));

        app.use(this.getFullURI("auth"), router);
    }
}