import logger from '../../utils/logger';
import config from '../../helpers/config_helper';

class Command {
	constructor(params) {
		this.params = params;
	}

	async main(args) {
	  if (typeof args !== 'undefined') {
	    if(args==='help') {
	      return await Promise.resolve(this.params.help_msg);
	    }
	  } 

  	return await this.primary(args);
	}

	primary() {
		
	}
}

export default Command;
