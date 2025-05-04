import useCartContext from '../hooks/contextproviders/useCartContext';
import Button from './ui/Button';
import {useNavigate} from 'react-router-dom';

export default function CartSideMenu({sideMenuOpen, setSideMenuOpen}) {
  const {cartItems, cartPrice} = useCartContext();
  const navigate = useNavigate();

  const handleClick = () => {
    setSideMenuOpen(false);
    navigate('cart');
  };

  return (
    <section className={`header-cartmenu ${sideMenuOpen && 'open'}`}>
      <section className="header-cartmenu-items">
        {Object.values(cartItems).map(({quantity, info: item}) => (
          <div key={item.id} className="header-cartmenu-item">
            <p className="header-cartmenu-item-quantity">{quantity}x</p>
            <p className="header-cartmenu-item-name">{item.name}</p>
            <p className="header-cartmenu-item-price">
              {(quantity * +item.price).toFixed(2)}€
            </p>
          </div>
        ))}
      </section>
      <p className="header-cartmenu-total">Total: {cartPrice.toFixed(2)}€</p>
      <Button color="green" onClick={handleClick}>
        Mene kassalle
      </Button>
    </section>
  );
}
