import { HttpError } from "./HttpError";

export class NotFoundError extends HttpError {
    constructor(message: string = "This resource doesn't exist.") {
        super(message, 404);
    }
}