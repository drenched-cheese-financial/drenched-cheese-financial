import express from 'express';
import sql from 'mssql';
import dbConfig from '../dbconfig.js';

const router = express.Router();

router.get('/', function (req, res) {
  if (!req.session.authenticatedUser) {
    res.end();
    return;
  }

  getCustomer(req.session.authenticatedUser).then((customer) => {
    res.send(customer.userId);
  }).catch(() => {
    res.end();
  });
});

function getCustomer(customerId) {
  return new Promise((resolve, reject) => {
    sql.connect(dbConfig).then((conn) => {
      conn
        .request()
        .input('customerId', sql.Int, customerId)
        .query('SELECT userId FROM customer WHERE customerId = @customerId')
        .then((result) => {
          resolve(result.recordset[0]);
        })
        .catch((err) => {
          reject(err);
        });
    });
  });
}

export default router;
