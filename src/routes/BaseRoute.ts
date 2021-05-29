import { Router, Express, Response, Request } from 'express';
import { join } from 'path';

export abstract class BaseRoute {

    private static baseURI = "/api/";

    static init(app: Express) {
        throw new Error("You need to redefine this method first.");
    }

    static getFullURI = (path = "") => join(BaseRoute.baseURI, path);
}