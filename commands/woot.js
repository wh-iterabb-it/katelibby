const request = require('superagent');

const logger = require('../utils/logger').default;
const config = require('../helpers/config_helper').default;
const BaseCommand = require('./utils/command_factory').default;

const factoryParams = {
  enabled: true,
  help_msg: `Woot command will request the latest sale and price from woot.com 👌\n\rSyntax is ${config.commandChar}woot { wine, sellout, electronics, home, tools, sport, computers, shirt }`,
  alias: false,
  nsfw: false,
};

const WootCommand = function WootCommand() {
  const basedCommand = !(this instanceof WootCommand) ? new BaseCommand(factoryParams) : BaseCommand;

  return Object.assign(Object.create(basedCommand), {
    primary: (args) => {
      const apiUrl = 'https://api.woot.com/1/sales/current.json/';
      let queryUrl = apiUrl;
      if (typeof args !== 'undefined') {
        switch (args) {
          case 'wine':
            queryUrl = queryUrl + 'wine.woot';
            break;
          case 'sellout':
            queryUrl = queryUrl + 'sellout.woot';
            break;
          case 'electronics':
            queryUrl = queryUrl + 'electronics.woot';
            break;
          case 'home':
            queryUrl = queryUrl + 'home.woot';
            break;
          case 'tools':
            queryUrl = queryUrl + 'tools.woot';
            break;
          case 'sport':
            queryUrl = queryUrl + 'sport.woot';
            break;
          case 'shirt':
            queryUrl = queryUrl + 'shirt.woot';
            break;
          case 'computers':
            queryUrl = queryUrl + 'computers.woot';
            break;
          default:
            queryUrl = queryUrl + 'www.woot.com';
            break;
        }
        return new Promise((resolve, reject) => {
          request.get(queryUrl).then((response) => {
            if (response.statusCode === 200) {
              const json = response.body;
              if (typeof json.sales[0] === 'undefined') {
                reject('Are you trying to make me crash?');
              } else {
                const url = json.sales[0].SaleUrl.split('?');
                const result = `${json.sales[0].Title} for ${json.sales[0].Price}\n\r${url[0]}`;

                resolve(result);
              }
            }
          });
        });
      }
    },
  });
};

const wootCommand = WootCommand();

export default wootCommand;
