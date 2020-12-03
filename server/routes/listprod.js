import express from 'express';
import sql from 'mssql';
import dbConfig from '../dbconfig.js';

const router = express.Router();

router.get('/', (req, res) => {
  const filter = '%' + req.query.filter + '%';
  getFilteredProducts(filter)
    .then((products) => {
      res.send(products);
    })
    .catch((err) => {
      console.dir(err);
      res.end();
    });
});

const getFilteredProducts = async (filter) => {
  try {
    let conn = await sql.connect(dbConfig);
    let productsData = await conn.request().input('filter', sql.VarChar, filter).query(
      `SELECT
          productID AS id,
          productName AS name,
          productPrice AS price
        FROM product JOIN category ON product.categoryId = category.categoryId
        WHERE productName LIKE @filter OR categoryName LIKE @filter`
    );

    return productsData.recordset;
  } catch (err) {
    throw err;
  }
};

export default router;
