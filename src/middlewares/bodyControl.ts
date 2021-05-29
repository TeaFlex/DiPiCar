import { NextFunction, Request, Response } from "express";
import { body, checkSchema, ParamSchema, validationResult } from "express-validator";
import { HttpError } from "../utilities/errors/HttpError";

export const userSchema: Record<string, ParamSchema> = {
    name: {
        isString: true,
        trim: true,
        isLength: {
            errorMessage: "A name must contain at least between 4 and 30 chars.",
            options: {
                min: 4,
                max: 30
            }
        }
    }
};

export const statsSchema: Record<string, ParamSchema> = {
    gameTime: {
        isInt: true
    }
};

export const networkSchema: Record<string, ParamSchema> = {
    ssid: {
        isString: true,
        trim: true,
        isLength: {
            errorMessage: "SSID must be between 1 and 30 chars.",
            options: {
                min: 1,
                max: 30
            }
        }
    }, 
    passphrase: {
        isString: true,
        isLength: {
            errorMessage: "SSID must be between 5 and 60 chars.",
            options: {
                min: 5,
                max: 60
            }
        }
    }
};

export const bodyControl = (req: Request, res: Response, next: NextFunction) => {
    if(!validationResult(req).isEmpty())
        next(new HttpError("Request Error.", 400));
    next();
}