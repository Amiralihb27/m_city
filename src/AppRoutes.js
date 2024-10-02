import React from 'react';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import './Resources/css/app.css'
import Header from './components/Header_footer/header';
import Footer from './components/Header_footer/footer';
import Home from './components/Home';
import  SignIn from './components/Signin';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './components/Admin/Dashboard'
import AuthGuard from './Hoc/Auth';


const AppRoutes = ({user}) => {
  return (
    <BrowserRouter>
      <Header user={user}/>
      <Routes>
        {/* Use 'element' instead of 'component' */}
        <Route path="/dashboard" element={AuthGuard (Dashboard)} />  
        <Route path="/sign_in" element={<SignIn />} />  
        <Route path="/" element={<Home />} />  
      </Routes>
      <ToastContainer />
      <Footer />
    </BrowserRouter>
  );
}

export default AppRoutes;
