import entities from 'entities';

export function sanitize(text) {
  if (typeof text !== 'undefined') {
    text = text.replace(/<\/?(br *\/?)>/gi, '\r\n');
    text = text.replace(/<\/?([a-z][a-z0-9]*)\b[^>]*>/gi, '');
    text = entities.decodeHTML(text);
    return text;
  }
}
