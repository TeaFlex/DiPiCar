import {Server} from 'ws';
import {GPIO_control} from '../model/gpio/Gpio_control';
import {ImageEffects, PiStreamServer} from 'pistreamer';
import {logger} from '../utilities/logger/Logger';

export class Ws_controller {

    private ws_server: Server;
    private pistream: any;
    private gpio: GPIO_control;

    constructor(ws_server: Server) {
        this.ws_server = ws_server;
        PiStreamServer.log = logger;
        this.pistream = new PiStreamServer(this.ws_server, {
            videoOptions: {
                height: 280, 
                width: 560, 
                framerate: 30,
                vFlip: true,
                hFlip: true
            },
            limit: 1
        });

        this.gpio = GPIO_control.getInstance();
        this.gpio.stop();
        this.ws_server.on("connection", this.new_client);
    }

    new_client = (socket: any, req: any) => {
        socket.on("message", (data: any) => {
            try {
                data = JSON.parse(data);
                console.log(data);

                if(data.speed)
                    this.gpio.speed(data.speed);
                
                if(data.direction !== 'stop' && data.direction !== 'stop')
                    (this.gpio as any)[data.direction]();
                else
                    this.gpio.stop();
            } catch (error) {
                logger.info("GPIO CONTROL: Unsupported request");
            }
        });
    }
}