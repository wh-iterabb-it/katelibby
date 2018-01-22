import request from 'request';

const apiUrl = 'https://api.woot.com/1/sales/current.json/';
module.exports = (callback, target, from, args) => {
  let queryUrl = 'https://api.woot.com/1/sales/current.json/';
  if (typeof args !== 'undefined') {
    switch (args) {
      case 'help':
        callback.say(target, 'Woot command will request the latest sale and price from woot.com 👌');
        callback.say(target, 'Syntax is ' + callback.config.commandChar +
         'woot { wine, sellout, electronics, home, tools, accessories, ' +
         'sports, kids, computers, shirt }');
        return 'help';
      case 'wine':
        queryUrl = apiUrl + 'wine.woot';
        break;
      case 'sellout':
        queryUrl = apiUrl + 'sellout.woot';
        break;
      case 'electronics':
        queryUrl = apiUrl + 'electronics.woot';
        break;
      case 'home':
        queryUrl = apiUrl + 'home.woot';
        break;
      case 'tools':
        queryUrl = apiUrl + 'tools.woot';
        break;
      case 'accessories':
        queryUrl = apiUrl + 'accessories.woot';
        break;
      case 'sports':
        queryUrl = apiUrl + 'sport.woot';
        break;
      case 'kids':
        queryUrl = apiUrl + 'kids.woot';
        break;
      case 'shirt':
        queryUrl = apiUrl + 'shirt.woot';
        break;
      case 'computers':
        queryUrl = apiUrl + 'computers.woot';
        break;
      default:
        queryUrl = 'https://api.woot.com/1/sales/current.json/www.woot.com';
        break;
    }
  }
  request(queryUrl, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const json = JSON.parse(body);
      if (typeof json.sales[0] === 'undefined') {
        callback.say(target, 'Are you trying to make me crash?');
      } else {
        callback.say(target, json.sales[0].Title +
        ' for ' + json.sales[0].Price);
        const url = json.sales[0].SaleUrl.split('?');
        callback.say(target, url[0]);
      }
    }
  });
};
