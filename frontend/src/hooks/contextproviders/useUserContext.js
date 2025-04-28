import {useContext} from 'react';
import {UserContext} from '../../contexts/UserContext';

const useUserContext = () => {
  const context = useContext(UserContext);

  if (!context) throw new Error('UserContext is invalid');

  return context;
};

export default useUserContext;
