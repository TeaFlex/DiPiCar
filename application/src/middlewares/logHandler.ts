import { NextFunction, Request, Response } from "express";
import {logger} from "../utilities/logger/Logger"

export default function logHandler(req: Request, res: Response, next: NextFunction) {
    var level = (res.locals.status >= 400)? 'error' : 'info';
    logger.log(level, `(${req.method} on ${req.url} from ${req.ip}) ${res.locals.message}`);
    var status = parseInt(res.locals.status, 10);
    res.status(status).send(res.locals.json);
}