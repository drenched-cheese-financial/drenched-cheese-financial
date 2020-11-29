import { NavLink } from 'react-router-dom';
import './navbar.scss';

function NavBar() {
	return (
		<nav>
			<ul>
				<li className='logo'>
					<NavLink to='/'>
						{' '}
						<span className='emojis'>💰 🧀</span>
						<span className='tallLetter'>D</span>renched{' '}
						<span className='tallLetter'>C</span>heese
						<span className='tallLetter'>F</span>inancial{' '}
						<span className='emojis'>🧀 💰</span>
					</NavLink>
				</li>
				<div className='rightLinks'>
					<li>
						<NavLink to='/login'>Customer Login</NavLink>
					</li>
					<li>
						<NavLink to='/listprod'>Begin Shopping</NavLink>
					</li>
					<li>
						<NavLink to='/listorder'>List Orders</NavLink>
					</li>
					<li>
						<NavLink to='/customer'>Customer Info</NavLink>
					</li>
					<li>
						<NavLink to='/admin'>Administrators</NavLink>
					</li>
					<li>
						<NavLink to='/logout'>Log out</NavLink>
					</li>
				</div>
			</ul>
		</nav>
	);
}

export default NavBar;
