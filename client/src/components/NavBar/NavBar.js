import { NavLink } from 'react-router-dom';
import './NavBar.scss';

function NavBar() {
	return (
		<nav>
			<ul >
				<li>
					<NavLink to="/">Home</NavLink>
				</li>
				<li>
					<NavLink to="/login">Customer Login</NavLink>
				</li>
				<li>
					<NavLink to="/listprod">Begin Shopping</NavLink>
				</li>

				<li>
					<NavLink to="/listorder">List Orders</NavLink>
				</li>
				<li>
					<NavLink to="/customer">Customer Info</NavLink>
				</li>
				<li>
					<NavLink to="/admin">Administrators</NavLink>
				</li>
				<li>
					<NavLink to="/logout">Log out</NavLink>
				</li>
			</ul>
		</nav>
	);
}

export default NavBar;
