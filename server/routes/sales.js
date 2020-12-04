import express from 'express';
import sql from 'mssql';
import dbConfig from '../dbconfig.js';

const router = express.Router();

router.get('/', function (req, res) {
  if (!req.session.authenticatedUser) {
    res.send(undefined);
    return;
  }

  let adminInfo = {};

  getDailySales()
    .then((sales) => {
      adminInfo.sales = sales;
      res.send(adminInfo);
    })
    .catch(() => {
      adminInfo.err = 'Failed to retrieve sales information.';
      res.send(adminInfo);
    });
});

function getDailySales() {
  return new Promise((resolve, reject) => {
    sql.connect(dbConfig).then((conn) => {
      conn
        .request()
        .query(
          'SELECT \
            CONVERT(VARCHAR(20), orderDate, 1) AS orderDate, \
            SUM(totalAmount) as amount \
          FROM ordersummary \
          GROUP BY CONVERT(VARCHAR(20), orderDate, 1) \
          ORDER BY CONVERT(VARCHAR(20), orderDate, 1) DESC'
        )
        .then((result) => {
          resolve(result.recordset);
        })
        .catch((err) => {
          reject(err);
        });
    });
  });
}

export default router;
