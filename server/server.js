import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql';

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.listen(3001, () => {
  console.log('Server started on port 3001');
});

app.get('/listorder', (req, res) => {
  var connection = mysql.createConnection({
    host: 'cosc304.ok.ubc.ca',
    user: 'jabadir',
    password: '35589738',
    database: 'db_jabadir',
  });

  connection.connect();

  connection.query(
    'SELECT orderId,orderDate, ordersummary.customerId, customer.firstName,customer.lastName, totalAmount from ordersummary left join customer on ordersummary.customerId = customer.customerId order by orderId',
    (error, results, fields) => {
      if (error) throw error;
      console.log('The solution is: ', results);
      res.send(results);
    }
  );

  connection.end();
});
