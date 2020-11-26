import { Switch, Route } from 'react-router-dom';
import Shop from '../../views/shop/Shop';
import ListOrder from '../../views/list-order/ListOrder';
import LoadData from '../../views/load-data/LoadData';
import Checkout from '../../views/checkout/Checkout';
import Order from '../../views/order/Order';
import Login from '../../views/login/Login';
import Logout from '../../views/logout/Logout';

function Main() {
	return (
		<Switch>
			<Route exact path="/" component={Shop} />
			<Route exact path="/listorder" component={ListOrder} />
			<Route exact path="/loaddata" component={LoadData} />
			<Route exact path="/checkout" component={Checkout} />
			<Route exact path="/order/:customerId" component={Order} />
			<Route exact path="/login" component={Login} />
			<Route exact path="/logout" component={Logout} />
		</Switch>
	);
}

export default Main;
