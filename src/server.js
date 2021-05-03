import app from './app.js';
import config from 'config';

/**
 * console info PORT for the APP.
 */

(async () => {
  console.info(`app running on port ${config.get('PORT')}`);
  await app.listen(config.get('PORT'));
})();
