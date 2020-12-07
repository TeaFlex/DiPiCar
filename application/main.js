const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const server = require('http').createServer(app);
const PiStream = require('pistreamer').PiStream;
const Ws = require('ws').Server;
const ws_server = new Ws({server});
const stream = new PiStream(ws_server);
const {GPIO_control} = require('./core/gpio_control');
const control = new GPIO_control(ws_server);
const port = 8060;

//Settings and static files
app.use(express.static('static_files'));

//root
app.get('/', (req, res)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.send("Connected !");
});

app.post('/config', bodyparser.json(), (req, res)=>{
    res.header('Access-Control-Allow-Origin', '*');
    if(req.body == null) res.status(500).send({error:'Incomplete configuration'});
    else{
        var infos = req.body;
        console.log(`Hostname: ${infos['hostname']}\nSSID: ${infos['ssid']}\nPassword: ${infos['wpa']}`);
        res.status(200).send();
    }
});
app.get('/users',(req,res)=>{
    res.header('Access-Control-Allow-Origin', '*');
    console.log('Should return users list to client');
    res.status(200).json([{id:123,name:'Jean'}]);
});
app.get('/stats', (req, res)=>{
    res.header('Access-Control-Allow-Origin', '*');
    console.log(`get stats from user${req.query.id}`);
    res.status(200);//.sendFile(STATS FROM THIS USER IN JSON);
});

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();

    app.options('*', (req, res) => {
        res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
        res.send();
    });
});


server.listen(port, () => {
    //require('pistreamer').createClient('./static_files/Scripts');
    console.log(`The app is running and listening to the port ${port}.`);
});