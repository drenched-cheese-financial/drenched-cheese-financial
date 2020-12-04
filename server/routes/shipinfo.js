import express from 'express';
import sql from 'mssql';
import dbConfig from '../dbconfig.js';

const router = express.Router();

router.post('/', function (req, res) {
  insertShipInfo(req.body.shipData)
    .then(() => {
      res.send(true);
    })
    .catch((err) => {
      console.dir(err);
      res.send(false);
      res.end();
    });
});
const insertShipInfo = async (shipData) => {
  try {
    let conn = await sql.connect(dbConfig);
    const queryString = `UPDATE customer set address=@address,city=@city,
     state=@state,postalCode=@postalCode,country=@country where customerId=@custId`;
    await conn
      .request()
      .input('address', sql.VarChar, shipData.address)
      .input('city', sql.VarChar, shipData.city)
      .input('state', sql.VarChar, shipData.state)
      .input('custId', sql.VarChar, shipData.customerId)
      .input('postalCode', sql.VarChar, shipData.postalCode)
      .input('country', sql.VarChar, shipData.country)
      .query(queryString);
    return true;
  } catch (err) {
    throw err;
  }
};

export default router;
