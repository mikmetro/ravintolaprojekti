import {useEffect, useState} from 'react';
import {CartContext} from './Contexts';

const CartProvider = ({children}) => {
  const [cartItems, setCartItems] = useState({});

  useEffect(() => {
    setCartItems(loadCart());
    console.log(cartItems);
  }, []);

  useEffect(() => {
    saveCart();
  }, [cartItems]);

  const loadCart = () => JSON.parse(localStorage.getItem('cart')) ?? {};

  const saveCart = () =>
    localStorage.setItem('cart', JSON.stringify(cartItems));

  const addItem = (itemId, quantity) => {
    const newItem = (cartItems[itemId] ?? 0) + quantity;
    setCartItems({...cartItems, newItem});
  };

  const subtractItem = (itemId, quantity) => {
    if (!cartItems[itemId]) return;

    const newCartItems = {...cartItems};
    const newQuantity = newCartItems[itemId] - quantity;
    if (newQuantity <= 0) delete newCartItems[itemId];
    else newCartItems[itemId] = newQuantity;

    setCartItems(newCartItems);
  };

  const removeItem = (itemId) => {
    if (!cartItems[itemId]) return;

    const newCartItems = {...cartItems};
    delete newCartItems[itemId];
    setCartItems(newCartItems);
  };

  return (
    <CartContext.Provider
      value={{cartItems, addItem, subtractItem, removeItem}}
    >
      {children}
    </CartContext.Provider>
  );
};
export default CartProvider;
