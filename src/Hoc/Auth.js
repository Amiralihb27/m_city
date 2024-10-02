import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from '../firebase'; // Your Firebase auth import

const AuthGuard = (props,{ ...rest}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAuthenticated(!!user); // Convert user object to a boolean
      setLoading(false); // Stop loading once we have the auth status
    });

    return () => unsubscribe(); // Clean up Firebase auth listener
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator while checking auth status
  }

  return isAuthenticated ? < props.component/>: <Navigate to="/" />;
};

export default AuthGuard;
