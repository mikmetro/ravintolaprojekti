import {useContext} from 'react';
import {CartContext} from '../../contexts/Contexts';

const useCartContext = () => {
  const context = useContext(CartContext);

  if (!context) throw new Error('CartContext is invalid');

  return context;
};

export default useCartContext;
