import React, { useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import Shop from '../../views/shop/Shop';
import ListProduct from '../../views/list-product/ListProduct';
import LoadData from '../../views/load-data/LoadData';
import ShowCart from '../../views/showcart/ShowCart';
import Checkout from '../../views/checkout/Checkout';
import Order from '../../views/order/Order';
import Login from '../../views/login/Login';
import Logout from '../../views/logout/Logout';
import Register from '../../views/register/Register';
import Profile from '../../views/profile/Profile';
import EditProfile from '../../views/edit-profile/EditProfile';
import Orders from '../../views/orders/Orders';
import Admin from '../../views/admin/Admin';
import Enter from '../../views/enter/Enter';
import SingleProduct from '../../views/single-product/SingleProduct';
import Video from '../../assets/videos/raining-money.mp4';
import './main.scss';

function Main(props) {
  const history = useHistory();

  useEffect(() => {
    return history.listen((location) => props.onRouteUpdate(location));
  }, [history, props]);

  return (
    <div className='main'>
      <div className='backgroundVideo'>
        <video
          autoPlay
          muted
          loop
          src={Video}
          type='video/mp4'
          // see SCSS for styles
          // onclick="playVideo()"
        />
      </div>

      <div className='mainContent'>
        <Switch>
          <Route exact path='/' component={Shop} />
          <Route exact path='/listorder' component={ListOrder} />
          <Route exact path='/listprod' component={ListProduct} />
          <Route exact path='/loaddata' component={LoadData} />
          <Route exact path='/checkout' component={Checkout} />
          <Route exact path='/order/:customerId' component={Order} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/logout' component={Logout} />
          <Route exact path='/admin' component={Admin} />
          <Route exact path='/profile' component={Profile} />
          <Route exact path='/orders' component={Orders} />
          <Route exact path='/showcart' component={ShowCart} />
          <Route exact path='/enter' component={Enter} />
          <Route exact path='/product/:productId' component={SingleProduct} />
        </Switch>
      </div>
    </div>
  );
}

export default Main;
