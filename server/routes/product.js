import express from 'express';
const router = express.Router();
import sql from 'mssql';
import dbConfig from '../dbconfig.js';

router.get('/', function (req, res, next) {
	res.setHeader('Content-Type', 'text/html');
	(async function () {
		try {
			let pool = await sql.connect(dbConfig);
			let productData;
			// Get product name to search for
			// TODO: Retrieve and display info for the product

			let productResults = await pool
				.request()
				.input('pid', sql.Int, req.query.id)
				.query(
					'SELECT productId, productName, productPrice, productImageURL, productImage FROM product WHERE productId=@pid'
				);

			productData = productResults.recordset[0];

			// TODO: If there is a productImageURL, display using IMG tag
			if (productData.productImageURL) console.log(productData);

			// TODO: Retrieve any image stored directly in database. Note: Call displayImage.jsp with product id as parameter.

			// TODO: Add links to Add to Cart and Continue Shopping
			res.send(productData);
			res.end();
		} catch (err) {
			console.dir(err);
			res.write(err + '');
			res.end();
		}
	})();
});

export default router;
