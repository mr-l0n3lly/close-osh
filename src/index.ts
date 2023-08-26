import dotenv from 'dotenv';

import { app } from './app';
import { logger } from './utils';
import * as path from 'path';

dotenv.config({
  path: path.join(__dirname, '..', '.env'),
  debug: true,
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  logger.info(`Server started on port ${PORT}`)
})
