/**
 * toHHMMSS
 * turns an amount of seconds into hours, minutes seconds
 * @param {int} inctime - an amount of seconds to be formatted
 * @return {string} 'hh:mm:ss' hours, minutes seconds returned as a string
 */
export default function toHHMMSS(inctime) {
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