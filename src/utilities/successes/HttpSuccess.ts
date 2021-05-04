export class HttpSuccess {
    constructor(
        public message = "Success",
        public json?: {[key: string]: any},
        public status = 200
        ) {}
}