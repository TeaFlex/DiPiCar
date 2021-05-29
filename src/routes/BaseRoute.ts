import { Router, Express, Response, Request } from 'express';

export abstract class BaseRoute {
    static init(app: Express) {
        throw new Error("You need to redefine this method first.");
    }
}