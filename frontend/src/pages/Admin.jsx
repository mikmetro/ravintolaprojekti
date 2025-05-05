import '../css/admin.css';
import {NavLink} from 'react-router-dom';

export default function Admin() {
  return (
    <section className="admin-wrapper">
      <NavLink to="/orders">Hallinnoi tilauksia</NavLink>
      <NavLink to="/edit-menu">Muokkaa ruokalistaa</NavLink>
      <NavLink to="/manage-users">Hallinnnoi profiileja</NavLink>
    </section>
  );
}
