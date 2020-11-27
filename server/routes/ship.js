import express from 'express';
import sql from 'mssql';
import dbConfig from '../dbconfig.js';

const router = express.Router();

router.get('/', function (req, res) {
  console.log(req);
  res.end('order id passed to server is ' + req.query.orderId);
  res.end();
});

export default router;
