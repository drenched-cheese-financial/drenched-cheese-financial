import express from 'express';
import sql from 'mssql';
import dbConfig from '../dbconfig.js';

const router = express.Router();

router.get('/', function (req, res) {
  if (!req.session.authenticatedUser) {
    res.send(undefined);
    return;
  }

  getCustomers()
    .then((customers) => {
      res.send(customers);
    })
    .catch((err) => {
      console.dir(err);
      res.send({ err: 'Failed to retrieve customers.' });
    });
});

function getCustomers() {
  return new Promise((resolve, reject) => {
    sql.connect(dbConfig).then((conn) => {
      conn
        .request()
        .query(
          `SELECT customerId AS id, firstName, lastName, userId AS username, email, phonenum AS phone FROM customer`
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
