// Contexts and Providers split in different files to avoid error with Vite fast refresh
import {createContext} from 'react';

const CartContext = createContext(null);
const UserContext = createContext(null);

export {CartContext, UserContext};
