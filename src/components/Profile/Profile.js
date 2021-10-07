import React from 'react';
import Header from '../Header/Header';
import './Profile.css';

function Profile() {
  return (
    <div className="profile">
      <Header />
      <div className="profile__container">
        <h2 className="profile__title">Привет, Ирина!</h2>
        <div classname="profile__info">
          <form className="profile__form">
            <fieldset className="profile__field">
              <label className="profile__label" htmlFor="name">Имя</label>
              <input 
                className="profile__input"
                id="name" 
                name="name" 
                type="text" 
                autoComplete="off"
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
              />
            </fieldset>
          </form>
          <div className="profile__actions">
            <button className="profile__edit-btn">Редактировать</button>
            <button className="profile__logout">Выйти из аккаунта</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;