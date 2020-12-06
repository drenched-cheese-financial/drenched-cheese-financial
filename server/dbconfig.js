import { createRequire } from 'module';
const require = createRequire(import.meta.url);
require('dotenv').config();

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  server: process.env.DB_SERVER,

  options: {
    enableArithAbort: true,
    encrypt: true,
  },
};

export default dbConfig;
