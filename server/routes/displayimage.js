import express from 'express';
import sql from 'mssql';
import dbConfig from '../dbconfig.js';

const router = express.Router();

router.get('/', function (req, res) {
  (async function () {
    try {
      let pool = await sql.connect(dbConfig);

      let result = await pool
        .request()
        .input('pid', sql.Int, req.query.id)
        .query('SELECT productImage FROM product WHERE productId=@pid');

      res.send(result.recordset[0].productImage);
    } catch (err) {
      console.dir(err);
      res.end();
    }
  })();
});

export default router;
