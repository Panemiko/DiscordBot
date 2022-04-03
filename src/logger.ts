import { createLogger, format, transports } from 'winston'

const logger = createLogger({
    format: format.combine(
        format.colorize(),
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
        }),
        format.printf(({ level, message, timestamp }) => {
            return `${timestamp} [${level}] - ${message}`
        })
    ),
    transports: [
        new transports.Console({}),
        new transports.File({ filename: 'info.log', level: 'info' }),
    ],
})

export default logger
