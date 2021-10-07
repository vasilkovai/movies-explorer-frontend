import React from 'react';
import { Route, Link} from 'react-router-dom';
import './AuthHeader.css';

function AuthHeader() {
  return (
    <div className="auth">
      <Route exact path="/">
        <div className="auth__container">
          <Link to="/signup"><button className="auth__signup">Регистрация</button></Link>
          <Link to="/signin"><button className="auth__signin">Вход</button></Link>
        </div>
      </Route>
    </div>
  );
}

export default AuthHeader;