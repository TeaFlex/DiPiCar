import express from 'express';
import { Express } from 'express';
import bodyparser from 'body-parser';
import {AppDB} from '../model/database/AppDB';


export class Route_controller{

    private app: Express;
    private db: AppDB;

    constructor(app: Express) {

        this.app = app;
        this.db = new AppDB();

        this.app.use(express.static('static_files'));

        this.app.get('/', (req, res)=>{
            res.header('Access-Control-Allow-Origin', '*');
            res.send("Connected !");
        });
        
        this.app.post('/config', bodyparser.json(), (req, res)=>{
            res.header('Access-Control-Allow-Origin', '*');
            if(req.body == null) res.status(500).send({error:'Incomplete configuration'});
            else{
                var infos = req.body;
                console.log(`Hostname: ${infos['hostname']}\nSSID: ${infos['ssid']}\nPassword: ${infos['wpa']}`);
                res.status(200).send();
            }
        });
        this.app.get('/users',(req, res)=>{
            res.header('Access-Control-Allow-Origin', '*');
            this.db.userDAO.getAllUsers().then((value) => {
                res.status(200).json(value);
            });
        });
        this.app.get('/stats', bodyparser.json(), (req, res)=>{
            res.header('Access-Control-Allow-Origin', '*');
            res.status(200);
            //TODO: send stats of user.
        });
        
        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
            next();
        
            this.app.options('*', (req, res) => {
                res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
                res.send();
            });
        });
    }

    public getExpressApp(): Express {
        return this.app;
    }
}