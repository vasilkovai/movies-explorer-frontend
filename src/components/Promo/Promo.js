import React from 'react';
import Header from '../Header/Header';
import promoLogo from './../../images/logo_promo.png';
import './Promo.css';

function Promo() {
  return (
    <div className="promo">
      <Header />
      <div className="promo__container">
        <div className="promo__text">
          <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
          <p className="promo__paragraph">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
        </div>
        <img className="promo__logo" alt="Логотип" src={promoLogo}/>
        <a className="promo__about" href="#about=project">Узнать больше</a>
      </div>
    </div>
  );
}

export default Promo;