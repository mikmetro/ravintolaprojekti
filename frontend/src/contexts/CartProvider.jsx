import {useEffect, useState} from 'react';
import {CartContext} from './Contexts';

const CartProvider = ({children}) => {
  const [cartItems, setCartItems] = useState({});

  useEffect(() => {
    setCartItems(loadCart());
    console.log(cartItems);
  }, []);

  useEffect(() => {
    console.log(cartItems);
    saveCart();
  }, [cartItems]);

  const loadCart = () => JSON.parse(localStorage.getItem('cart')) ?? {};

  const saveCart = () =>
    localStorage.setItem('cart', JSON.stringify(cartItems));

  const setItem = (itemId, quantity) => {
    const newCartItems = {...cartItems};
    if (quantity <= 0) delete newCartItems[itemId];
    else newCartItems[itemId] = quantity;
    setCartItems(newCartItems);
  };

  const removeItem = (itemId) => setItem(itemId, -1);

  const addItem = (itemId, quantity) =>
    setItem(itemId, (cartItems[itemId] ?? 0) + quantity);

  const subtractItem = (itemId, quantity) =>
    setItem(itemId, (cartItems[itemId] ?? 0) - quantity);

  return (
    <CartContext.Provider
      value={{cartItems, addItem, subtractItem, removeItem, setItem}}
    >
      {children}
    </CartContext.Provider>
  );
};
export default CartProvider;
