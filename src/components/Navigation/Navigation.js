import React from 'react';
import { Route, Link} from 'react-router-dom';
import profileIcon from './../../images/profile.png';
import './Navigation.css';

function Navigation() {
  return (
    <div className="nav">
      <Route exact path="/movies" >
        <div className="nav__pages">
          <Link className="nav__page_active" to="/movies">Фильмы</Link>
          <Link className="nav__page" to="/saved-movies">Сохранённые фильмы</Link>
        </div>
      </Route>
      <Route exact path="/saved-movies" >
        <div className="nav__pages">
          <Link className="nav__page" to="/movies">Фильмы</Link>
          <Link className="nav__page_active" to="/saved-movies">Сохранённые фильмы</Link>
        </div>
      </Route>
      <Route exact path="/profile" >
        <div className="nav__pages">
          <Link className="nav__page" to="/movies">Фильмы</Link>
          <Link className="nav__page" to="/saved-movies">Сохранённые фильмы</Link>
        </div>
      </Route>
      <Link to="/profile" className="nav__profile">
        <p className="navbar__profile-link">Аккаунт</p>
        <img className="navbar__profile-icon" alt="Аккаунт" src={profileIcon}/>
      </Link>
    </div>
  );
}

export default Navigation;