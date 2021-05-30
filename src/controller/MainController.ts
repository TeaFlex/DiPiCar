import { BaseController } from './BaseController';
import { Request, Response, NextFunction } from 'express';
import { MiscOperations } from '../model/misc';
import { HttpSuccess, HttpNoContent, HttpError, HttpCreated, NotFoundError } from '../utilities';

export class MainController extends BaseController {

    getStatus = async (req: Request, res: Response, next: NextFunction) => {
        const data = { 
            hostname: await MiscOperations.getHostname(),
            ...MiscOperations.getProcessInfos()
        };
        next(new HttpSuccess("API status sent.", data));
    }

    changeHostname = async (req: Request, res: Response, next: NextFunction) => {
        try {
            await MiscOperations.changeHostname(req.body["hostname"]);
            next(new HttpSuccess("Hostname changed."));
        } catch (error) {
            next(new HttpError(error.message));
        }
    }
}