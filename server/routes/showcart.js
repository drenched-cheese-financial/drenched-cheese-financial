import express from 'express';
const router = express.Router();

router.get('/', function (req, res, next) {
	let productList = req.session.productList;
	console.log('from showcart '  + productList);
	let isCartEmpty = true;
	if (productList) {
		// Update based on action param
		let row = req.query.row;
		switch (req.query.action) {
			case 'increment':
				productList[row].quantity++;
				break;
			case 'decrement':
				if (productList[row].quantity > 1) productList[row].quantity--;
				break;
			case 'delete':
				productList.splice(row, 1);
				break;
		}

		isCartEmpty = productList.filter((x) => x != null).length == 0;
	}

	if (!isCartEmpty) {
		// Create the table headers

		// Add all products to the table
		let total = 0;
		for (let i = 0; i < productList.length; i++) {
			product = productList[i];
			if (!product) {
				continue;
			}

			res.write(`
				
						<button type="button" id="plusMinus" onclick="window.location='showcart?row=${i}&action=increment'">+</button><br>
						<button type="button" id="plusMinus" onclick="window.location='showcart?row=${i}&action=decrement'">-</button>
					</td>
					<td>${product.id}</td>
					<td>${product.name}</td>
					<td align="center">${product.quantity}</td>
					<td align="right">$${Number(product.price).toFixed(2)}</td>
					<td align="right">$${Number(product.quantity * product.price).toFixed(2)}</td>
					<td id="clearBorder"><button type="button" onclick="window.location='showcart?row=${i}&action=delete'">Delete</button></td>
				</tr>
			`);

			total = total + product.quantity * product.price;
		}

		// Add table footer
		res.send(total.toFixed(2));

		//link to checkout here
	} else {
		res.send('shopping cart empty');
	}

	res.end();
});

export default router;
