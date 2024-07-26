import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const token = Cookies.get('token');

  return token ? <Component {...rest} /> : <Navigate to="/connexion" />;
};

export default ProtectedRoute;
