import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import './Login.css';
import '../Header/Header.css';

function Login() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');
  const [formValid, setFormValid] = React.useState(false)

  React.useEffect(() => {
    (emailError || passwordError || email === '' || password === '') 
      ? setFormValid(false) 
      : setFormValid(true);
  }, [emailError, passwordError, email, password])

  function handleChangeEmail(e) {
    setEmail(e.target.value)
    const regex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
    if (!regex.test(email)) {
      setEmailError('Пожалуйста, введите корректный email-адрес.') 
      if (!e.target.value) {
        setEmailError('Обязательное поле.')
      }
    } else {
      setEmailError('')
    }
  }

  function handleChangePassword(e) {
    setPassword(e.target.value)
    if (e.target.value.length < 8) {
      setPasswordError('Длина пароля должна быть не менее 8 символов.')
      if (!e.target.value) {
        setPasswordError('Обязательное поле.')
      }
    } else {
      setPasswordError('')
    }
  }

  return (
    <div className="login">
      <Logo />
      <p className="login__welcome">Рады видеть!</p>
        <form className="login__form">
          <fieldset className="login__field">
            <label className="login__label" htmlFor="email">E-mail</label>
            <input 
              className={`login__input ${emailError ? "login__input_error" : "login__input_valid"}`}
              id="email" 
              name="email" 
              type="email" 
              onChange={handleChangeEmail}
              value={email}
              autoComplete="off"
            />
            <span className={`${emailError ? "login__input-error" : null}`}>{emailError}</span>
          </fieldset>

          <fieldset className="login__field">
            <label className="login__label" htmlFor="password">Пароль</label>
            <input 
              className={`login__input ${passwordError ? "login__input_error" : "login__input_valid"}`}
              id="password" 
              name="password" 
              type="password" 
              onChange={handleChangePassword}
              value={password}
              autoComplete="off"
            />
            <span className={`${passwordError ? "login__input-error" : null}`}>{passwordError}</span>
          </fieldset>
        </form>
        <button type="submit" className={`login__submit ${!formValid ? "login__submit_inactive" : null}`}>Войти</button>
        <div className="login__redirection">
          <p className="login__point">Ещё не зарегистрированы?</p>
          <Link to="/signup" className="login__link">Регистрация</Link>
        </div>
    </div>
  )
}

export default Login;