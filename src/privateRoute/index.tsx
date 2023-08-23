import React, { useEffect, useState } from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, getUserInfo } from '../fireabse';

const PrivateRoute = ({ children, ...props }: any) => {
  const tokenFromLocalStorage = localStorage.getItem('token');

  return tokenFromLocalStorage ? <Outlet /> : <Navigate to='/' />;
};

export default PrivateRoute;
