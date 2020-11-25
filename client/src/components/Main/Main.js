import { Switch, Route } from 'react-router-dom';
import Home from '../../views/Home/Home';

import ListOrder from '../../views/ListOrder/ListOrder';
import LoadData from '../../views/LoadData';

function Main() {
	return (
		<Switch>
			<Route exact path="/" component={Home} />
			<Route exact path="/listorder" component={ListOrder} />
			<Route exact path="/loaddata" component={LoadData} />
		</Switch>
	);
}

export default Main;
