import React from 'react';
import { Link } from 'react-router-dom';
import logo from './../../images/logo_header.svg';
import './Logo.css';

function Header() {
  return (
    <div className="logo">
      <Link to="/"><img className="logo__icon" alt="Логотип" src={logo}/></Link>
    </div>
  );
}

export default Header;