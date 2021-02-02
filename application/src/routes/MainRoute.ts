import { Router, Express } from 'express';

export class MainRoute {

    static init(app: Express){

        var router = Router();

        //Home Page
        router.get('/', (req, res)=>{
            res.send(`Welcome ${req.ip} !`);
        });
        
        //Post of config (LAN mode only)
        router.post('/config', (req, res)=>{
            if(req.body == null) res.status(500).send({error:'Incomplete configuration'});
            else{
                var infos = req.body;
                console.log(`Hostname: ${infos['hostname']}\nSSID: ${infos['ssid']}\nPassword: ${infos['wpa']}`);
                res.status(200).send();
            }
        });

        app.use('/', router);
    }
}