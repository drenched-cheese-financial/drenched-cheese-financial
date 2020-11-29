import express from 'express';
const router = express.Router();

router.post('/', function (req, res) {
	req.session.productList = req.body.productList;
	res.end();
});

export default router;
