import React from 'react';
import './Popup.css'

function Popup({isOpen, onClose}) {


  return (
    <div className={`popup ${isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <button type="button" className="popup__close-button" aria-label="Закрыть" onClick={onClose} />
        <p className="popup__text">Ошибка при добавлении карточки ☹️</p>
      </div>
    </div>
  );
}

export default Popup;