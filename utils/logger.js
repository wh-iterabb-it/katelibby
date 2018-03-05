import { Logger, transports } from 'winston';
import chalk from 'chalk';
import dateformat from 'dateformat';
import program from '../helpers/command_helper';

const currentLevel = program.debug ? 'debug' : 'info';

const debugColor = '#8C9440';
const infoColor = '#C5C8C6';
const warnColor = '#DE935F'; // error
const errColor = '#A54242'; // orangered

const logger = new (Logger)({
  transports: [
    new (transports.Console)({
      timestamp() {
        return dateformat(Date.now(), 'yyyy-mm-dd HH:MM:ss.l');
      },
      'level': currentLevel,
      formatter(options) {
        let meta = '';

        if (options.meta && Object.keys(options.meta).length) {
          meta = '\n\t' + JSON.stringify(options.meta);
        }
        let formattedLevel = options.level.toUpperCase();
        switch (formattedLevel) {
          case 'DEBUG':
            formattedLevel = `[${chalk.hex(debugColor)(formattedLevel)}][ 🎺 ]`;
            break;

          case 'INFO':
            formattedLevel = `[ ${chalk.hex(infoColor)(formattedLevel)}][ • ]`;
            break;

          case 'WARN':
            formattedLevel = `[ ${chalk.hex(warnColor)(formattedLevel)}][ ⚠ ]`;
            break;

          case 'ERROR':
            formattedLevel = `[${chalk.hex(errColor)(formattedLevel)}][🔥 ]`;
            break;

          default:
            break;
        }

        const output = [
          `[${options.timestamp()}]${formattedLevel}`,
          options.message,
          meta,
        ];

        return output.join(' ');
      },
    }),
  ],
});

export default logger;
