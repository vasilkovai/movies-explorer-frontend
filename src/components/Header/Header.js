import React from 'react';
import { Route } from 'react-router-dom';
import Logo from '../Logo/Logo';
import AuthHeader from '../AuthHeader/AuthHeader';
import Navigation from '../Navigation/Navigation';
import NavBar from '../NavBar/NavBar';
import './Header.css';

function Header() {
  return (
    <div className="header">
      <Logo />
      <Route exact path="/">
        <AuthHeader />
      </Route>
      <Route path="/movies">
        <Navigation />
        <NavBar />
      </Route>
      <Route path="/saved-movies">
        <Navigation />
        <NavBar />
      </Route>
      <Route path="/profile">
        <Navigation />
        <NavBar />
      </Route>
    </div>
  );
}

export default Header;