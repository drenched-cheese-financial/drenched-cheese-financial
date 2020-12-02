import express from 'express';
import sql from 'mssql';
import dbConfig from '../dbconfig.js';

const router = express.Router();

router.post('/', function (req, res) {
  console.log(req.body.creditData);
  insertPaymentDeets(req.body.creditData)
    .then(() => {
      res.send(true);
    })
    .catch((err) => {
      console.dir(err);
      res.send(false);
      res.end();
    });
});
const insertPaymentDeets = async (creditData) => {
  try {
    let conn = await sql.connect(dbConfig);
    const queryString = `INSERT into paymentmethod (paymentType,paymentNumber,paymentExpiryDate,customerId)
            VALUES (@cType,@cNum,EOMONTH(@expDate),@custId)`;
    let productsData = await conn
      .request()
      .input('cNum', sql.VarChar, creditData.creditNumber)
      .input('custId', sql.VarChar, creditData.customerId)
      .input('cType', sql.VarChar, creditData.creditType)
      .input(
        'expDate',
        sql.Date,
        creditData.expiry.year + '-' + creditData.expiry.month + '-01'
      )
      .query(queryString);
    return productsData.recordset;
  } catch (err) {
    throw err;
  }
};

export default router;
