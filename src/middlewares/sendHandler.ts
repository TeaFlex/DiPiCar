import { NextFunction, Request, Response } from "express";
import {logger} from "../utilities/logger/Logger"

export function sendHandler(req: Request, res: Response, next: NextFunction) {
    const status = parseInt(res.locals.status ?? 405, 10);
    res.locals.message = res.locals.message ?? `${req.method} not allowed on "${req.url}".`;

    const level = (status >= 400)? 'error' : 'info';
    logger.log(level, `(${req.method} on ${req.url} from ${req.ip}) ${res.locals.message}`);

    res.status(status).send(res.locals.json);
}