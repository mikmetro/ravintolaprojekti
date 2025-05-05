import React, {useEffect, useState} from 'react';
import {Outlet, Navigate} from 'react-router-dom';
import '../css/loading.css';
import useUserContext from '../hooks/contextproviders/useUserContext';

export default function PrivateRoute() {
  const [isValidToken, setIsValidToken] = useState();
  const {refreshUser} = useUserContext();

  useEffect(() => {
    (async () => {
      const isAuthenticated = await refreshUser();
      setIsValidToken(isAuthenticated);
    })();
  }, []);

  if (isValidToken === undefined)
    return <div className="privateroute-loading">Loading</div>;

  return isValidToken ? <Outlet /> : <Navigate to="/login" replace />;
}
