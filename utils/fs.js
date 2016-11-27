import fs from 'fs';
import { promisifyAll } from 'bluebird';

export default promisifyAll(fs);
