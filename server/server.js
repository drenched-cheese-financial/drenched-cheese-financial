import cors from 'cors';
import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import order from './routes/order.js';
import loaddata from './routes/loaddata.js';
import listprod from './routes/listprod.js';
import categories from './routes/categories.js';
import listorder from './routes/listorder.js';
import customer from './routes/customer.js';
import validate from './routes/validate.js';
import logout from './routes/logout.js';
import sales from './routes/sales.js';
import customers from './routes/customers.js';
import addcart from './routes/addcart.js';
import showcart from './routes/showcart.js';
import updatecart from './routes/updatecart.js';
import product from './routes/product.js';
import register from './routes/register.js';
import editprofile from './routes/editprofile.js';
import displayimage from './routes/displayimage.js';
import payment from './routes/payment.js';
import shipinfo from './routes/shipinfo.js';

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
app.use('/listprod', listprod);
app.use('/categories', categories);
app.use('/listorder', listorder);
app.use('/customer', customer);
app.use('/validate', validate);
app.use('/logout', logout);
app.use('/sales', sales);
app.use('/customers', customers);
app.use('/addcart', addcart);
app.use('/showcart', showcart);
app.use('/updatecart', updatecart);
app.use('/product', product);
app.use('/register', register);
app.use('/editprofile', editprofile);
app.use('/displayimage', displayimage);
app.use('/payment', payment);
app.use('/shipinfo', shipinfo);

// Setup server on port
app.listen(3001, () => {
  console.log('Server started on port 3001');
});
