import { BaseController } from './BaseController';
import { WpaOperations } from '../model';
import { Request, Response, NextFunction } from 'express';
import { HttpSuccess, HttpNoContent, HttpError, HttpCreated, NotFoundError } from '../utilities';

export class NetworkController extends BaseController {

    getNetworks = async (req: Request, res: Response, next: NextFunction) => {
        const data = await WpaOperations.getNetworkList();
        if(data.length)
            next(new HttpSuccess("List of saved networks sent.", data));
        else
            next(new HttpNoContent("The list of saved network is empty."));
    }

    getAccessPoints =  async (req: Request, res: Response, next: NextFunction) => {
        const data = await WpaOperations.getAccessPoints();
        if(data.length)
            next(new HttpSuccess("List of scanned access points sent.", data));
        else
            next(new HttpNoContent("There's no accesspoint available."));
    } 

    addNetwork =  async (req: Request, res: Response, next: NextFunction) => {
        try {
            const net = { ...req.body };
            await WpaOperations.addNetwork(net.ssid, net.passphrase);
            next(new HttpCreated(`Network "${net.ssid}" added.`));
        } catch (error) {
            const code = ((error.message as string).includes("exists"))? 409 : 500; 
            next(new HttpError(error.message, code));
        }
    } 

    removeNetworkById =  async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = parseInt(req.params["id"], 10);
            await WpaOperations.removeNetworkById(id);
            next(new HttpCreated(`Network of id "${id}" removed.`));
        } catch (error) {
            if((error.message as string).includes("not exist"))
                next(new NotFoundError(error.message));
            else
                next(new HttpError(error.message));
        }
    } 

    removeNetworkBySSID = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const ssid = req.params["ssid"];
            await WpaOperations.removeNetwork(ssid);
            next(new HttpCreated(`Network "${ssid}" removed.`));
        } catch (error) {
            if((error.message as string).includes("not exist"))
                next(new NotFoundError(error.message));
            else
                next(new HttpError(error.message));
        }
    }

    getIPs = async (req: Request, res: Response, next: NextFunction) => {
        let iftype = req.params["type"] ?? null;
        const infos = await WpaOperations.getIPs();
        if(infos.length) {
            if(iftype === "ap") iftype = "access point";
            const result = (iftype)? infos.find(v=>v.type === iftype) : infos;
            if(result)
                next(new HttpSuccess("IP(s) sent.", result));
            else
                next(new NotFoundError(`Verify if the value is "client" or "ap". If so, check if your interfaces are correctly configured.`));
        }
        else
            next(new HttpNoContent("No IP to send."));
    }

}