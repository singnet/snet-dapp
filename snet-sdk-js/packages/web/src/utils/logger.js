import { logger } from '../sdk-core';
import BrowserConsole from './BrowserConsole';

logger.add(new BrowserConsole({
    level: 'debug',
}));
