import { HttpSuccess } from "./HttpSuccess";

export class HttpCreated extends HttpSuccess{
    constructor(message: string, json?: {[key: string]: any}) {
        super(message, json, 201);
    }
}