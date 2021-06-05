import { join } from "path";
import winston, { format } from "winston";
import { appPath } from "../Path";

export const logger = winston.createLogger({
    format: format.combine(
        format.timestamp(),
        format.splat(),
        format.colorize(),
        format.printf((info) => {
            return `[${info.timestamp}] [${info.level}]:\t${info.message}`;
        })
    )
});

export function initLogger() {
    if(logger.transports.length === 0) {
        const transports = [
            new winston.transports.File({ level: 'error', filename: join(appPath().logPath, 'dipicar-error.log'), maxsize: 1024 }),
            new winston.transports.File({ filename: join(appPath().logPath, 'dipicar-combined-logs.log'), maxsize: 1024 }),
            new winston.transports.Console()
        ];
        for (const transport of transports)
            logger.add(transport);
    }
}
