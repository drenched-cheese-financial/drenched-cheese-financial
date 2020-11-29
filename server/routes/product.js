import express from 'express';
import sql from 'mssql';
import dbConfig from '../dbconfig.js';

const router = express.Router();

router.get('/', function (req, res) {
  (async function () {
    try {
      let conn = await sql.connect(dbConfig);

      let productResults = await conn.request().input('pid', sql.Int, req.query.id).query(
        `SELECT
						productId AS id,
						productName AS name,
						productPrice AS price,
						productImageURL AS imageURL,
						productImage AS image
					FROM product
					WHERE productId=@pid`
      );

      res.send(productResults.recordset[0]);
    } catch (err) {
      console.dir(err);
      res.end();
    }
  })();
});

export default router;
