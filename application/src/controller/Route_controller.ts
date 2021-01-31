import express from 'express';
import { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import bodyparser from 'body-parser';
import {AppDB} from '../model/database/AppDB';
import { User } from '../model/database/Entities/User';
import { UserStats } from '../model/database/Entities/UserStats';


export class Route_controller{

    static async init(app: Express) {
        var db: AppDB = await AppDB.getInstance();

        app.use(express.static('static_files'));
        app.use(cors());
        app.use(helmet());
        app.use(express.json());

        //Home Page
        app.get('/', (req, res)=>{
            res.send(`Welcome ${req.ip} !`);
        });
        
        //Post of config (LAN mode only)
        app.post('/config', (req, res)=>{
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
                res.status(404).send(error.message);
            }
        });

        //Get a User by id
        app.get('/users/:id', async (req, res)=>{
            try {
                var id = parseInt(req.params["id"], 10);
                var json = await db.userDAO.getUserById(id);
                res.status(200).json(json);
            } catch (error) {
                console.error(error);
                res.status(404).send(error.message);
            }
        });

        //Post a user from JSON
        app.post('/users', async (req, res) => {
            try {
                var u: User = req.body;
                var id = await db.userDAO.saveUser(u);
                await db.userStatsDAO.initStats(id);
                res.status(200).send();
            } catch (error) {
                console.error(error);
                res.status(500).send(error.message);
            }
        });

        //Delete a User
        app.delete('/users/:id', async (req, res) => {
            try {
                //TODO: Token needed
                var id = parseInt(req.params["id"], 10);
                await db.userDAO.deleteUser(id);
                res.status(200).send();
            } catch (error) {
                console.error(error);
                res.status(500).send(error.message);
            }
        });

        //Get stats of a user
        app.get('/stats/:id', async (req, res)=>{
            try {
                var id = parseInt(req.params["id"], 10);
                var json = await db.userStatsDAO.getStatsById(id);
                res.status(200).json(json);
            } catch (error) {
                console.error(error);
                res.status(404).send(error.message);
            }
        });

        //Update stats of a user
        app.put('/stats', async (req, res) => {
            try {
                var s: UserStats = req.body;
                await db.userStatsDAO.updateStats(s);
                res.status(200).send();
            } catch (error) {
                console.error(error);
                res.status(500).send(error.message);
            }
        });
    }
}