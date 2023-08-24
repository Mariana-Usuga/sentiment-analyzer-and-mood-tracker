import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute: React.FC = () => {
  const tokenFromLocalStorage = localStorage.getItem('token');

  return tokenFromLocalStorage ? <Outlet /> : <Navigate to='/' />;
};

export default PrivateRoute;
