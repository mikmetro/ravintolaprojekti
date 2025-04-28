import React, {useEffect, useState} from 'react';
import {Outlet, useLocation, useNavigate} from 'react-router-dom';
import '../css/loading.css';
import useUserContext from '../hooks/contextproviders/useUserContext';

export default function PrivateRoute() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const {refreshUser} = useUserContext();

  useEffect(() => {
    (async () => {
      const isAuthenticated = await refreshUser();

      navigate(isAuthenticated ? location.pathname : '/login');

      setLoading(false);
    })();
  }, []);

  return loading ? (
    <div className="privateroute-loading">Loading</div>
  ) : (
    <Outlet />
  );
}
