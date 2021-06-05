import { createServer } from 'https';
import { Server as WsServer } from 'ws';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import * as routes from './routes';
import { responseHandler, sendHandler } from './middlewares';
import { dipicarConfReader, logger, readDotEnv, initLogger } from './utilities';
import { WsController } from './controller';
import { readFileSync } from 'fs';

class Main {
    main() {
        
        readDotEnv((process.env.NODE_ENV === 'development')? 'development.env': 'production.env');
        initLogger();
       
        const port = dipicarConfReader().port;

        const app = express();
        const server = createServer({
            key: readFileSync("./creds/key.pem"),
            cert: readFileSync("./creds/cert.pem")
        }, app);

        app.use(express.static('public'));
        app.use(cors());
        app.use(helmet())
        app.use(express.json());
        
        for (const key in routes) {
            if(key !== "BaseRoute")
                (routes as any)[key].init(app);
        }

        app.use(responseHandler);
        app.use(sendHandler);
        
        const wsServer = new WsServer({server});
        const wsController = new WsController(wsServer);
        
        server.listen(port, () => {
            logger.info(`The app is running and listening to the port ${port}.`);
        });
    }
}

new Main().main();