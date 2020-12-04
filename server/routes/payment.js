import express from 'express';
import sql from 'mssql';
import dbConfig from '../dbconfig.js';

const router = express.Router();

router.post('/', function (req, res) {
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
    var d = new Date();
    var thisYear = d.getFullYear();
    if (creditData.expiry.year < 100) {
      creditData.expiry.year =
        thisYear.toString().substring(0, 2) + creditData.expiry.year;
    } else if (creditData.expiry.year < 20) {
      console.log(
        'this is past the year 2100, update the credit validator because inaccuracies may exist'
      );
      throw 'this is past the year 2100, update the credit validator because inaccuracies may exist';
    }
    let conn = await sql.connect(dbConfig);
    const queryString = `INSERT into paymentmethod (paymentType,paymentNumber,paymentExpiryDate,customerId)
            VALUES (@cType,@cNum,EOMONTH(@expDate),@custId)`;
    await conn
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
    return true;
  } catch (err) {
    throw err;
  }
};

export default router;
