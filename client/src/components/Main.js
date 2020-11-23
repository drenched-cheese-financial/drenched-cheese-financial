import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import About from './About';
import ListOrder from './ListOrder';

function Main() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/about" component={About} />
      <Route exact path="/listorder" component={ListOrder} />
    </Switch>
  );
}

export default Main;
