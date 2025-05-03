import './header.css';
import {IoCartOutline} from 'react-icons/io5';
import {useState} from 'react';
import CartSideMenu from './CartSideMenu';

export default function Header() {
  const [sideMenuOpen, setSideMenuOpen] = useState();

  const toggleCart = () => setSideMenuOpen(!sideMenuOpen);

  return (
    <header>
      <a className="header-logo-wrapper" href="/">
        <img className="header-logo" src="https://placehold.co/96x48" />
      </a>
      <a className="header-link" href="menu">
        Ruokalista
      </a>
      <a className="header-link" href="profile">
        Profiili
      </a>
      <a className="header-link" href="admin">
        Hallintasivu
      </a>
      <a className="header-link" href="cart">
        Ostoskori
      </a>
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
