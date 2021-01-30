import express from 'express';
import { Express } from 'express';
import cors from 'cors';
import bodyparser from 'body-parser';
import {AppDB} from '../model/database/AppDB';


export class Route_controller{

    private app: Express;
    private db: AppDB;

    constructor(app: Express) {

        this.app = app;
        this.db = AppDB.getInstance();

        this.app.use(express.static('static_files'));
        this.app.use(cors());

        //Home Page
        this.app.get('/', (req, res)=>{
            res.send(`Welcome ${req.ip} !`);
        });
        
        //Post of config (LAN mode only)
        this.app.post('/config', bodyparser.json(), (req, res)=>{
            if(req.body == null) res.status(500).send({error:'Incomplete configuration'});
            else{
                var infos = req.body;
                console.log(`Hostname: ${infos['hostname']}\nSSID: ${infos['ssid']}\nPassword: ${infos['wpa']}`);
                res.status(200).send();
            }
        });

        //Get all users
        this.app.get('/users',(req, res)=>{
            this.db.userDAO.getAllUsers()
            .then((value) => {
                res.status(200).json(value);
            })
            .catch((reason) => {
                console.log(reason);
                res.status(500).send();
            });
        });

        //Post a user from JSON
        this.app.post('/users', bodyparser.json(), (req, res) => {
            console.log(req.body);
            this.db.userDAO.saveUser(req.body)
            .then(() => {
                res.status(200);
            })
            .catch((reason) => {
                console.log(reason);
                res.status(500).send();
            });
        });

        //Get stats of a user
        this.app.get('/stats', bodyparser.json(), (req, res)=>{
            res.status(200);
            //TODO: send stats of user.
        });
    }
}