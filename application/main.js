const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const port = 8060;

//Settings and static files
app.set('view engine', 'ejs');
app.use(express.static('static_files'));

//root
app.get('/', (req, res)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.render("template", {page:"home"});
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
app.get('/user', (req, res)=>{
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

app.listen(port, () => {
    console.log(`The app is running and listening to the port ${port}.`);
});