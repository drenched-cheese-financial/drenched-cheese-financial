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
    const missingProduct = await missingInventoryProduct(orderContent);
    console.log(missingProduct);
  }
});

function getOrderContent(orderId) {
  return new Promise((resolve, reject) => {
    sql.connect(dbConfig).then((conn) => {
      conn
        .request()
        .input('orderId', sql.Int, orderId)
        .query(
          'SELECT productId, quantity FROM orderproduct WHERE orderId = @orderId'
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

function missingInventoryProduct(orderedProducts) {
  var processedProducts = 0;
  return new Promise((resolve, reject) => {
    sql.connect(dbConfig).then((conn) => {
      orderedProducts.forEach((product) => {
        conn
          .request()
          .input('productId', sql.Int, product.productId)
          .query(
            'SELECT quantity FROM productinventory WHERE productId = @productId AND warehouseId = 1'
          )
          .then((result) => {
            if (result.recordset[0].quantity < product.quantity) {
              resolve(product.productId);
            }
          })
          .catch((err) => {
            reject(err);
          });
        if (++processedProducts == orderedProducts.length) {
          resolve(null);
        }
      });
    });
  });
}

export default router;
