import express from 'express';
import { Express } from 'express';
import cors from 'cors';
import bodyparser from 'body-parser';
import {AppDB} from '../model/database/AppDB';
import { User } from '../model/database/Entities/User';


export class Route_controller{

    static async init(app: Express) {
        var db: AppDB = await AppDB.getInstance();

        app.use(express.static('static_files'));
        app.use(cors());

        //Home Page
        app.get('/', (req, res)=>{
            res.send(`Welcome ${req.ip} !`);
        });
        
        //Post of config (LAN mode only)
        app.post('/config', bodyparser.json(), (req, res)=>{
            if(req.body == null) res.status(500).send({error:'Incomplete configuration'});
            else{
                var infos = req.body;
                console.log(`Hostname: ${infos['hostname']}\nSSID: ${infos['ssid']}\nPassword: ${infos['wpa']}`);
                res.status(200).send();
            }
        });

        //Get all users
        app.get('/users', async (req, res)=>{
            try {
                var json = await db.userDAO.getAllUsers();
                res.status(200).json(json);
            } catch (error) {
                console.error(error);
                res.status(500).send(error);
            }
        });

        //Post a user from JSON
        app.post('/users', bodyparser.json(), async (req, res) => {
            try {
                var tempUser: User = req.body;
                var id = await db.userDAO.saveUser(tempUser);
                await db.userStatsDAO.initStats(id);
                res.status(200).send();
            } catch (error) {
                console.error(error);
                res.status(500).send(error);
            }
        });

        //Get stats of a user
        app.get('/stats', bodyparser.json(), async (req, res)=>{
            try {
                var json = await db.userStatsDAO.getStats(req.body["id"]);
                res.status(200).json(json);
            } catch (error) {
                console.error(error);
                res.status(500).send(error);
            }
        });
    }
}