import express from 'express';
import sql from 'mssql';
import dbConfig from '../dbconfig.js';

const router = express.Router();

router.get('/', function (req, res) {
  /** Create connection, and validate that it connected successfully **/
  const getData = async () => {
    try {
      let pool = await sql.connect(dbConfig);

      let orderResults = await pool
        .request()
        .input('customerId', sql.Int, req.query.custId)
        .query('SELECT * FROM customer WHERE customerId = @customerId');

      res.write(JSON.stringify(orderResults));
      res.end();
    } catch {
      (error) => {
        console.log(error);
        res.write(error);
        console.dir(err);

        res.end();
      };
    }
  };

  getData();
});

export default router;
