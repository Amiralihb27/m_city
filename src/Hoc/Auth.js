import React from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from '../firebase';

const AuthGuard = (WrappedComponent) => {
 
      const user = auth.currentUser;
      if (user) {
        console.log('User authenticated');
        return <WrappedComponent {...this.props} />;
      } else {
        console.log('No user, redirecting to home');
        return <Navigate to="/" />;
      }
   
  };
 
export default AuthGuard;
