import express from 'express';
import sql from 'mssql';
import dbConfig from '../dbconfig.js';

const router = express.Router();

router.get('/', function (req, res) {
  const authenticatedUserId = req.session.authenticatedUser;
  const getData = async () => {
    try {
      let pool = await sql.connect(dbConfig);

      let orderResults = await pool
        .request()
        .input('customerId', sql.Int, authenticatedUserId)
        .query(
          'SELECT customerId, firstName, lastName, email, phonenum, address, city, state, postalCode, country, userid FROM customer WHERE customerId = @customerId'
        );

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

  if (authenticatedUserId) {
    getData();
  } else {
    res.write('unauthenticated');
    res.end();
  }
});

export default router;
