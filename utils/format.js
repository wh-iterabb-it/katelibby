/**
 * toHHMMSS
 * turns an amount of seconds into days, hours, minutes seconds
 * @param {int} inctime - an amount of seconds to be formatted
 * @return {string} 'dd:hh:mm:ss' days, hours, minutes seconds returned as a string
 */
function toDDHHMMSS(inctime) {
  let secNum = parseInt(inctime, 10);

  const minSec = 60;
  const hourSec = 3600;
  const daySec = 86400;

  let days = Math.floor(secNum / daySec);
  secNum -= days * daySec;
  let hours = Math.floor(secNum / hourSec);
  secNum -= hours * hourSec;
  let minutes = Math.floor(secNum  / minSec);
  secNum -= minutes * minSec;
  let seconds = secNum;

  if (days < 10) { days = '0' + days; }
  if (hours < 10) { hours = '0' + hours; }
  if (minutes < 10) { minutes = '0' + minutes; }
  if (seconds < 10) { seconds = '0' + seconds; }

  const time = `${days}:${hours}:${minutes}:${seconds}`;

  return time;
}

/**
 * toHHMMSS
 * turns an amount of seconds into hours, minutes seconds
 * @param {int} inctime - an amount of seconds to be formatted
 * @return {string} 'hh:mm:ss' hours, minutes seconds returned as a string
 */
function toHHMMSS(inctime) {
  const secNum = parseInt(inctime, 10);

  let hours = Math.floor(secNum / 3600);
  let minutes = Math.floor((secNum - (hours * 3600)) / 60);
  let seconds = secNum - (hours * 3600) - (minutes * 60);

  if (hours < 10) { hours = '0' + hours; }
  if (minutes < 10) { minutes = '0' + minutes; }
  if (seconds < 10) { seconds = '0' + seconds; }
  const time = hours + ':' + minutes + ':' + seconds;

  return time;
}

export default {toHHMMSS, toDDHHMMSS}
