export class HttpError extends Error {

    public status?: number;
    public shortmsg?: string;

    constructor(message?: string, status?: number) {
        super(message);
        this.shortmsg = message;
        this.status = status ?? 500;
        this.name = `HTTP ERROR [code ${this.status}]`;
    }
}