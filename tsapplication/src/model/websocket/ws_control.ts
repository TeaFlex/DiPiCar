import {Server} from 'ws';
import {GPIO_control} from '../gpio/gpio_control';

export class Ws_control {

    ws_server: any;

    constructor(ws_server: Server) {
        this.ws_server = ws_server;
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