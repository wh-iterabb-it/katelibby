import { Logger, transports } from 'winston';

const date = new Date();
export const name = './logs/' + date.toISOString() + '.log';

const logger = new (Logger)({
  transports: [
    new (transports.Console)({
      'timestamp': true,
      'level': 'info',
    }),
    // new (transports.File)({
    //   filename: name,
    //   'level': 'info',
    // }),
  ],
});

export default logger;
