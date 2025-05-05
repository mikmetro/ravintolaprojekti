import {useEffect, useState} from 'react';
import {CartContext} from './Contexts';
import {useItem} from '../hooks/useItem';

const CartProvider = ({children}) => {
  const [cartItems, setCartItems] = useState({});
  const [cartPrice, setCartPrice] = useState(0);
  const [loading, setLoading] = useState(true);

  const {getItemById} = useItem();

  useEffect(() => {
    setCartItems(loadCart());
    setLoading(false);
  }, []);

  useEffect(() => {
    if (loading) return;
    updatePrice();
    saveCart(cartItems);
  }, [cartItems]);

  const loadCart = () => JSON.parse(localStorage.getItem('cart')) ?? {};

  const saveCart = () =>
    localStorage.setItem('cart', JSON.stringify(cartItems));

  const setItem = async (itemId, quantity) => {
    const newCartItems = {...cartItems};
    if (!newCartItems[itemId]) {
      const itemDetails = await getItemById(itemId);
      newCartItems[itemId] = {info: itemDetails.data};
    }
    if (quantity <= 0) delete newCartItems[itemId];
    else newCartItems[itemId]['quantity'] = quantity;
    setCartItems(newCartItems);
  };

  const removeItem = (itemId) => setItem(itemId, -1);

  const addItem = (itemId, quantity) =>
    setItem(itemId, (cartItems[itemId] ?? 0) + quantity);

  const subtractItem = (itemId, quantity) =>
    setItem(itemId, (cartItems[itemId] ?? 0) - quantity);

  const updatePrice = () => {
    const price = Object.values(cartItems).reduce(
      (acc, item) => acc + +item.info.price * item.quantity,
      0
    );
    console.log(price);
    setCartPrice(price);
  };

  const clearCart = () => setCartItems({});

  return (
    <CartContext.Provider
      value={{
        cartPrice,
        cartItems,
        addItem,
        subtractItem,
        removeItem,
        setItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
export default CartProvider;
