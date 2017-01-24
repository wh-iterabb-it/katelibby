module.exports = (callback, target, from, args) => {
  if (typeof args !== 'undefined') {
    switch (args) {
      case 'help':
        callback.say(target, 'This is Kate Quest, A idle RPG 👌');
        callback.say(target, 'Syntax is ' + callback.config.commandChar +
         'rpg { start }');
        return 'help';
      case 'start':
        // target
        break;
      default:
        callback.say(target, 'Incorrect command, try typing "!rpg help" to get instructions');
        break;
    }
  }
  // request(query_url, (error, response, body) => {
  //   if (!error && response.statusCode === 200) {
  //     const json = JSON.parse(body);
  //     if (typeof json.sales[0] === 'undefined') {
  //       callback.say(target, 'Are you trying to make me crash?');
  //     } else {
  //       callback.say(target, json.sales[0].Title +
  //       ' for ' + json.sales[0].Price);
  //       const url = json.sales[0].SaleUrl.split('?');
  //       callback.say(target, url[0]);
  //     }
  //   }
  // });
};
