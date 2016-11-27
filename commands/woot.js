import request from 'request';
const api_url = 'https://api.woot.com/1/sales/current.json/';
module.exports = (callback, target, from, args) => {
  let query_url = 'https://api.woot.com/1/sales/current.json/';
  if (typeof args !== 'undefined') {
    switch (args) {
      case 'help':
        callback.say(target, 'Woot command will request the latest sale and price from woot.com 👌');
        callback.say(target, 'Syntax is ' + callback.config.commandChar +
         'woot { wine, sellout, electronics, home, tools, accessories, ' +
         'sports, kids, computers, shirt }');
        return 'help';
      case 'wine':
        query_url = api_url + 'wine.woot';
        break;
      case 'sellout':
        query_url = api_url + 'sellout.woot';
        break;
      case 'electronics':
        query_url = api_url + 'electronics.woot';
        break;
      case 'home':
        query_url = api_url + 'home.woot';
        break;
      case 'tools':
        query_url = api_url + 'tools.woot';
        break;
      case 'accessories':
        query_url = api_url + 'accessories.woot';
        break;
      case 'sports':
        query_url = api_url + 'sport.woot';
        break;
      case 'kids':
        query_url = api_url + 'kids.woot';
        break;
      case 'shirt':
        query_url = api_url + 'shirt.woot';
        break;
      case 'computers':
        query_url = api_url + 'computers.woot';
        break;
      default:
        query_url = 'https://api.woot.com/1/sales/current.json/www.woot.com';
        break;
    }
  }
  request(query_url, (error, response, body) => {
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
