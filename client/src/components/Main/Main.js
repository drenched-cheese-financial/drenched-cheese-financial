import { Switch, Route } from 'react-router-dom';
import Home from '../../views/home/Home';
import ListProduct from '../../views/list-product/ListProduct';
import ListOrder from '../../views/list-order/ListOrder';
import LoadData from '../../views/load-data/LoadData';

function Main() {
	return (
		<Switch>
			<Route exact path="/" component={Home} />
			<Route exact path="/listorder" component={ListOrder} />
			<Route exact path="/listprod" component={ListProduct} />
			<Route exact path="/loaddata" component={LoadData} />
		</Switch>
	);
}

export default Main;
