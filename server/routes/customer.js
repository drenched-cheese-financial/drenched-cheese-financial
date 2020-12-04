import express from 'express';
import sql from 'mssql';
import dbConfig from '../dbconfig.js';

const router = express.Router();

router.get('/', function (req, res) {
  if (!req.session.authenticatedUser) {
    res.end();
    return;
  }

  getCustomer(req.session.authenticatedUser)
    .then((customer) => {
      // undefined if no customer found
      res.send(customer);
    })
    .catch(() => {
      res.end();
    });
});

function getCustomer(customerId) {
  return new Promise((resolve, reject) => {
    sql.connect(dbConfig).then((conn) => {
      conn
        .request()
        .input('customerId', sql.Int, customerId)
        .query(
          `SELECT 
            customerId AS id,
            firstName,
            lastName,
            email,
            phonenum AS phone,
            address,
            city,
            state,
            postalCode,
            country,
            userid AS username,
            isAdmin
          FROM customer
          WHERE customerId = @customerId`
        )
        .then((result) => {
          if (result.recordset.length > 0) {
            resolve(result.recordset[0]);
          } else {
            resolve(undefined);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  });
}

export default router;
