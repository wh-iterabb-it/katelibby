import irc from 'irc';

const colors = [
  'white',
  'black',
  'gray',
  'light_gray',
  'dark_blue',
  'dark_green',
  'light_red',
  'dark_red',
  'magenta',
  'orange',
  'yellow',
  'light_green',
  'cyan',
  'light_cyan',
  'light_blue',
  'light_magenta',
  'reset',
];

export function color(text, inc_color) {
  if (typeof colors[inc_color] !== 'undefined') {
    const newText = irc.colors.wrap(inc_color, text);
    return newText;
  }
  return null;
}

export function randColor(text) {
  const newText = irc.colors.wrap(colors[Math.floor(Math.random() * colors.length)], text);
  return newText;
}
