import {Server} from 'ws';
import {GPIO_control} from '../model';
import {ImageEffects, PiStreamServer} from 'pistreamer';
import {logger} from '../utilities';

export class WsController {

    private wsServer: Server;
    private pistream: PiStreamServer;
    private gpio: GPIO_control;
    private limit = 1;
    private wsClients: any[] = [];

    constructor(wsServer?: Server, port = 8061) {
        this.wsServer = wsServer ?? new Server({port});

        PiStreamServer.log = logger;

        this.pistream = new PiStreamServer(this.wsServer, {
            videoOptions: {
                height: 280, 
                width: 560, 
                framerate: 30,
                vFlip: true,
                hFlip: true
            },
            limit: this.limit
        });

        this.newClient = this.newClient.bind(this);
        this.handleData = this.handleData.bind(this);

        this.gpio = GPIO_control.getInstance();
        this.wsServer.on("connection", this.newClient);
    }

    newClient (socket: any, req: any) {
        if(this.wsServer.clients.size <= this.limit) 
            socket.on("message", this.handleData);
        else 
            logger.info(`Limit of ${this.limit} user(s) reached.`);
    }
    
    handleData(data: string) {
        try {
            this.gpio.movement(JSON.parse(data));
        } catch (error) {
            if(error instanceof SyntaxError)
                logger.info(`GPIO CONTROL: Unsupported request (${data}), skipping...`);
            else
                logger.error(error.stack);
        }
    }
}