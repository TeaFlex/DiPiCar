import { NextFunction, Request, Response } from "express";
import { resolveModuleName } from "typescript"
import {logger} from "../utilities/logger/Logger"

export default function successHandler(req: Request, res: Response, next: NextFunction) {
    logger.info(`(from ${req.ip}) ${res.locals.message}`);
    var status = parseInt(res.locals.status, 10);
    res.status(status).send(res.locals.json);
}