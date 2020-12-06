import dotenv from 'dotenv';

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
