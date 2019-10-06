require('dotenv').config();
import app from './src/app';

(async () => {
  await app();
  process.exit(0);
})();
