import React, {useEffect, useState} from 'react';
import {Outlet, useLocation, useNavigate} from 'react-router-dom';
import '../css/loading.css';
import {isTokenValid} from '../hooks/useAuth';

export default function PrivateRoute() {
  console.log(localStorage.getItem('token'));

  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const isAuthenticated = await isTokenValid();

      if (!isAuthenticated) {
        navigate('/login');
      } else {
        navigate(location.pathname);
      }
      setLoading(false);
    })();
  }, []);

  return loading ? (
    <div className="privateroute-loading">Loading</div>
  ) : (
    <Outlet />
  );
}
