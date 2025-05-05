import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from 'react-router-dom';
import Layout from './Layout';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import Login from './pages/Login';
import EditMenu from './pages/EditMenu';
import Register from './pages/Register';
import AdminOrders from './pages/AdminOrders';
import PrivateRoute from './customroutes/PrivateRoute';
import UserProvider from './contexts/UserProvider';
import CartProvider from './contexts/CartProvider';
import ShoppingCart from './pages/ShoppingCart';
import Order from './pages/Order';
import ManageUsers from './pages/ManageUsers';

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <CartProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="menu" element={<Menu />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route element={<PrivateRoute />}>
                <Route path="cart" element={<ShoppingCart />} />
                <Route path="profile" element={<Profile />} />
                <Route path="admin" element={<Admin />} />
                <Route path="edit-menu" element={<EditMenu />} />
                <Route path="manage-users" element={<ManageUsers />} />
                <Route path="orders" element={<AdminOrders />} />
                <Route path="order/:id" element={<Order />} />
              </Route>
            </Route>
          </Routes>
        </CartProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
