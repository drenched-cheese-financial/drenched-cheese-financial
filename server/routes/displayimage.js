import express from 'express';
import sql from 'mssql';
import dbConfig from '../dbconfig.js';

const router = express.Router();

router.get('/', function (req, res, next) {
	let id = req.query.id;
	let idVal = parseInt(id);
	if (isNaN(idVal)) {
		res.end();
		return;
	}

	(async function () {
		try {
			let pool = await sql.connect(dbConfig);

			('// TODO: Modify SQL to retrieve productImage given productId');

			let result = await pool
				.request()
				.input('pid', sql.Int, idVal)
				.query('  SELECT productImage FROM product WHERE productId=@pid ');

			if (result.recordset.length === 0) {
				console.log('No image record');
				res.end();
				return;
			} else {
				let productImage = result.recordset[0].productImage;

				res.send(productImage);
			}

			res.end();
		} catch (err) {
			console.dir(err);
			res.write(err + '');
			res.end();
		}
	})();
});

export default router;
