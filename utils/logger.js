import { createLogger, format, transports } from 'winston';
import program from '../helpers/command_helper';

const { colorize, combine, timestamp, printf } = format;

const level = program.debug ? 'debug' : 'info';

const currentFormat = printf((options) => {
  return `${options.timestamp} ${options.level}: ${options.message}`;
});

const logger = createLogger({
  'level': level,
  format: combine(
    timestamp(),
    colorize(),
    currentFormat,
  ),
  transports: [
    new (transports.Console)(),
  ],
});

export default logger;