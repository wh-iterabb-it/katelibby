const { createLogger, format, transports } = require('winston');

const {
  colorize, combine, timestamp, printf,
} = format;

const currentFormat = printf((options) => {
  return `${options.timestamp} ${options.level}: ${options.message}`;
});

const logger = createLogger({
  'level': 'info',
  format: combine(
    timestamp(),
    colorize(),
    currentFormat,
  ),
  transports: [
    new (transports.Console)(),
  ],
});

module.exports.default = logger;
