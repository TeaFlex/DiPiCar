import winston, { format } from "winston";
import { resolvePath, Path } from "../Path";

export const logger = winston.createLogger({
    format: format.combine(
        format.timestamp(),
        format.splat(),
        format.colorize(),
        format.printf((info) => {
            return `[${info.timestamp}] [${info.level}]:\t${info.message}`;
        })
    ),
    transports: [
        new winston.transports.File({ level: 'error', filename: resolvePath(Path.env.logPath, 'dipicar-error.log'), maxsize: 1024 }),
        new winston.transports.File({ filename: resolvePath(Path.env.logPath, 'dipicar-combined-logs.log'), maxsize: 1024 }),
        new winston.transports.Console()
    ]
});
