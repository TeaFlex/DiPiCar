const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const form_control = require('./controller/form_control');
const app = express();
const port = 8060;

app.set('view engine', 'ejs');
app.use(express.static('static_files'));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();

    app.options('*', (req, res) => {
        res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
        res.send();
    });
});

app.get('/', (req, res)=>{
    res.render("template", { page:"home" });
});

app.post('/jsonreception', bodyparser.json(), (req, res) => {
    if(req.body == null) res.sendStatus(404);
    else{
        var infos = req.body;
        console.log(`Hostname: ${infos['hostname']}\nSSID: ${infos['ssid']}\nPassword: ${infos['wpa']}`);
        console.log(form_control.isValidName(infos['hostname']));
        res.status(200).send('OK');
    }
});


app.listen(port, () => {
    console.log(`The app is running and listening to the port ${port}.`);
});