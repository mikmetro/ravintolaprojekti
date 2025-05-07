import ShoppingCartRows from '../components/ShoppingCartRows';
import '../css/shoppingPage.css';
import useCartContext from '../hooks/contextproviders/useCartContext';
import Button from '../components/ui/Button';
import {useNavigate} from 'react-router-dom';
import {useOrder} from '../hooks/useOrder';
import {getUserAddress} from '../hooks/useUser';
import {useEffect, useState} from 'react';
import useUserContext from '../hooks/contextproviders/useUserContext';

function ShoppingCart() {
  const {user} = useUserContext();
  const {cartItems, cartPrice, clearCart} = useCartContext();
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(-1);
  const [deliveryType, setDeliveryType] = useState('nouto');
  const {placeOrder} = useOrder();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (!user) return;
      const addresses = await getUserAddress(user.id);
      if (addresses.length > 0) {
        setSelectedAddress(addresses[0].id);
      }

      setAddresses(addresses);
    })();
  }, []);

  const handleOrder = async () => {
    if (Object.keys(cartItems).length === 0) return;

    // Define orderDetails based on deliveryType
    const orderDetails =
      deliveryType === 'toimitus'
        ? {
            address: selectedAddress,
            items: cartItems,
            type: 'delivery',
          }
        : {
            address: 0, // need to be set even for pickup orders, since the backend requires it
            items: cartItems,
            type: 'pickup',
          };

    // Place the order
    const orderResult = await placeOrder(orderDetails);
    if (orderResult.statusCode === 201) {
      clearCart();
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
              <td colSpan="3">Ei tuotteita ostoskorissa</td>
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
        <select
          name="deliverType"
          id="deliveryType"
          className="shopping-page-address-dropdown"
          value={deliveryType}
          onChange={(e) => setDeliveryType(e.target.value)}
        >
          <option value="nouto">Nouto</option>
          <option value="toimitus">Toimitus</option>
        </select>
        {deliveryType === 'toimitus' && (
          <>
            {addresses.length !== 0 ? (
              <>
                <p className="shopping-page-address-text">
                  Valitse toimitusosoite
                </p>
                <select
                  className="shopping-page-address-dropdown"
                  value={selectedAddress}
                  onChange={(e) => setSelectedAddress(e.target.value)}
                >
                  {addresses.map((address) => (
                    <option key={address.id} value={address.id}>
                      {address.street}, {address.postalcode} {address.city}
                    </option>
                  ))}
                </select>
              </>
            ) : (
              <p>ei osoitteita</p>
            )}
          </>
        )}
      </div>
      <div className="shopping-page-total">
        <h2>Total: {cartPrice.toFixed(2)}€</h2>
        <div className="shopping-page-buttons">
          <Button
            color={Object.keys(cartItems).length === 0 ? 'red' : 'green'}
            onClick={handleOrder}
          >
            Maksa
          </Button>
          <Button color="yellow" onClick={() => navigate('/profile')}>
            Lisää uusi osoite
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;
