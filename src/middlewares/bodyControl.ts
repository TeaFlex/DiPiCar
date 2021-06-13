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
        isString: true
    }
};

export const hostnameSchema: Record<string, ParamSchema> = {
    hostname: {
        isString: true,
        trim: true,
        isLength: {
            errorMessage: "Hostname must be between 2 and 15 chars.",
            options: {
                min: 2,
                max: 15
            }
        },
        matches: {
            options: /^[^\s\W]+$/gm,
            errorMessage: "Hostname must not contain any space or special chars."
        },
        
    }
};

export const bodyControl = (req: Request, res: Response, next: NextFunction) => {
    if(!validationResult(req).isEmpty())
        next(new HttpError("Request Error.", 400));
    next();
}