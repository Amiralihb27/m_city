import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRoutes from './AppRoutes';
import { auth } from './firebase'; 
import { onAuthStateChanged } from "firebase/auth"; 

const App = (props) => {
  return <AppRoutes {...props} />;
};

const root = ReactDOM.createRoot(document.getElementById('root'));

// Use the new modular onAuthStateChanged method
onAuthStateChanged(auth, (user) => {
  root.render(
    <React.StrictMode>
      <App user={user} />
    </React.StrictMode>
  );
});
