import winston, { format } from "winston";

export var logger: winston.Logger = winston.createLogger({
    format: format.combine(
        format.timestamp(),
        format.colorize(),
        format.json()
    ),
    transports: [
        new winston.transports.File({ level: 'error', filename: `logs/app-error.log`}),
        new winston.transports.Console({
            level: 'info',
            format: format.combine(
                format.timestamp(),
                format.splat(),
                format.printf((info) => {
                    return `[${info.timestamp}] [${info.level}]:\t${info.message}`;
                })
            )
        })
    ]
});
