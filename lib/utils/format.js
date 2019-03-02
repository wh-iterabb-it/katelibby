const moment = require('moment');

const urlRegex = require('./urlRegex');

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
  let minutes = Math.floor(secNum / minSec);
  secNum -= minutes * minSec;
  let seconds = secNum;

  if (days < 10) { days = `0${days}`; }
  if (hours < 10) { hours = `0${hours}`; }
  if (minutes < 10) { minutes = `0${minutes}`; }
  if (seconds < 10) { seconds = `0${seconds}`; }

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

  if (hours < 10) { hours = `0${hours}`; }
  if (minutes < 10) { minutes = `0${minutes}`; }
  if (seconds < 10) { seconds = `0${seconds}`; }
  const time = `${hours}:${minutes}:${seconds}`;

  return time;
}

function formatMoney(incInt) {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  });

  const factoredNumber = formatter.format(incInt);
  return factoredNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * detectURL
 * @param {string} str - a string to check for a url in it
 */
function detectURL(str) {
  if (str.length < 2083 && (str.match(urlRegex))) {
    const match = str.match(urlRegex);
    return match[0];
  }
  return false;
}

/**
 * formatPast
 * takes a time stamp from the past and calculates the hh:mm:ss it was in the past
 * @param {string} intDate - a time stamp in the past in seconds
 */
function formatPast(intDate) {
  const timestamp = moment.unix(intDate);
  const now = moment.unix(new Date().getTime() / 1000);
  const difference = now.diff(timestamp);
  const duration = moment.duration(difference);
  return Math.floor(duration.asHours()) + moment.utc(difference).format(':mm:ss');
}

module.exports = {
  toHHMMSS, toDDHHMMSS, formatMoney, formatPast,
};
