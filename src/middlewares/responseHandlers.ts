import { NextFunction, Request, Response } from "express";
import { HttpError } from "../utilities/errors/HttpError";
import { param, validationResult } from "express-validator";
import { HttpSuccess } from "../utilities/successes/HttpSuccess";

export function responseHandler (obj: any, req: Request, res: Response, next: NextFunction) {
    if(obj instanceof HttpError) 
        errorHandler(obj, req, res, next);
    else
        successHandler(obj, req, res, next);
}

function errorHandler (err: HttpError, req: Request, res: Response, next: NextFunction) {
    const message = err.shortmsg || "Oops, something went wrong...";
    const errors = validationResult(req);
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

function successHandler(success: HttpSuccess, req: Request, res: Response, next: NextFunction) {
    res.locals.message = success.message;
    res.locals.status = success.status;
    res.locals.json = success.json || {
        status: res.locals.status,
        message: res.locals.message
    }
    next();
}

export function catchError(
    func: (req: Request, res: Response, next: NextFunction) => Promise<any> 
    ) {     
    return (req: Request, res: Response, next: NextFunction) => {
        return func(req, res, next).catch(next);
    };
}