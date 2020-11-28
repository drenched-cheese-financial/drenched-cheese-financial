import express from 'express';
import sql from 'mssql';
import dbConfig from '../dbconfig.js';

const router = express.Router();

router.get('/listprod', (req, res) => {
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

export default router;
