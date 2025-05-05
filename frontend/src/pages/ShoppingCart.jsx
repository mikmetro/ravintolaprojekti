import ShoppingCartRows from '../components/shoppingCartRows';
import '../css/shoppingPage.css';
import '../css/Menu.css';
import useCartContext from '../hooks/contextproviders/useCartContext';
import Button from '../components/ui/Button';
import {useNavigate} from 'react-router-dom';
import {useOrder} from '../hooks/useOrder';

function ShoppingCart() {
  const {cartItems, cartPrice, clearCart} = useCartContext();
  const {placeOrder} = useOrder();
  const navigate = useNavigate();

  const handleOrder = async () => {
    const orderDetails = {
      address: 1,
      items: cartItems,
      type: 'delivery',
    };
    const orderResult = await placeOrder(orderDetails);
    if (orderResult.statusCode === 201) {
      //clearCart();
      navigate('/order/' + orderResult.data.orderId);
    }
  };

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
          {Object.values(cartItems).length === 0 ? ( // If cart is empty
            <tr>
              <td colSpan="3">No items in cart</td>
            </tr>
          ) : (
            // If cart is not empty
            // Map through cart items and display them
            Object.values(cartItems).map(({quantity, info: item}) => (
              <ShoppingCartRows key={item.id} item={item} quantity={quantity} />
            ))
          )}
        </tbody>
      </table>
      <div className="shopping-page-address">
        <p>Toimitus osoite: </p>
        <select
          className="shopping-page-address-dropdown"
          defaultValue="Valitse osoite"
        >
          <option>1</option>
          <option>dsadsa</option>
        </select>
      </div>
      <div className="shopping-page-total">
        <h2>Total: {cartPrice.toFixed(2)}€</h2>
        <Button color="green" onClick={handleOrder}>
          Maksa
        </Button>
      </div>
    </div>
  );
}

export default ShoppingCart;
