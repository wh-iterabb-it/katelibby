import { Logger, transports } from 'winston';

export let name = new Date();
name = './logs/' + name.toISOString() + '.log';
const logger = new (Logger)({
  transports: [
    // new (transports.Console)({
    //   'timestamp': true,
    //   'level': 'info',
    // }),
    new (transports.File)({
      filename: name,
      'level': 'info',
    }),
  ],
});

export default logger;
