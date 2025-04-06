import './header.css';
import {IoCartOutline} from 'react-icons/io5';

export default function Header() {
  return (
    <header>
      <a className="header-logo-wrapper" href="/">
        <img className="header-logo" src="https://placehold.co/96x48" />
      </a>
      <a className="header-link" href="menu">
        Ruokalista
      </a>
      <a className="header-link" href="profile">
        Oma tili
      </a>
      <button className="header-cart">
        <IoCartOutline />
      </button>
    </header>
  );
}
