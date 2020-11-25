import { Switch, Route } from 'react-router-dom';
import Home from '../../views/home/Home';

import ListOrder from '../../views/list-order/ListOrder';
import LoadData from '../../views/load-data/LoadData';
import Checkout from '../../views/checkout/Checkout';

function Main() {
	return (
		<Switch>
			<Route exact path="/" component={Home} />
			<Route exact path="/listorder" component={ListOrder} />
			<Route exact path="/loaddata" component={LoadData} />
			<Route exact path="/checkout" component={Checkout} />
		</Switch>
	);
}

export default Main;
