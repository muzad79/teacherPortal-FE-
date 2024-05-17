import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext'; // Assuming you have an AuthContext
import Login from '../pages/Login';

const ProtectedRoute = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <>
     {isAuthenticated ? <Outlet /> : <Navigate to="/login" />};
     </>
  );
};

export default ProtectedRoute;
