import express from 'express';
import sql from 'mssql';
import fs from 'fs';
import dbConfig from '../dbconfig.js';

const router = express.Router();

router.get('/', (req, res) => {
  (async function () {
    try {
      let pool = await sql.connect(dbConfig);

      let data = fs.readFileSync('./data/data.ddl', { encoding: 'utf8' });
      let commands = data.split(';');
      for (let i = 0; i < commands.length; i++) {
        let command = commands[i];
        let result = await pool.request().query(command);
        res.write(JSON.stringify(result));
      }

      res.end();
    } catch (err) {
      console.dir(err);
      res.send(err);
    }
  })();
});

export default router;
