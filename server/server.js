import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql';
import fs from 'fs';

const app = express();
app.use(cors());
app.use(bodyParser.json());
const connection = mysql.createConnection({
  host: 'cosc304.ok.ubc.ca',
  user: 'jabadir',
  password: '35589738',
  database: 'db_jabadir',
});

app.listen(3001, () => {
  console.log('Server started on port 3001');
});

app.get('/listorder', (req, res) => {
  connection.connect();

  connection.query(
    'SELECT orderId,orderDate, ordersummary.customerId, customer.firstName,customer.lastName, totalAmount from ordersummary left join customer on ordersummary.customerId = customer.customerId order by orderId',
    (error, results) => {
      res.send(results);
    }
  );

  connection.end();
});

// TODO: implement a way for user to know when the data has finished loading
app.get('/loaddata', (req, res) => {
  connection.connect();

  let data = fs.readFileSync('./data/data.ddl', { encoding: 'utf8' });
  let commands = data.split(';');
  for (let i = 0; i < commands.length; i++) {
    console.log('Running query ' + commands[i]);
    connection.query(commands[i]);
  }

  // connection.end();
});
