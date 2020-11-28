import express from 'express';
import sql from 'mssql';
import dbConfig from '../dbconfig.js';

const router = express.Router();

router.get('/', (req, res) => {
  /** Create connection, and validate that it connected successfully **/
  const getData = async () => {
    try {
      console.log('hey');
      //get db connection
      let pool = await sql.connect(dbConfig);

      let orderResults = await pool
        .request()
        .query(
          'SELECT orderId, orderDate, ordersummary.customerId, customer.firstName,customer.lastName, totalAmount ' +
            'from ordersummary left join customer on ordersummary.customerId = customer.customerId order by orderId'
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

  getData();
});

export default router;
