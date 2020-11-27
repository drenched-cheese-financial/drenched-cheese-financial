import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import sql from 'mssql';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const session = require('express-session');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Setting up the session.
// This uses MemoryStorage which is not
// recommended for production use.
app.use(
	session({
		secret: 'COSC 304 Rules!',
		resave: false,
		saveUninitialized: false,
		cookie: {
			httpOnly: false,
			secure: false,
			maxAge: 60000,
		},
	})
);

const dbConfig = {
	user: 'jabadir',
	password: '35589738',
	server: 'sql04.ok.ubc.ca',
	database: 'db_jabadir',
	options: {
		enableArithAbort: true,
		encrypt: false,
	},
};

app.listen(3001, () => {
	console.log('Server started on port 3001');
});

app.get('/listorder', (req, res) => {
	/** Create connection, and validate that it connected successfully **/
	const getData = async () => {
		try {
			//get db connection
			let pool = await sql.connect(dbConfig);

			let orderResults = await pool
				.request()
				.query(
					'SELECT orderId, orderDate, ordersummary.customerId, customer.firstName,customer.lastName, totalAmount ' +
						'from ordersummary left join customer on ordersummary.customerId = customer.customerId order by orderId'
				);

			res.write(JSON.stringify(orderResults));
			res.end();
		} catch {
			(error) => {
				console.log(error);
				res.write(error);
				console.dir(err);

				res.end();
			};
		}
	};

	getData();
});

app.get('/listprod', (req, res) => {
	/** Create connection, and validate that it connected successfully **/
	const keyword = '%' + req.query.keyword + '%';

	const getData = async () => {
		try {
			//get db connection
			let pool = await sql.connect(dbConfig);

			let productResults = await pool
				.request()
				.input('pname', sql.VarChar, keyword)
				.query(
					`SELECT productID, productName, productPrice FROM product WHERE productName LIKE @pname`
				);
			// console.log(JSON.stringify(productResults));

			res.write(JSON.stringify(productResults));
			res.end();
		} catch {
			(error) => {
				console.log(error);
				res.write(error);
				console.dir(err);

				res.end();
			};
		}
	};

	getData();
});

app.get('/loaddata', (req, res) => {
	(async function () {
		try {
			let pool = await sql.connect(dbConfig);

			let data = fs.readFileSync('./data/data.ddl', { encoding: 'utf8' });
			let commands = data.split(';');
			for (let i = 0; i < commands.length; i++) {
				let command = commands[i];
				let result = await pool.request().query(command);
				res.write(JSON.stringify(result));
			}

			res.end();
		} catch (err) {
			console.dir(err);
			res.send(err);
		}
	})();
});

app.get('/addcart', function (req, res, next) {
	// res.setHeader('Content-Type', 'text/html');
	// If the product list isn't set in the session,
	// create a new list.
	let productList = false;
	if (!req.session.productList) {
		productList = [];
	} else {
		productList = req.session.productList;
	}

	// Add new product selected
	// Get product information
	let id = false;
	let name = false;
	let price = false;
	if (req.query.id && req.query.name && req.query.price) {
		id = req.query.id;
		name = req.query.name;
		price = req.query.price;
	} else {
		res.redirect('http://localhost:3000/listprod');
		return;
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
	res.redirect('http://localhost:3000/showcart');
});

app.get('/showcart', function (req, res, next) {
	let productList = req.session.productList;
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
		res.write(`<div id="container">`);
		res.write(`<h1>Your Shopping Cart</h1>`);
		res.write(`<table>`);
		res.write(`
			<tr>
				<th id="clearBorder"></th>
				<th>Product Id</th>
				<th>Product Name</th>
				<th>Quantity</th>
				<th>Price</th>
				<th>Subtotal</th>
			</tr>
		`);

		// Add all products to the table
		let total = 0;
		for (let i = 0; i < productList.length; i++) {
			product = productList[i];
			if (!product) {
				continue;
			}

			res.write(`
				<tr>
					<td id="clearBorder">
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
		res.write(`
			<tr>
				<td id="clearBorder"></td>
				<td colspan="4" align="right"><b>Order Total</b></td>
				<td align="right">$${total.toFixed(2)}</td>
			</tr>
		`);
		res.write(`</table>`);
		res.write(`<h2><a href="checkout">Check Out</a></h2>`);
	} else {
		res.write(`<h1>Your shopping cart is empty!</h1>`);
	}

	res.write(`<h2><a href="listprod">Continue Shopping</a></h2>`);
	res.write(`</div>`);
	res.end();
});
