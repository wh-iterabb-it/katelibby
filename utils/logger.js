import { Logger, transports } from 'winston';
import program from '../helpers/command_helper';

const level = program.debug ? 'debug' : 'info';

const logger = new (Logger)({
  transports: [
    new (transports.Console)({
      'timestamp': true,
      'level': level,
    }),
  ],
});

export default logger;
