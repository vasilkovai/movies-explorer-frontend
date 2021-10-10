import React from 'react';
import { Route, Link} from 'react-router-dom';
import { CgMenu } from 'react-icons/cg';
import { CgClose } from 'react-icons/cg';
import profileIcon from './../../images/profile2.svg';
import './NavBar.css';

function NavBar() {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="navbar">
      <CgMenu className="navbar__hamburger" onClick={() => setOpen(true)}/>
      <nav className={`navbar__container ${open ? 'navbar__container_active' : ''}`}>
        <div className="navbar__menu">
          <CgClose className="navbar__hamburger_close" onClick={() => setOpen(false)}/>
          <Route exact path="/movies" >
            <div className="navbar__pages">
              <Link className="navbar__page" to="/">Главная</Link>
              <Link className="navbar__page_active" to="/movies">Фильмы</Link>
              <Link className="navbar__page" to="/saved-movies">Сохранённые фильмы</Link>
            </div>
          </Route>
          <Route exact path="/saved-movies" >
            <div className="navbar__pages">
              <Link className="navbar__page" to="/">Главная</Link>
              <Link className="navbar__page" to="/movies">Фильмы</Link>
              <Link className="navbar__page_active" to="/saved-movies">Сохранённые фильмы</Link>
            </div>
          </Route>
          <Route exact path="/profile" >
            <div className="navbar__pages">
              <Link className="navbar__page" to="/">Главная</Link>
              <Link className="navbar__page" to="/movies">Фильмы</Link>
              <Link className="navbar__page" to="/saved-movies">Сохранённые фильмы</Link>
            </div>
          </Route>
          <Link to="/profile" className="navbar__profile">
            <img className="navbar__profile-icon" alt="Аккаунт" src={profileIcon}/>
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;