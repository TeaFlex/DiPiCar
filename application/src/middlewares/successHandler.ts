import { NextFunction, Request, Response } from "express";

export default function successHandler(req: Request, res: Response, next: NextFunction) {
    res.locals.message = res.locals.message || `${req.method} not allowed on "${req.url}".`;
    res.locals.status = parseInt(res.locals.status, 10) || 405;
    res.locals.json = res.locals.json || {
        status: res.locals.status,
        message: res.locals.message
    }
    next();
}