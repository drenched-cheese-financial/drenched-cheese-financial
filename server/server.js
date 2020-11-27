import cors from 'cors';
import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import order from './routes/order.js';
import loaddata from './routes/loaddata.js';
import listorder from './routes/listorder.js';
import customer from './routes/customer.js';
import login from './routes/login.js';
import logout from './routes/logout.js';
import shop from './routes/shop.js';
import ship from './routes/ship.js';

// Setup express
const app = express();
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use(bodyParser.json());

// Setup session variable
app.use(
  session({
    secret: 'COSC 304 Rules!',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: false,
      secure: false,
      maxAge: 600000,
    },
  })
);

// Setup routes
app.use('/order', order);
app.use('/loaddata', loaddata);
app.use('/listorder', listorder);
app.use('/customer', customer);
app.use('/login', login);
app.use('/logout', logout);
app.use('/shop', shop);
app.use('/ship', ship);

// Setup server on port
app.listen(3001, () => {
  console.log('Server started on port 3001');
});
