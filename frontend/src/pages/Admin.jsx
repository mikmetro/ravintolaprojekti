import Input from '../components/ui/Input';
import '../css/admin.css';
import '../css/menu.css';
import MenuItem from '../components/MenuItem';
import OrderItemModal from '../components/OrderItemModal';
import {NavLink} from 'react-router-dom';

export default function Admin() {
  return (
    <section className="admin-wrapper">
      <NavLink to="/editMenu">Muokkaa ruokalistaa</NavLink>
    </section>
  );
}
