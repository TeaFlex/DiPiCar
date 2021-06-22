import { 
    createServer as createHttpsServer, 
    Server as HttpsServer
} from 'https';
import {
    createServer as createHttpServer, 
    Server as HttpServer 
} from 'http';
import { Server as WsServer } from 'ws';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import * as routes from './routes';
import { responseHandler, sendHandler } from './middlewares';
import { 
    dipicarConfReader, 
    logger, 
    readDotEnv, 
    initLogger, 
    appPath 
} from './utilities';
import { WsController } from './controller';
import { readFileSync } from 'fs';
import { join } from 'path';
import { exit } from 'process';

class Main {
    main() {
        
        readDotEnv((process.env.NODE_ENV === 'development')? 'development.env': 'production.env');
        initLogger();
       
        const port = dipicarConfReader().port;

        const app = express();

        let server: HttpServer | HttpsServer;

        try {
            server = createHttpsServer({
                key: readFileSync(join(appPath().credsPath, "key.pem")),
                cert: readFileSync(join(appPath().credsPath, "cert.pem"))
            }, app);
        } catch (error) {
            logger.error(error.message);
            logger.warn("Creating an HTTP server instead...");
            server = createHttpServer(app);
        }


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
            const serverType = (server instanceof HttpsServer)?"HTTPS": "HTTP";
            logger.info(`${serverType} server is running and listening to the port ${port}.`);
        });
    }
}

try {
    new Main().main();
} catch (error) {
    logger.error(error.message)
    exit(-1);
}