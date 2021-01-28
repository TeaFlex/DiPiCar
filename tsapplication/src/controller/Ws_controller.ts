import {Server} from 'ws';
import {GPIO_control} from '../model/gpio/Gpio_control';
const PiStream = require("pistreamer").PiStream;

export class Ws_controller {

    private ws_server: Server;
    private pistream: any;

    constructor(ws_server: Server) {
        this.ws_server = ws_server;
        this.pistream = new PiStream(this.ws_server, {heigth: 280, width: 560, fps: 30, limit: 1});

        this.ws_server.on("connection", this.new_client);
    }

    new_client(socket: any, req: any) {
        socket.on("message", (data: any) => {
            try {
                data = JSON.parse(data);
                console.log(data.request);
            } catch (error) {
                console.log("Unsupported request");
            }
        });
    }
}