import { NavLink } from 'react-router-dom';

function NavBar() {
  return (
    <nav>
      <ul style={{ listStyleType: 'none' }}>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
        <li>
          <NavLink to="/listorder">Listorder</NavLink>
        </li>
        <li>
          <NavLink to="/loaddata">Loaddata</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
