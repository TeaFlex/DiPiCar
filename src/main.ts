import {createServer} from 'http';
import {Server} from 'ws';
import {MainRoute} from './routes/MainRoute';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { UsersRoute } from './routes/UsersRoute';
import { StatsRoute } from './routes/StatsRoute';
import { errorHandler } from './middlewares/errorHandlers';
import { StorageRoute } from './routes/StorageRoute';
import { logger } from './utilities/logger/Logger';
import successHandler from './middlewares/successHandler';
import logHandler from './middlewares/logHandler';
import { Ws_controller } from './controller/WsController';
import dotenv from 'dotenv';
import path from 'path';
import { Path } from './utilities/Path';

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

        app.use(errorHandler);
        app.use(successHandler);
        app.use(logHandler);
        
        const ws_server = new Server({server});
        const ws_controller = new Ws_controller(ws_server);
        
        server.listen(port, () => {
            logger.info(`The app is running and listening to the port ${port}.`);
        });
    }
}

const main = new Main();