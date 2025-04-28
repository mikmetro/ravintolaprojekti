// UserContext.jsx
import {createContext, useState} from 'react';
import {loginUser, checkCurrentToken} from '../hooks/useAuth';
import {registerUser} from '../hooks/useUser';
import {useNavigate} from 'react-router-dom';

const UserContext = createContext(null);

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

  const refreshUser = async () => {
    const tokenResult = await checkCurrentToken();
    if (tokenResult.statusCode === 200) setUser(tokenResult.user);
    return tokenResult.statusCode === 200;
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem('token');
      navigate('/');
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <UserContext.Provider
      value={{user, handleLogin, handleLogout, handleRegister, refreshUser}}
    >
      {children}
    </UserContext.Provider>
  );
};
export {UserProvider, UserContext};
