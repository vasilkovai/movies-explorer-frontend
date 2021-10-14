import React from 'react';
import Header from '../Header/Header';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './Profile.css';

function Profile({onUpdateUser, signOut, loggedIn}) {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');

  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);

  }, [currentUser]); 

  function handleChangeName(e) {
    setName(e.target.value)
  }
  
  function handleChangeEmail(e) {
    setEmail(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();
  
    onUpdateUser({
      name: name,
      email: email,
    });
  }

  return (
    <div className="profile">
      <Header loggedIn={loggedIn}/>
      <div className="profile__container">
        <h2 className="profile__title">Привет, {currentUser.name}!</h2>
        <div className="profile__info">
          <form className="profile__form" onSubmit={handleSubmit}>
            <fieldset className="profile__field">
              <label className="profile__label" htmlFor="name">Имя</label>
              <input 
                className="profile__input"
                id="name" 
                name="name" 
                type="text" 
                autoComplete="off"
                value={name || ''}
                onChange={handleChangeName}
              />
            </fieldset>

            <fieldset className="profile__field">
              <label className="profile__label" htmlFor="email">E-mail</label>
              <input 
                className="profile__input"
                id="email" 
                name="email" 
                type="email" 
                autoComplete="off"
                value={email || ''}
                onChange={handleChangeEmail}
              />
            </fieldset>
            <div className="profile__actions">
              <button type="submit" className="profile__edit-btn">Редактировать</button>
              <button type="button" className="profile__logout" onClick={signOut}>Выйти из аккаунта</button>
            </div>
          </form>
          
        </div>
      </div>
    </div>
  );
}

export default Profile;