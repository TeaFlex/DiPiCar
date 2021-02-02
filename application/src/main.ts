import {createServer} from 'http';
import {Server} from 'ws';
import {MainRoute} from './routes/MainRoute';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { UsersRoute } from './routes/UsersRoute';
import { StatsRoute } from './routes/StatsRoute';

class Main {
    constructor() {

        const port = 8060;

        const app = express();
        const server = createServer(app);

        app.use(express.static('static_files'));
        app.use(cors());
        app.use(helmet());
        app.use(express.json());
        MainRoute.init(app);
        UsersRoute.init(app);
        StatsRoute.init(app);

        const ws_server = new Server({server});
        
        server.listen(port, () => {
            console.log(`The app is running and listening to the port ${port}.`);
        });
    }
}

const main = new Main();