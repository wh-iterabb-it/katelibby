import { Logger, transports } from 'winston';
import chalk from 'chalk';
import program from '../helpers/command_helper';

const level = program.debug ? 'debug' : 'info';

const logger = new (Logger)({
  transports: [
    new (transports.Console)({
      'timestamp': true,
      'level': level,
      formatter: function (options) {
        let message = '';
        let meta = '';
        
        if (options.message !== undefined) {
          message = options.message;
        }

        if (options.meta && Object.keys(options.meta).length) {
          meta = '\n\t' + JSON.stringify(options.meta);
        }
        
        let level = options.level.toUpperCase();

        switch (level) {
          case 'DEBUG':
            { level } = chalk.bgYellow(level);
            break;

          case 'INFO':
            { level } = chalk.cyan(level);
            break;

          case 'WARN':
            { level } = chalk.yellow(level);
            break;

          case 'ERROR':
            { level } = chalk.red(level);
            break;

          default:
            break;
        }

        let output = [
          `[${options.timestamp()}][${level}]`,
          message,
          meta
        ];

        return output.join(' ');
      }
    }),
  ],
});

export default logger;
