import entities from 'entities';

export default function sanitize(data) {
  let clean;

  if (!data) {
    data = '';
  }

  if (Array.isArray(data) && data.length === 1) {
    clean = data[0]; // eslint-disable-line
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
    if (l) {
      l = l.trim();
    }
  });

  // remove empty lines, or null
  lines = lines.filter((value) => {
    return !(value === '' || value === null);
  });

  clean = lines.join('\n');

  return clean;
}
