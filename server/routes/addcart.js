import express from 'express';

const router = express.Router();

router.post('/', function (req, res) {
	// res.setHeader('Content-Type', 'text/html');
	// If the product list isn't set in the session,
	// create a new list.
	let productList = [];
	if (req.session.productList) {
		console.log(req.session.productList);
		productList = req.session.productList;
	}

	// Add new product selected
	// Get product information
	let id = false;
	let name = false;
	let price = false;
	if (req.body.id && req.body.name && req.body.price) {
		id = req.body.id;
		name = req.body.name;
		price = req.body.price;
	} else {
		// res.redirect('http://localhost:3000/listprod');
		res.end();
	}

	// Update quantity if add same item to order again
	if (productList[id]) {
		productList[id].quantity = productList[id].quantity + 1;
	} else {
		productList[id] = {
			id: id,
			name: name,
			price: price,
			quantity: 1,
		};
	}

	req.session.productList = productList;

	// console.log(req.session.productList);
	// res.redirect('http://localhost:3000/showcart');
	res.end();});

export default router;
