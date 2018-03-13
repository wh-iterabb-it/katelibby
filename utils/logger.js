import { createLogger, format, transports } from 'winston';
import chalk from 'chalk';

import program from '../helpers/command_helper';

const { combine, timestamp, label, printf } = format;

const currentLevel = program.debug ? 'debug' : 'info';

const customFormat = printf((options) => {
  const debugColor = chalk.hex('#8C9440').bold;
  const infoColor = chalk.hex('#C5C8C6').bold;
  const warnColor = chalk.hex('#DE935F').bold; // error
  const errColor = chalk.hex('#A54242').bold; // orangered
  let formattedLevel = options.level.toUpperCase();
  switch (formattedLevel) {
    case 'DEBUG':
      formattedLevel = `${debugColor(formattedLevel)}`;
      break;

    case 'INFO':
      formattedLevel = ` ${infoColor(formattedLevel)}`;
      break;

    case 'WARN':
      formattedLevel = ` ${warnColor(formattedLevel)}`;
      break;

    case 'ERROR':
      formattedLevel = `${errColor(formattedLevel)}`;
      break;
  }
  return `[${options.timestamp}][${formattedLevel}]: ${options.message}`;
});

const logger = createLogger({
  'level': currentLevel,
  format: combine(
      timestamp(),
      customFormat
    ),
  transports: [
    new (transports.Console)(),
  ],
});

export default logger;
