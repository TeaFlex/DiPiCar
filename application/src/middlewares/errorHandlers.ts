import { NextFunction, Request, Response } from "express";
import { HttpError } from "../utilities/errors/HttpError";
import {logger} from "../utilities/logger/Logger"

export default function errorHandler (err: HttpError, req: Request, res: Response, next: NextFunction) {
    const message = err.shortmsg || "Oops, something went wrong...";
    res.locals.status = err.status || 500;
    res.locals.message = `${err.name} => ${err.message || message}`;
    res.locals.json = {
        error:{
            status: res.locals.status, 
            message: res.locals.message
        }
    };
    
    next();
}