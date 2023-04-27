import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Element, ...rest }) => {
  const isLoggedIn = () => {
    const token = localStorage.getItem('token');
    return !!token; // Returns true if there's a token, false otherwise
  };

  return (
    <Route
      {...rest}
      element={
        isLoggedIn() ? (
          <Element />
        ) : (
          <Navigate to="/" replace /> // Redirect to the login page
        )
      }
    />
  );
};

export default PrivateRoute;
