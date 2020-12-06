import express from 'express';
import sql from 'mssql';
import dbConfig from '../dbconfig.js';

const router = express.Router();

router.post('/', function (req, res) {
  if (!req.body || !req.body.customer) {
    res.end();
    return;
  }

  let customer = req.body.customer;

  insertCustomer(customer).then(() => {
    res.end();
  });
});

function insertCustomer(customer) {
  return new Promise((resolve) => {
    sql.connect(dbConfig).then((conn) => {
      conn
        .request()
        .input('firstName', sql.VarChar, customer.firstName)
        .input('lastName', sql.VarChar, customer.lastName)
        .input('email', sql.VarChar, customer.email)
        .input('phone', sql.VarChar, customer.phone)
        .input('address', sql.VarChar, customer.address)
        .input('city', sql.VarChar, customer.city)
        .input('state', sql.VarChar, customer.state)
        .input('country', sql.VarChar, customer.country)
        .input('postalCode', sql.VarChar, customer.postalCode)
        .input('username', sql.VarChar, customer.username)
        .input('password', sql.VarChar, customer.password)
        .query(
          `INSERT INTO customer (firstName, lastName, email, phonenum, address, city, state, country, postalCode, userid, password)
          VALUES (@firstName, @lastName, @email, @phone, @address, @city, @state, @country, @postalCode, @username, @password)`
        )
        .then(() => {
          resolve();
        });
    });
  });
}

export default router;
