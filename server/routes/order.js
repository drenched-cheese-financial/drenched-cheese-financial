import express from 'express';
import sql from 'mssql';
import dbConfig from '../dbconfig.js';

const router = express.Router();

router.get('/', (req, res) => {
  try {
    let customerId = req.query.customerId;
    let productList = req.session.productList;

    order(customerId, productList).then((summary) => {
      req.session.productList = [];
      res.send(summary);
    });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

async function order(customerId, productList) {
  try {
    let order = {};

    if (!productList || productList.length === 0) {
      order.err = 'The shopping cart is empty.';
      return order;
    }

    let conn = await sql.connect(dbConfig);

    let isValid = await validateCustomer(conn, customerId);
    if (!isValid) {
      order.err = 'The customer ID passed in is invalid.';
      return order;
    }

    order.id = await saveOrder(conn, customerId, productList);

    order.customer = await getCustomer(conn, customerId);
    order.products = await getProducts(conn, order.id);

    let shipmentId = await saveShipment(conn, order.id);
    order.shipment = await getShipment(conn, shipmentId);
    order.shipment.update = await updateInventory(conn, order.products);

    return order;
  } catch (err) {
    console.log(err);
    return err;
  }
}

function validateCustomer(conn, customerId) {
  return new Promise((resolve) => {
    conn
      .request()
      .input('customerId', sql.Int, customerId)
      .query('SELECT * FROM customer WHERE customerId = @customerId')
      .then((result) => {
        resolve(Object.keys(result.recordset).length > 0);
      })
      .catch(() => {
        resolve(false);
      });
  });
}

function saveOrder(conn, customerId, productList) {
  return new Promise((resolve, reject) => {
    conn
      .request()
      .input('customerId', sql.Int, customerId)
      .input('orderDate', sql.DateTime, new Date().toISOString())
      .input('totalAmount', sql.Int, calculateTotal(productList))
      .query(
        'INSERT INTO ordersummary (customerId, orderDate, totalAmount) \
        OUTPUT INSERTED.orderId \
        VALUES (@customerId, @orderDate, @totalAmount)'
      )
      .then((result) => {
        let orderId = result.recordset[0].orderId;
        saveProducts(conn, orderId, productList).then(() => {
          resolve(orderId);
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function saveProducts(conn, orderId, productList) {
  return new Promise((resolve, reject) => {
    let completedCount = 0;
    for (var product of productList) {
      if (product) {
        conn
          .request()
          .input('orderId', sql.Int, orderId)
          .input('productId', sql.Int, product.id)
          .input('quantity', sql.Int, product.quantity)
          .input('price', sql.Decimal, product.price)
          .query(
            'INSERT INTO orderproduct (orderId, productId, quantity, price) \
            VALUES (@orderId, @productId, @quantity, @price)'
          )
          .then(() => {
            completedCount++;
            if (completedCount == productList.length) {
              resolve();
            }
          })
          .catch((err) => {
            reject(err);
          });
      }
    }
  });
}

function getProducts(conn, orderId) {
  return new Promise((resolve, reject) => {
    conn
      .request()
      .input('orderId', sql.Int, orderId)
      .query(
        'SELECT p.productId AS id, p.productName AS name, quantity, price, quantity * price AS subtotal \
        FROM orderproduct o \
        JOIN product p ON o.productId = p.productId \
        WHERE orderId = @orderId'
      )
      .then((result) => {
        resolve(result.recordset);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function getCustomer(conn, customerId) {
  return new Promise((resolve, reject) => {
    conn
      .request()
      .input('customerId', sql.Int, customerId)
      .query('SELECT customerId AS id, firstName, lastName FROM customer WHERE customerId = @customerId')
      .then((result) => {
        resolve(result.recordset[0]);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function calculateTotal(productList) {
  let total = 0;
  for (var product of productList) {
    if (product) {
      total += product.price * product.quantity;
    }
  }
  return total;
}

function saveShipment(conn, orderId) {
  return new Promise((resolve, reject) => {
    conn
      .request()
      .input('shipDate', sql.DateTime, new Date().toISOString())
      .input('shipDesc', sql.VarChar, `Shipment for order ${orderId}`)
      .query(
        'INSERT INTO shipment (shipmentDate, shipmentDesc, warehouseId) \
        OUTPUT INSERTED.shipmentId \
        VALUES (@shipDate, @shipDesc, 1)'
      )
      .then((result) => {
        resolve(result.recordset[0].shipmentId);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function getShipment(conn, shipmentId) {
  return new Promise((resolve, reject) => {
    conn
      .request()
      .input('shipmentId', sql.Int, shipmentId)
      .query(
        `SELECT
          shipmentId AS id,
          shipmentDate AS shipDate,
          shipmentDesc AS shipDesc,
          warehouseName AS warehouse
        FROM shipment s
        JOIN warehouse w ON s.warehouseId = w.warehouseId
        WHERE shipmentId = @shipmentId`
      )
      .then((result) => {
        resolve(result.recordset[0]);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

async function updateInventory(conn, products) {
  return new Promise((resolve) => {
    let update = [];
    let transaction = new sql.Transaction(conn);
    transaction.begin(sql.REPEATABLE_READ, async () => {
      for (var product of products) {
        let result = await transaction
          .request()
          .input('productId', sql.Int, product.id)
          .query(`SELECT quantity FROM productinventory WHERE productId = @productId AND warehouseId = 1`);
        let prevInventory = 0;
        if (result.recordset.length > 0) {
          prevInventory = result.recordset[0].quantity;
        }
        let newInventory = prevInventory - product.quantity;

        if (newInventory < 0) {
          transaction.rollback();
          update.push({
            success: false,
            productId: product.id,
            productName: product.name,
            quantity: product.quantity,
            prevInventory: prevInventory,
            newInventory: newInventory,
          });
          resolve(update);
          return;
        }

        await transaction
          .request()
          .input('productId', sql.Int, product.id)
          .input('quantity', sql.Int, newInventory)
          .query(`UPDATE productinventory SET quantity = @quantity WHERE productId = @productId AND warehouseId = 1`);
        update.push({
          success: true,
          productId: product.id,
          productName: product.name,
          quantity: product.quantity,
          prevInventory: prevInventory,
          newInventory: newInventory,
        });
      }

      transaction.commit();
      resolve(update);
    });
  });
}

export default router;
