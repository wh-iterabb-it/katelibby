import { Logger, transports } from 'winston';
import chalk from 'chalk';
import program from '../helpers/command_helper';

const level = program.debug ? 'debug' : 'info';

const logger = new (Logger)({
  transports: [
    new (transports.Console)({
      timestamp: function () {
          return dateformat(Date.now(), "yyyy-mm-dd HH:MM:ss.l");
      },
      'level': level,
      formatter: function (options) {
        let meta = '';

        if (options.meta && Object.keys(options.meta).length) {
          meta = '\n\t' + JSON.stringify(options.meta);
        }
        let formattedLevel = options.level.toUpperCase();
        switch (formattedLevel) {
          case 'DEBUG':
            formattedLevel = chalk.bgYellow(formattedLevel);
            break;

          case 'INFO':
            formattedLevel = chalk.cyan(formattedLevel);
            break;

          case 'WARN':
            formattedLevel = chalk.yellow(formattedLevel);
            break;

          case 'ERROR':
            formattedLevel = chalk.red(formattedLevel);
            break;

          default:
            break;
        }

        let output = [
          `[${options.timestamp()}][${formattedLevel}]`,
          options.message,
          meta
        ];

        return output.join(' ');
      }
    }),
  ],
});

export default logger;
