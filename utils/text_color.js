import irc from 'irc';

class color {
  static getColors() {
    return [
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
  }

  static colorize(text, incColor) {
    const colorSet = new Set(color.getColors());
    if (colorSet.has(incColor)) {
      const newText = irc.colors.wrap(incColor, text);
      return newText;
    }
    return null;
  }

  static randColor(text) {
    const colors = color.getColors();
    const newText = irc.colors.wrap(colors[Math.floor(Math.random() * colors.length)], text);
    return newText;
  }
}

export default color;
