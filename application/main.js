const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const app = express();
const port = 8060;

app.set('view engine', 'ejs');
app.use(express.static('static_files'));

app.get('/', (req, res)=>{
    res.render("template", { page:"home" });
});

app.post('/jsonreception', bodyparser.json(), (req, res) => {
    if(req.body == null) res.sendStatus(418);
    else{
        var infos = req.body;
        console.log(`Hostname: ${infos['hostname']}\nSSID: ${infos['ssid']}\nPassword: ${infos['wpa']}`);
        //TODO: call controller and send response according if the infos are correct or not.
        res.status(200).send('OK');
    }
});


app.listen(port, () => {
    console.log(`The app is running and listening to the port ${port}.`);
});