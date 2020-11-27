import express from 'express';
import sql from 'mssql';
import dbConfig from '../dbconfig.js';

const router = express.Router();

router.get('/', function (req, res) {
  getOrderSummaryWithOrderId(req.query.orderId)
    .then((response) => {
      res.send(response.recordset.length > 0);
    })
    .catch(() => {
      res.end();
    });
});

function getOrderSummaryWithOrderId(orderId) {
  return new Promise((resolve, reject) => {
    sql.connect(dbConfig).then((conn) => {
      conn
        .request()
        .input('orderId', sql.Int, orderId)
        .query('SELECT orderId FROM orderSummary WHERE orderId = @orderId')
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  });
}

export default router;
