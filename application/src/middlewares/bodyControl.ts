import { NextFunction, Request, Response } from "express";
import { body, checkSchema, ParamSchema, validationResult } from "express-validator";
import { HttpError } from "../utilities/errors/HttpError";

export var userSchema: Record<string, ParamSchema> = {
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

export var statsSchema: Record<string, ParamSchema> = {
    userID: {
        isInt: true,
        toInt: true
    },
    lastConnection: {
        isDate: true
    },
    gameTime: {
        isInt: true
    }
};

export var bodyControl = (req: Request, res: Response, next: NextFunction) => {
    if(!validationResult(req).isEmpty())
        next(new HttpError(400, "Request Error."))
    next();
}