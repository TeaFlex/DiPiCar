const ws = require('ws');

class GPIO_control {

    constructor(ws_server) {
        this.ws_server = ws_server;
        this.ws_server.on("connection", this.new_client);
    }

    new_client(socket, req) {
        socket.on("message", (data) => {
            try {
                data = JSON.parse(data);
                console.log(data.request);
            }catch (error) {
                console.log(error);
            }
        });
    }

    up() {
        console.log("up");
    }
}

module.exports.GPIO_control = GPIO_control;