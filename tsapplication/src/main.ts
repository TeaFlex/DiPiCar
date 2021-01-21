import express from 'express';
import {Ws_control} from './model/websocket/ws_control';
import bodyparser from 'body-parser';
import {createServer} from 'http';
import {Server} from 'ws';
import {AppDB} from './model/database/AppDB';
const PiStream = require('pistreamer').PiStream;

const app = express();
const server = createServer(app);
const ws_server = new Server({server});
const ws_control = new Ws_control(ws_server);
const stream = new PiStream(ws_server, {heigth: 280, width: 560, fps: 30, limit: 1});
const port = 8060;
const db = new AppDB('./test.db');

//Settings and static files
app.use(express.static('static_files'));

//root
app.get('/', (req: any, res: any)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.send("Connected !");
});

app.post('/config', bodyparser.json(), (req: any, res: any)=>{
    res.header('Access-Control-Allow-Origin', '*');
    if(req.body == null) res.status(500).send({error:'Incomplete configuration'});
    else{
        var infos = req.body;
        console.log(`Hostname: ${infos['hostname']}\nSSID: ${infos['ssid']}\nPassword: ${infos['wpa']}`);
        res.status(200).send();
    }
});
app.get('/users',(req: any ,res: any)=>{
    res.header('Access-Control-Allow-Origin', '*');
    console.log('Should return users list to client');
    res.status(200).json([{id:123,name:'Jean'}]);
});
app.get('/stats', (req: any, res: any)=>{
    res.header('Access-Control-Allow-Origin', '*');
    console.log(`get stats from user${req.query.id}`);
    res.status(200);//.sendFile(STATS FROM THIS USER IN JSON);
});

app.use((req: any, res: any, next: any) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();

    app.options('*', (req: any, res: any) => {
        res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
        res.send();
    });
});


server.listen(port, () => {
    //require('pistreamer').createClient('./static_files/Scripts');
    console.log(`The app is running and listening to the port ${port}.`);
});