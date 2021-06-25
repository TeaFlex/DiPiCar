import { NextFunction, Request, Response } from "express";
import { HttpError } from "../utilities";
import { JwtPayload, verify } from "jsonwebtoken";

export function tokenHandler(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(' ')[1];

    if(!token) next(new HttpError("Bad token", 400));

    //imagine putting secrets in prod,
    //haha just kidding...
    //...unless ??? 😳
    const secret = "very_secret_key";

    let decoded: string | JwtPayload;
    try {
        decoded = verify(token!, secret);
    } catch (error) {    
        next(new HttpError("Bad authentication", 401));
    }
    next();
}