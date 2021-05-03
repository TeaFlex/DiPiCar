import {Server} from 'ws';
import {GPIO_control} from '../model/gpio/Gpio_control';
import {ImageEffects, PiStreamServer} from 'pistreamer';
import {logger} from '../utilities/logger/Logger';

export class Ws_controller {

    private wsServer: Server;
    private pistream: PiStreamServer;
    private gpio: GPIO_control;

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
            limit: 1
        });

        this.newClient = this.newClient.bind(this);
        this.handleData = this.handleData.bind(this);

        this.gpio = GPIO_control.getInstance();
        this.wsServer.on("connection", this.newClient);
    }

    newClient (socket: any, req: any) {
        socket.on("message", this.handleData);
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
