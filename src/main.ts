import { createServer } from 'http';
import { Server as WsServer } from 'ws';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import path from 'path';
import { 
    MainRoute, 
    UsersRoute, 
    StatsRoute, 
    StorageRoute 
} from './routes';
import { responseHandler, sendHandler } from './middlewares';
import { logger, Path } from './utilities';
import { WsController } from './controller';

class Main {
    constructor() {

        if(process.env.NODE_ENV === 'production') {
            dotenv.config({path: path.resolve(process.cwd(), 'production.env')});
        }
        if(process.env.NODE_ENV === 'development') {
            dotenv.config({path: path.resolve(process.cwd(), 'development.env')});
        }

        const p = new Path();
        
        const port = parseInt(process.env.PORT!) | 8060;

        const app = express();
        const server = createServer(app);

        app.use(express.static('public'));
        app.use(cors());
        app.use(helmet())
        app.use(express.json());
        
        MainRoute.init(app);
        UsersRoute.init(app);
        StatsRoute.init(app);
        StorageRoute.init(app);

        app.use(responseHandler);
        app.use(sendHandler);
        
        const wsServer = new WsServer({server});
        const wsController = new WsController(wsServer);
        
        server.listen(port, () => {
            logger.info(`The app is running and listening to the port ${port}.`);
        });
    }
}

const main = new Main();