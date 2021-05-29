import { NetworkController } from '../controller';
import { BaseRoute } from './BaseRoute';
import { Router, Express, Response, Request } from 'express';
import { bodyControl, catchError, networkSchema } from '../middlewares';
import { checkSchema, param } from 'express-validator';

export class NetworkRoute extends BaseRoute {

    static init(app: Express) {
        const router = Router();
        const net = new NetworkController();

        //Gets saved networks
        router.get('/', catchError(net.getNetworks));

        //Gets scanned access points networks
        router.get('/scan', catchError(net.getAccessPoints));

        //Gets the network infos of interfaces used by the app
        router.get('/ip/:type?', catchError(net.getIPs));

        //Saves a network
        router.post('/',checkSchema(networkSchema), bodyControl, catchError(net.addNetwork));

        //Removes a network
        router.delete('/:id', param("id").isInt(), catchError(net.removeNetworkById));

        app.use(this.getFullURI("network"), router);
    }

}