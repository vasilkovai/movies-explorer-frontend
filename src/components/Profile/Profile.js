import React from 'react';
import Header from '../Header/Header';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './Profile.css';
import '../Login/Login.css';
import useFormWithValidation from "../../hooks/useFormWithValidation";

function Profile({
  onUpdateUser, 
  signOut, 
  loggedIn, 
  responseMessage,
}) {
  const { 
    values, 
    isValid, 
    errors,
    handleChange, 
    resetForm,
    setValues,
  } = useFormWithValidation();
  const [isEdit, setIsEdit] = React.useState(false)
  const currentUser = React.useContext(CurrentUserContext);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onUpdateUser(values);
    setIsEdit(false)
  };

  function handleEditClick() {
    resetForm({ 
      name: currentUser.name, 
      email: currentUser.email 
    });
    setIsEdit(true)
  }

  React.useEffect(() => {
    setValues({
      name: currentUser.name,
      email: currentUser.email,
    });
  }, [setValues, currentUser]);

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
                value={values.name || ''}
                onChange={handleChange}
                disabled={!isEdit}
                required
                minLength="2"
                maxLength="30"
              />
              <span className={`${errors.name ? "profile__input-error" : null}`}>{errors.name}</span>
            </fieldset>

            <fieldset className="profile__field">
              <label className="profile__label" htmlFor="email">E-mail</label>
              <input 
                className="profile__input"
                id="email" 
                name="email" 
                type="email" 
                autoComplete="off"
                value={values.email || ''}
                onChange={handleChange}
                disabled={!isEdit}
                required
              />
              <span className={`${errors.email ? "profile__input-error" : null}`}>{errors.email}</span>
            </fieldset>
            {!isEdit 
            ? <span className="profile__request-error">{responseMessage}</span>
            : ''}
            { isEdit ? (
              <button 
                type="submit" 
                className={`login__submit ${!isValid && "login__submit_inactive"}`}
                disabled={!isValid && true}
              >Сохранить
              </button>
            ) : 
            (
              <div className="profile__actions">
                <button onClick={handleEditClick} type="submit" className="profile__edit-btn">Редактировать</button>
                <button type="button" className="profile__logout" onClick={signOut}>Выйти из аккаунта</button>
              </div>
            )
            }
          </form>
          
        </div>
      </div>
    </div>
  );
}

export default Profile;