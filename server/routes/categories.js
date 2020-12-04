import express from 'express';
import sql from 'mssql';
import dbConfig from '../dbconfig.js';

const router = express.Router();

router.get('/', (req, res) => {
  getCategories()
    .then((categories) => {
      res.send(categories);
    })
    .catch((err) => {
      console.dir(err);
      res.end();
    });
});

const getCategories = async () => {
  try {
    let conn = await sql.connect(dbConfig);
    let result = await conn.request().query(`SELECT categoryId AS id, categoryName AS name FROM category`);
    return result.recordset;
  } catch (err) {
    throw err;
  }
};

export default router;
