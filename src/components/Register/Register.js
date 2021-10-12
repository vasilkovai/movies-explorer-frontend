import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import '../Login/Login.css';
import '../Header/Header.css';

function Register({handleRegister}) {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [nameError, setNameError] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');
  const [formValid, setFormValid] = React.useState(false)

  React.useEffect(() => {
    (emailError || passwordError || nameError || email === '' || password === '' || name === '') 
      ? setFormValid(false) 
      : setFormValid(true);
  }, [emailError, passwordError, nameError, email, password, name])

  function handleChangeName(e) {
    setName(e.target.value)
    if (e.target.value.length <= 2 || e.target.value.length >= 30) {
      setNameError('Длина имени должна быть не менее 2 символов и не более 30.')
      if (!e.target.value) {
        setNameError('Обязательное поле.')
      }
    } else {
      setNameError('')
    }
  }

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

  function handleSubmit(e) {
    e.preventDefault();

    handleRegister({
      email: email,
      password: password,
      name: name,
    })
  }

  return (
    <div className="login">
      <Logo />
      <p className="login__welcome">Добро пожаловать!</p>
        <form className="login__form" onSubmit={handleSubmit}>
        <fieldset className="login__field">
          <label className="login__label" htmlFor="name">Имя</label>
            <input 
              className={`login__input ${nameError ? "login__input_error" : "login__input_valid"}`}
              id="name" 
              name="name" 
              type="text" 
              onChange={handleChangeName}
              value={name}
              autoComplete="off"
            />
            <span className={`${nameError ? "login__input-error" : null}`}>{nameError}</span>
          </fieldset>

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
          <button type="submit" className={`login__submit_register ${!formValid ? "login__submit_inactive" : null}`}>Зарегистрироваться</button>
        </form>
        
        <div className="login__redirection">
          <p className="login__point">Уже зарегистрированы?</p>
          <Link to="/signin" className="login__link">Войти</Link>
        </div>
    </div>
  )
}

export default Register;