import { Switch, Route } from 'react-router-dom';
import Home from '../../views/home/Home';
import ListProduct from '../../views/list-product/ListProduct';
import ListOrder from '../../views/list-order/ListOrder';
import LoadData from '../../views/load-data/LoadData';
import ShowCart from '../../views/showcart/ShowCart';

function Main() {
	return (
		<Switch>
			<Route exact path="/" component={Home} />
			<Route exact path="/listorder" component={ListOrder} />
			<Route exact path="/listprod" component={ListProduct} />
			<Route exact path="/loaddata" component={LoadData} />
			<Route exact path="/showcart" component={ShowCart} />
		</Switch>
	);
}

export default Main;
