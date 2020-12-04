import express from 'express';
import sql from 'mssql';
import dbConfig from '../dbconfig.js';

const router = express.Router();

router.post('/', function (req, res) {
  if (!req.body || !req.body.username || !req.body.password) {
    res.send({ authId: -1 });
    return;
  }

  let username = req.body.username;
  let password = req.body.password;

  validateCredentials(username, password).then((isValid) => {
    if (isValid) {
      getIdFromCredentials(username, password).then((id) => {
        req.session.authenticatedUser = id;
        if (id > 0) {
          isCustomerAdmin(id).then((isAdmin) => {
            res.send({ authId: id, isAdmin: isAdmin });
          });
        } else {
          res.send({ authId: id });
        }
      });
    } else {
      res.send({ authId: -1 });
    }
  });
});

function validateCredentials(username, password) {
  return new Promise((resolve) => {
    sql.connect(dbConfig).then((conn) => {
      conn
        .request()
        .input('username', sql.VarChar, username)
        .input('password', sql.VarChar, password)
        .query('SELECT * FROM customer WHERE userId = @username AND password = @password')
        .then((result) => {
          resolve(Object.keys(result.recordset).length > 0);
        })
        .catch(() => {
          resolve(false);
        });
    });
  });
}

function getIdFromCredentials(username, password) {
  return new Promise((resolve) => {
    sql.connect(dbConfig).then((conn) => {
      conn
        .request()
        .input('username', sql.VarChar, username)
        .input('password', sql.VarChar, password)
        .query('SELECT customerId AS id FROM customer WHERE userId = @username AND password = @password')
        .then((result) => {
          resolve(result.recordset[0].id);
        })
        .catch(() => {
          resolve(undefined);
        });
    });
  });
}

function isCustomerAdmin(id) {
  return new Promise((resolve) => {
    sql.connect(dbConfig).then((conn) => {
      conn
        .request()
        .input('id', sql.Int, id)
        .query('SELECT isAdmin FROM customer WHERE customerId = @id')
        .then((result) => {
          resolve(result.recordset[0].isAdmin);
        })
        .catch(() => {
          resolve(undefined);
        });
    });
  });
}

export default router;
