const logger = require('../../utils/logger').default;
const config = require('../../helpers/config_helper').default;

class Command {
	constructor(params) {
		this.params = params;
	}

	async main(args, appData) {
	  if (typeof args !== 'undefined') {
	    if(args==='help') {
	      return await Promise.resolve(this.params.help_msg);
	    }
	  }

  	return await this.primary(args, appData);
	}

	primary() {

	}
}

module.exports.default = Command;
