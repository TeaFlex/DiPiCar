import winston, { format } from "winston";

export var logger: winston.Logger = winston.createLogger({
    format: format.combine(
        format.timestamp(),
        format.splat(),
        format.colorize(),
        format.printf((info) => {
            return `[${info.timestamp}] [${info.level}]:\t${info.message}`;
        })
    ),
    transports: [
        new winston.transports.File({ level: 'error', filename: `logs/app-error.log`}),
        new winston.transports.File({ filename: 'logs/combined-logs.log'}),
        new winston.transports.Console()
    ]
});
