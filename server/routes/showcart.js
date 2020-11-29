import express from 'express';
const router = express.Router();

router.get('/', function (req, res) {
  let productList = req.session.productList;
  res.send(productList)

});

export default router;
