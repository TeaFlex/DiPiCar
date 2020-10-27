const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const form_control = require('./controller/form_control');
const app = express();
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

app.listen(port, () => {
    console.log(`The app is running and listening to the port ${port}.`);
});