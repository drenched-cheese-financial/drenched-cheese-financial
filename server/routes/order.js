import express from 'express';
import sql from 'mssql';
import dbConfig from '../dbconfig.js';

const router = express.Router();

router.get('/', (req, res) => {
	try {
		let customerId = req.query.customerId;
		let productList = null;
		console.log(req.session.productList);
		if (req.session.productList && req.session.productList.length > 0) {
			productList = req.session.productList;
		}

		order(customerId, productList).then((summary) => {
			res.send(summary);
		});
	} catch (err) {
		console.log(err);
		res.send(err);
	}
});

async function order(customerId, productList) {
	try {
		let order = {};

		if (!productList) {
			order.err = 'The shopping cart is empty.';
			return order;
		}

		let conn = await sql.connect(dbConfig);

		let isValid = await validateCustomer(conn, customerId);
		if (!isValid) {
			order.err = 'The customer ID passed in is invalid.';
			return order;
		}

		order.id = await saveOrder(conn, customerId, productList);

		order.customer = await getCustomer(conn, customerId);
		order.products = await getProducts(conn, order.id);

		return order;
	} catch (err) {
		console.log(err);
		return err;
	}
}

function validateCustomer(conn, customerId) {
	return new Promise((resolve) => {
		conn
			.request()
			.input('customerId', sql.Int, customerId)
			.query('SELECT * FROM customer WHERE customerId = @customerId')
			.then((result) => {
				resolve(Object.keys(result.recordset).length > 0);
			})
			.catch(() => {
				resolve(false);
			});
	});
}

function saveOrder(conn, customerId, productList) {
	return new Promise((resolve, reject) => {
		conn
			.request()
			.input('customerId', sql.Int, customerId)
			.input('orderDate', sql.DateTime, new Date().toISOString())
			.input('totalAmount', sql.Int, calculateTotal(productList))
			.query(
				'INSERT INTO ordersummary (customerId, orderDate, totalAmount) \
        OUTPUT INSERTED.orderId \
        VALUES (@customerId, @orderDate, @totalAmount)'
			)
			.then((result) => {
				let orderId = result.recordset[0].orderId;
				saveProducts(conn, orderId, productList).then(() => {
					resolve(orderId);
				});
			})
			.catch((err) => {
				reject(err);
			});
	});
}

function saveProducts(conn, orderId, productList) {
	return new Promise((resolve, reject) => {
		let completedCount = 0;
		let totalCount = productList.filter((x) => x != null).length;
		for (var product of productList) {
			if (product) {
				conn
					.request()
					.input('orderId', sql.Int, orderId)
					.input('productId', sql.Int, product.id)
					.input('quantity', sql.Int, product.quantity)
					.input('price', sql.Decimal, product.price)
					.query(
						'INSERT INTO orderproduct (orderId, productId, quantity, price) \
            VALUES (@orderId, @productId, @quantity, @price)'
					)
					.then(() => {
						completedCount++;
						if (completedCount == totalCount) {
							resolve();
						}
					})
					.catch((err) => {
						reject(err);
					});
			}
		}
	});
}

function getProducts(conn, orderId) {
	return new Promise((resolve, reject) => {
		conn
			.request()
			.input('orderId', sql.Int, orderId)
			.query(
				'SELECT p.productId AS id, p.productName AS name, quantity, price, quantity * price AS subtotal \
        FROM orderproduct o \
        JOIN product p ON o.productId = p.productId \
        WHERE orderId = @orderId'
			)
			.then((result) => {
				resolve(result.recordset);
			})
			.catch((err) => {
				reject(err);
			});
	});
}

function getCustomer(conn, customerId) {
	return new Promise((resolve, reject) => {
		conn
			.request()
			.input('customerId', sql.Int, customerId)
			.query(
				'SELECT customerId AS id, firstName, lastName FROM customer WHERE customerId = @customerId'
			)
			.then((result) => {
				resolve(result.recordset[0]);
			})
			.catch((err) => {
				reject(err);
			});
	});
}

function calculateTotal(productList) {
	let total = 0;
	for (var product of productList) {
		if (product) {
			total += product.price * product.quantity;
		}
	}
	return total;
}

export default router;
