import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import About from './About';
import ListOrder from './ListOrder';
import LoadData from './LoadData';

function Main() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/about" component={About} />
      <Route exact path="/listorder" component={ListOrder} />
      <Route exact path="/loaddata" component={LoadData} />
    </Switch>
  );
}

export default Main;
