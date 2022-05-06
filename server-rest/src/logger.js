import { transports, createLogger, format } from 'winston';

const logger = createLogger({
    level: 'info',
    format: format.combine(format.timestamp(), format.json()),
    transports: [
        new transports.File({
            filename: 'error.log',
            level: 'error',
            timestamp: true,
        }),
        new transports.File({ filename: 'combined.log', timestamp: true }),
    ],
});

logger.stream = {
    write: function (message, encoding) {
        logger.info(message.substring(0, message.lastIndexOf('\n')));
    },
};

if (process.env.NODE_ENV !== 'production') {
    logger.add(new transports.Console({ format: format.simple() }));
}

export default logger;
