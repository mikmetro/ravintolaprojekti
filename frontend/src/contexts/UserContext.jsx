// UserContext.jsx
import {createContext, useState} from 'react';
import {useAuthentication, useUser} from '../hooks/apiHooks';
import {useNavigate} from 'react-router';

const UserContext = createContext(null);

const UserProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const {postLogin} = useAuthentication();
  const {getUserByToken} = useUser();
  const navigate = useNavigate();

  const handleLogin = async (credentials) => {
    try {
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleLogout = () => {
    try {
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <UserContext.Provider value={{user, handleLogin, handleLogout}}>
      {children}
    </UserContext.Provider>
  );
};
export {UserProvider, UserContext};
