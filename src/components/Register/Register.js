import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import '../Login/Login.css';
import '../Header/Header.css';
import useFormWithValidation from "../../hooks/useFormWithValidation";

function Register({handleRegister, errorMessage}) {
  const { values, errors, isValid, handleChange } = useFormWithValidation();
  const { name, email, password } = values;

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleRegister({ name, email, password });
  };

  return (
    <div className="login">
      <Logo />
      <p className="login__welcome">Добро пожаловать!</p>
        <form className="login__form" onSubmit={handleSubmit}>
        <fieldset className="login__field">
          <label className="login__label" htmlFor="name">Имя</label>
            <input 
              className={`login__input ${errors.name ? "login__input_error" : "login__input_valid"}`}
              id="name" 
              name="name" 
              type="text" 
              onChange={handleChange}
              value={values.name || ''}
              autoComplete="off"
              required
              minLength="2"
              maxLength="30"
            />
            <span className={`${errors.name ? "login__input-error" : null}`}>{errors.name}</span>
          </fieldset>

          <fieldset className="login__field">
          <label className="login__label" htmlFor="email">E-mail</label>
            <input 
              className={`login__input ${errors.email ? "login__input_error" : "login__input_valid"}`}
              id="email" 
              name="email" 
              type="email" 
              onChange={handleChange}
              value={values.email || ''}
              autoComplete="off"
              required
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            />
            <span className={`${errors.email ? "login__input-error" : null}`}>{errors.email}</span>
          </fieldset>

          <fieldset className="login__field">
          <label className="login__label" htmlFor="password">Пароль</label>
            <input 
              className={`login__input ${errors.password ? "login__input_error" : "login__input_valid"}`}
              id="password" 
              name="password" 
              type="password" 
              onChange={handleChange}
              value={values.password || ''}
              autoComplete="off"
              required
              minLength="8"
              maxLength="30"
            />
            <span className={`${errors.password? "login__input-error" : null}`}>{errors.password}</span>
          </fieldset>
          <span className="login__request-error">{errorMessage}</span>
          <button type="submit" className={`login__submit_register ${!isValid ? "login__submit_inactive" : null}`}>Зарегистрироваться</button>
        </form>
        
        <div className="login__redirection">
          <p className="login__point">Уже зарегистрированы?</p>
          <Link to="/signin" className="login__link">Войти</Link>
        </div>
    </div>
  )
}

export default Register;