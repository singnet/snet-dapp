import createLogger from 'winston/dist/winston/create-logger';
import { format } from 'logform';

const logger = createLogger({
  format: format.simple(),
  level: process.env.DEBUG ? 'silly' : 'info',
});

export default logger;
