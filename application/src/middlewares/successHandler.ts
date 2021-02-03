import { NextFunction, Request, Response } from "express";

export default function successHandler(req: Request, res: Response, next: NextFunction) {
    res.locals.message = res.locals.message || "Request accepted but nothing happened."
    res.locals.status = parseInt(res.locals.status, 10) || 202;
    next();
}