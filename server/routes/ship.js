import express from 'express';
import sql from 'mssql';
import dbConfig from '../dbconfig.js';

const router = express.Router();

router.get('/', async function (req, res) {
  const orderContent = await getOrderContent(req.query.orderId);
  if (orderContent.length === 0) {
    res.send('order empty');
    res.end();
  } else {
    // TODO
  }
});

function getOrderContent(orderId) {
  return new Promise((resolve, reject) => {
    sql.connect(dbConfig).then((conn) => {
      conn
        .request()
        .input('orderId', sql.Int, orderId)
        .query(
          'SELECT productId FROM orderproduct op WHERE op.orderId = @orderId'
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
