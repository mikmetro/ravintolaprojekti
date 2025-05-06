import './header.css';
import {IoCartOutline} from 'react-icons/io5';
import {useState} from 'react';
import CartSideMenu from './CartSideMenu';
import useUserContext from '../hooks/contextproviders/useUserContext';
import {Link} from 'react-router-dom';
import logo from '../../assets/logo.png';

export default function Header() {
  const [sideMenuOpen, setSideMenuOpen] = useState();
  const {user} = useUserContext();

  const toggleCart = () => setSideMenuOpen(!sideMenuOpen);

  return (
    <header>
      <Link className="header-logo-wrapper" to="/">
        <img className="header-logo" src={logo} alt="Logo" />
      </Link>
      <Link className="header-link" to="/menu">
        Ruokalista
      </Link>
      <Link className="header-link" to="/profile">
        Profiili
      </Link>
      {user?.role === 'admin' && (
        <Link className="header-link" to="/admin">
          Hallintasivu
        </Link>
      )}
      <Link className="header-link" to="/cart">
        Ostoskori
      </Link>
      <button className="header-cart" onClick={toggleCart}>
        <IoCartOutline />
      </button>
      <CartSideMenu
        sideMenuOpen={sideMenuOpen}
        setSideMenuOpen={setSideMenuOpen}
      />
    </header>
  );
}
