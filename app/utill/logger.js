const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;

const contentFormat = printf(({ timestamp, level, message }) => {
    return `${timestamp} ${level}: ${message}`;
})

const logger = createLogger({
    format: combine(
        label({ label: '' }),
        timestamp(),
        contentFormat
    ),
    transports: [
        new transports.Console(),
        new transports.File({
            filename: './log/Activity.log',
            level: 'info'
        }),
        new transports.File({
            filename: './log/Error.log',
            level: 'error'
        })
    ]
});

module.exports = logger;
