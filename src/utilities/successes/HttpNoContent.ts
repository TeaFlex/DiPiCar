import { HttpSuccess } from "./HttpSuccess";

export class HttpNoContent extends HttpSuccess{
    constructor(message: string) {
        super(message, undefined, 204);
    }
}