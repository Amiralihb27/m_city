import React from 'react';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import './Resources/css/app.css'
import Header from './components/Header_footer/header';
import Footer from './components/Header_footer/footer';
import Home from './components/Home';
import  SignIn from './components/Signin';

const AppRoutes = ({user}) => {
  return (
    <BrowserRouter>
      <Header user={user}/>
      <Routes>
        {/* Use 'element' instead of 'component' */}
        <Route path="/sign_in" element={<SignIn />} />  
        <Route path="/" element={<Home />} />  
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default AppRoutes;
