import { Router, Express, Response, Request } from 'express';
import { BaseRoute } from './BaseRoute';
import { MainController } from '../controller';
import { catchError, hostnameSchema } from '../middlewares';
import { checkSchema } from 'express-validator';

export class MainRoute extends BaseRoute {

    static init(app: Express){

        const router = Router();
        const main = new MainController();
        
        //Status of the app
        router.get('/', catchError(main.getStatus));

        //Change the hostname of the computer
        router.put('/', checkSchema(hostnameSchema), catchError(main.changeHostname));

        app.use(this.getFullURI(), router);
    }
}