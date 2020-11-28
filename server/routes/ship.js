import express from 'express';
import sql from 'mssql';
import dbConfig from '../dbconfig.js';

const router = express.Router();

router.get('/', async function (req, res) {
  const orderContent = await getOrderContent(req.query.orderId);
  if (orderContent.length === 0) {
    res.send({ type: 'invalid_order' });
    res.end();
  } else {
    const missingProduct = await missingInventoryProduct(orderContent);
    if (missingProduct) {
      res.send({ type: 'missing_inventory', data: missingProduct });
      res.end();
    } else {
      res.send({ type: 'succcess', data: 'all good!' });
      res.end();
    }
  }
});

// Return the ids and quantities of the products in the specified order
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

// Returns the ID of the first product it finds whose warehouse 1 inventory
// is less than the needed quantity, or null if the inventory is sufficient for
// all products
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
            if (++processedProducts == orderedProducts.length) {
              resolve(null);
            }
          })
          .catch((err) => {
            reject(err);
          });
      });
    });
  });
}

export default router;
