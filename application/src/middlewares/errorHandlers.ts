import { NextFunction, Request, Response } from "express";
import { HttpError } from "../utilities/errors/HttpError";
import {logger} from "../utilities/logger/Logger"

export default function errorHandler (err: HttpError, req: Request, res: Response, next: NextFunction) {
    const status = err.status || 500;
    const message = err.shortmsg || "Oops, something went wrong...";
    var finalError = {
        error:{
            status, 
            message
        }
    };
    logger.error(`(from ${req.ip}) ${err.name} => ${err.message}`);
    res.status(status).send(finalError);
}