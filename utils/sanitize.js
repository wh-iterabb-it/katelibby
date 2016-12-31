import entities from 'entities';

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

export function sanitize(data) {
  let clean;

  if (!Boolean(data)) {
    data = '';
  }

  if (Array.isArray(data) && data.length === 1) {
    clean = data[0];
  } else {
    clean = data;
  }

  // Change empty objects into strings
  if (Object.keys(clean).length === 0 && JSON.stringify(clean) === JSON.stringify({})) {
    clean = '';
  }

  clean = entities.decodeHTML(clean);

  // change html br to rn
  clean = clean.replace(/<\/?(br *\/?)>/gi, '\r\n');

  let lines = clean.split('\r\n');

  lines.forEach((l) => {
    l = l.trim();
  });

  // remove empty lines, or null
  lines = lines.filter((value) => {
    return !(value === '' || value === null);
  });

  clean = lines.join('\n');

  return clean;
}
