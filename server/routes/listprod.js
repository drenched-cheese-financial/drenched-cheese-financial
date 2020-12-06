import express from 'express';
import sql from 'mssql';
import dbConfig from '../dbconfig.js';

const router = express.Router();

router.get('/', (req, res) => {
  const filter = '%' + req.query.filter + '%';
  const category = req.query.category;
  getFilteredProducts(filter, category)
    .then((products) => {
      res.send(products);
    })
    .catch((err) => {
      console.dir(err);
      res.end();
    });
});

const getFilteredProducts = async (filter, category) => {
  try {
    let conn = await sql.connect(dbConfig);
    let productsData;
    if (category > 0) {
      productsData = await conn
        .request()
        .input('filter', sql.VarChar, filter)
        .input('category', sql.Int, category)
        .query(
          `SELECT
            productID AS id,
            productName AS name,
            productPrice AS price,
            productImageURL AS imageURL
          FROM product JOIN category ON product.categoryId = category.categoryId
          WHERE productName LIKE @filter AND category.categoryId = @category`
        );
    } else {
      productsData = await conn.request().input('filter', sql.VarChar, filter).query(
        `SELECT
          productID AS id,
          productName AS name,
          productPrice AS price,
          productImageURL AS imageURL,
          productImage AS image
        FROM product
        WHERE productName LIKE @filter`
      );
    }

    return productsData.recordset;
  } catch (err) {
    throw err;
  }
};

export default router;
