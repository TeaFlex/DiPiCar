const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const form_control = require('./controller/form_control');
const app = express();
const https = require('https');
const http = require('http');
const fs = require('fs');
const port = 8060;

//Settings and static files
app.set('view engine', 'ejs');
app.use(express.static('static_files'));

//root
app.get('/', (req, res)=>{
    res.render("template", { page:"home" });
});

//json reception handler
app.post('/jsonreception', bodyparser.json(), (req, res) => {
    if(req.body == null) res.sendStatus(404);
    else{
        var infos = req.body;
        console.log(`Hostname: ${infos['hostname']}\nSSID: ${infos['ssid']}\nPassword: ${infos['wpa']}`);
        console.log(form_control.isValidName(infos['hostname']));
        res.status(200).send('OK');
    }
});

//http server (optionnal)
http.createServer(app).listen(port, () => {
    console.log(`The http server is running and listening to the port ${port}.`);
});

//https server
https.createServer({
        //credentials
        key: fs.readFileSync('ssl/Dipicar_ssl.key', 'utf-8'),
        cert: fs.readFileSync('ssl/Dipicar_ssl.crt', 'utf-8')
    }, app).listen(port+1, () => {
    console.log(`The https server is running and listening to the port ${port+1}.`);
});