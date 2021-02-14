import { Router, Express, Response, Request } from 'express';

export class MainRoute {

    static init(app: Express){

        const router = Router();
        
        router.get('/', (req: Request, res: Response) => {
            res.status(200).send();
        });

        //Post of config (LAN mode only)
        router.post('/config', (req: Request, res: Response) => {
            if(req.body == null) res.status(500).send({error:'Incomplete configuration'});
            else{
                var infos = req.body;
                console.log(`Hostname: ${infos['hostname']}\nSSID: ${infos['ssid']}\nPassword: ${infos['wpa']}`);
                res.status(200).send();
            }
        });

        app.use('/api', router);
    }
}