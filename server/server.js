import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import sql from 'mssql';

const app = express();
app.use(cors());
app.use(bodyParser.json());

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
      console.log('hey');
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
