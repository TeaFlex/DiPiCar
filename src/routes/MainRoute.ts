import { Router, Express, Response, Request } from 'express';
import { BaseRoute } from './BaseRoute';

export class MainRoute extends BaseRoute {

    static init(app: Express){

        const router = Router();
        
        //Status of the app (200 if everything OK)
        router.get('/', (req: Request, res: Response) => {
            res.status(200).send({
                pid: process.pid,
                uptime: process.uptime()
            });
        });

        //Post of config (LAN mode only)
        router.post('/config', (req: Request, res: Response) => {
            if(!req.body) res.status(500).send({error:'Incomplete configuration'});
            else{
                var infos = req.body;
                console.log(`Hostname: ${infos['hostname']}\nSSID: ${infos['ssid']}\nPassword: ${infos['wpa']}`);
                res.status(200).send();
            }
        });

        app.use(this.getFullURI(), router);
    }
}