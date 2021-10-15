import React from 'react';
import Logo from '../Logo/Logo';
import AuthHeader from '../AuthHeader/AuthHeader';
import Navigation from '../Navigation/Navigation';
import NavBar from '../NavBar/NavBar';
import './Header.css';

function Header({loggedIn}) {
  return (
    <div className="header">
      <Logo />
      {loggedIn ? 
      (<>
      <Navigation />
      <NavBar />
      </>) : 
      (<AuthHeader />)
      }
    </div>
  );
}

export default Header;