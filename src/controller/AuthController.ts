import { Response, Request, NextFunction } from "express";
import { BaseController } from "./BaseController";
import { sign } from "jsonwebtoken";
import { HttpSuccess } from "../utilities";

export class AuthController extends BaseController {
    
    genToken = async (req: Request, res: Response, next: NextFunction) => {
        //don't put this in prod lol
        const secret = "very_secret_key";
        const token = sign({username: "pi"}, secret, {expiresIn: '1800s'});
        next(new HttpSuccess("Token generated", { token }));
    }
}