import { NextFunction, Request, Response } from "express";
import { HttpError } from "../utilities/errors/HttpError";
import { param, validationResult } from "express-validator";

export default function errorHandler (err: HttpError, req: Request, res: Response, next: NextFunction) {
    const message = err.shortmsg || "Oops, something went wrong...";
    var errors = validationResult(req);
    res.locals.status = err.status || 500;
    res.locals.message = `${err.name} => ${err.message || message}`;
    res.locals.json = {
        requestErrors: errors.array(),
        serverError: {
            status: res.locals.status, 
            message: err.message
        }
    }
    
    next();
}