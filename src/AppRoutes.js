import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import './Resources/css/app.css';
import Header from './components/Header_footer/header';
import Footer from './components/Header_footer/footer';
import Home from './components/Home';
import SignIn from './components/Signin';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './components/Admin/Dashboard';
import AuthGuard from './Hoc/Auth'; // Import the AuthGuard
import AdminPlayers from './components/Admin/players'

const AppRoutes = ({ user }) => {
  return (
    <BrowserRouter>
      <Header user={user} />
      
      <Routes>
      <Route
          path="/admin_players"
          element={
            <AuthGuard component={AdminPlayers}/>
          }
        />
        {/* Protect the dashboard route */}
        <Route
          path="/dashboard"
          element={
            <AuthGuard component={Dashboard}/>
          }
        />
        <Route path="/sign_in" element={<SignIn whereTo={<Dashboard />} user={user} />} />
        <Route path="/" element={<Home />} />
      </Routes>
      <ToastContainer />
      <Footer />
    </BrowserRouter>
  );
};

export default AppRoutes;
