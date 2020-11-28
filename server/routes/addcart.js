import express from 'express';

const router = express.Router();

router.post('/', function (req, res) {
	let product = {
		id: req.body.id,
		name: req.body.name,
		price: req.body.price,
		quantity: 1,
	};

	if (!req.session.productList) {
		req.session.productList = [product];
	} else {
		let idx = req.session.productList.findIndex((p) => p.id === product.id);
		if (idx >= 0) {
			req.session.productList[idx].quantity++;
		} else {
			req.session.productList.push(product);
		}
	}
	res.end();
});

export default router;
