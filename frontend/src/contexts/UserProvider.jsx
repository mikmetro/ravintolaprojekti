// UserContext.jsx
import {useState} from 'react';
import {loginUser, checkCurrentToken} from '../hooks/useAuth';
import {
  registerUser,
  putUser,
  getUserAddress,
  putAddress,
  postAddress,
  deleteAddress,
} from '../hooks/useUser';
import {useNavigate} from 'react-router-dom';
import {UserContext} from './Contexts';

const UserProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (credentials) => {
    try {
      const loginResult = await loginUser(credentials);
      if (loginResult.statusCode === 200) {
        localStorage.setItem('token', loginResult.token);
        setUser(loginResult.user);
      }
      return loginResult;
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleRegister = async (credentials) => {
    try {
      await registerUser(credentials);
      return await handleLogin(credentials);
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleUpdateUser = async (credentials, id) => {
    try {
      await putUser(credentials, id);
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleGetAddresses = async (id) => {
    try {
      const result = await getUserAddress(id);
      return result;
    } catch (e) {
      console.log(e.message);
      return null;
    }
  };

  const handleAddAddress = async (credentials, id) => {
    try {
      const result = await postAddress(credentials, id);
      return result;
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleUpdateAddress = async (credentials, id) => {
    try {
      const result = await putAddress(credentials, id);
      return result;
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleDeleteAddress = async (id, addressId) => {
    try {
      const result = await deleteAddress(id, addressId);
      return result;
    } catch (e) {
      console.log(e.message);
    }
  };

  const refreshUser = async () => {
    const tokenResult = await checkCurrentToken();
    if (tokenResult.statusCode === 200) setUser(tokenResult.user);
    if (tokenResult.statusCode === 401) {
      localStorage.removeItem('token');
      setUser(null);
      navigate('/login');
    }
    return tokenResult.statusCode === 200;
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem('token');
      setUser(null);
      navigate('/');
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        handleLogin,
        handleLogout,
        handleRegister,
        handleUpdateUser,
        refreshUser,
        handleGetAddresses,
        handleAddAddress,
        handleUpdateAddress,
        handleDeleteAddress,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export default UserProvider;
