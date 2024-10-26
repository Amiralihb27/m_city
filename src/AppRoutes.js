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
import AdminPlayers from './components/Admin/players';
import AddEditPlayers from './components/Admin/players/addEditPlayers';
import TheTeam from './components/theTeam';
import AdminMatches from './components/Admin/match';
import AddEditMatches from './components/Admin/match/addEditMatch';
import TheMatches from './components/theMatches';
const AppRoutes = ({ user }) => {
  return (
    <BrowserRouter>
      <Header user={user} />

      <Routes>
        <Route
          path="/admin_matches/edit_match/:matchid"
          element={
            <AuthGuard component={AddEditMatches} />
          }
        />
        <Route
          path="/admin_matches/add_match"
          element={
            <AuthGuard component={AddEditMatches} />
          }
        />
        <Route
          path="/admin_matches"
          element={
            <AuthGuard component={AdminMatches} />
          }
        />

        <Route
          path="/admin_players/edit_player/:playerid"
          element={
            <AuthGuard component={AddEditPlayers} />
          }
        />
        <Route
          path="/admin_players/add_player"
          element={
            <AuthGuard component={AddEditPlayers} />
          }
        />


        <Route
          path="/admin_players"
          element={
            <AuthGuard component={AdminPlayers} />
          }
        />
        {/* Protect the dashboard route */}
        <Route
          path="/dashboard"
          element={
            <AuthGuard component={Dashboard} />
          }
        />
        <Route
          path="/the_team"
          element={
            // <AuthGuard component={TheTeam} />
            <TheTeam />
          }
        />
        <Route path="/the_matches" element={<TheMatches />} />
        <Route path="/sign_in" element={<SignIn whereTo={<Dashboard />} user={user} />} />
        <Route path="/" element={<Home />} />
      </Routes>
      <ToastContainer />
      <Footer />
    </BrowserRouter>
  );
};

export default AppRoutes;
