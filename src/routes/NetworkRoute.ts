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

        //Save a network
        router.post('/',checkSchema(networkSchema), bodyControl, catchError(net.addNetwork));

        //Remove a network
        router.delete('/:id', param("id").isInt(), catchError(net.removeNetworkById));

        app.use('/api/network', router);
    }

}