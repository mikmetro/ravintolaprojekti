import '../css/admin.css';
import {NavLink} from 'react-router-dom';

export default function Admin() {
  return (
    <section className="admin-wrapper">
      <NavLink to="/editMenu">Muokkaa ruokalistaa</NavLink>
      <NavLink to="/orders">Hallinnoi tilauksia</NavLink>
    </section>
  );
}
