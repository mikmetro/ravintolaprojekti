import ShoppingCartRows from '../components/shoppingCartRows';
import '../css/shoppingPage.css';

import '../css/Menu.css';
import {CartContext} from '../contexts/Contexts';
import useCartContext from '../hooks/contextproviders/useCartContext';
import Button from '../components/ui/Button';

function ShoppingCart() {
  const {cartItems, cartPrice} = useCartContext();

  return (
    <div className="shopping-page-wrapper">
      <table className="shopping-page-table">
        <thead>
          <tr>
            <th>Tuote</th>
            <th>Hinta/kpl</th>
            <th>Määrä</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(cartItems).length === 0 ? (
            <tr>
              <td colSpan="3">No items in cart</td>
            </tr>
          ) : (
            Object.values(cartItems).map(({quantity, info: item}) => (
              <ShoppingCartRows key={item.id} item={item} quantity={quantity} />
            ))
          )}
        </tbody>
      </table>
      <div className="shopping-page-total">
        <h2>Total:{cartPrice} €</h2>
        <Button color="green"> Maksa </Button>
      </div>
    </div>
  );
}

export default ShoppingCart;
