import express from 'express';
import sql from 'mssql';
import dbConfig from '../dbconfig.js';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const router = express.Router();

router.get('/', (req, res) => {
  const reqCustomerId = req.query.customerId;
  var allData = [];

  const getOrderData = async function () {
    try {
      //get db connection
      let pool = await sql.connect(dbConfig);
      let orderResults;
      if (reqCustomerId) {
        orderResults = await pool
          .request()
          .input('reqCustomerId', sql.VarChar, reqCustomerId)
          .query(
            'SELECT orderId,orderDate, ordersummary.customerId, customer.firstName,customer.lastName, totalAmount ' +
              'from ordersummary left join customer on ordersummary.customerId = customer.customerId WHERE ordersummary.customerId = @reqCustomerId order by orderId'
          );
      } else {
        orderResults = await pool
          .request()
          .query(
            '  SELECT orderId,orderDate, ordersummary.customerId, customer.firstName,customer.lastName, totalAmount ' +
              'from ordersummary left join customer on ordersummary.customerId = customer.customerId order by orderId'
          );
      }

      for (let i = 0; i < orderResults.recordset.length; i++) {
        var orderData = [];
        let record = orderResults.recordset[i];
        orderData.push({
          orderId: record.orderId,
          orderDate: record.orderDate,
          customerId: record.customerId,
          customerName: record.firstName + ' ' + record.lastName,
          totalAmount: '$' + record.totalAmount.toFixed(2),
        });

        let productResults = await pool
          .request()
          .input('safeOrderId', sql.VarChar, record.orderId)
          .query(
            `select productId, quantity, price from orderproduct where orderId=@safeOrderId order by productId`
          );

        var productData = [];
        productResults.recordset.forEach((productRecord) => {
          productData.push({
            productId: productRecord.productId,
            quantity: productRecord.quantity,
            price: '$' + productRecord.price.toFixed(2),
          });
        });

        allData.push([orderData, productData]);
      }
    } catch {
      (error) => {
        console.log(error);
        res.write(error);
        console.dir(err);

        res.end();
      };
    }
  };

  getOrderData().then(function () {
    res.send(allData);
  });
});

export default router;
