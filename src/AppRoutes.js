import React from 'react';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import './Resources/css/app.css'
import Header from './components/Header_footer/header';
import Footer from './components/Header_footer/footer';
import Home from './components/Home';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {/* Use 'element' instead of 'component' */}
        <Route path="/" element={<Home />} />  
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default AppRoutes;
