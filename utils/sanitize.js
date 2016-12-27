import entities from 'entities';

export function sanitize(text) {
  if (typeof text !== 'undefined') {
    text = text.replace(/<\/?(br *\/?)>/gi, '\r\n');
    text = text.replace(/<\/?([a-z][a-z0-9]*)\b[^>]*>/gi, '');
    text = entities.decodeHTML(text);
    return text;
  }
}

export function toHHMMSS(inctime) {
  const sec_num = parseInt(inctime, 10);
  let hours = Math.floor(sec_num / 3600);
  let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
  let seconds = sec_num - (hours * 3600) - (minutes * 60);
  if (hours < 10) { hours = '0' + hours; }
  if (minutes < 10) { minutes = '0' + minutes; }
  if (seconds < 10) { seconds = '0' + seconds; }
  const time = hours + ':' + minutes + ':' + seconds;
  return time;
}
