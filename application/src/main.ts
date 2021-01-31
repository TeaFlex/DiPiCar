import {Ws_controller} from './controller/Ws_controller';
import {createServer} from 'http';
import {Server} from 'ws';
import {Route_controller} from './controller/Route_controller';
import express from 'express';

class Main {
    constructor() {

        const port = 8060;

        const app = express();
        const server = createServer(app);
        const ws_server = new Server({server});

        const ws_controller = new Ws_controller(ws_server);
        Route_controller.init(app);

        server.listen(port, () => {
            console.log(`The app is running and listening to the port ${port}.`);
        });
    }
}

const main = new Main();