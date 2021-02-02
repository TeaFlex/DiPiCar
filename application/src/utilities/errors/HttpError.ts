export class HttpError extends Error {

    public status?: number;
    public shortmsg?: string;

    constructor(status?: number, message?: string) {
        super(message);
        this.shortmsg = message;
        this.status = status;
        this.name = `HTTP ERROR [code ${status}]`;
    }
}