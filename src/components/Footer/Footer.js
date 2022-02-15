import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <div className="footer">

      <h3 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h3>
      <div className="footer__container">
        <p className="footer__copyright">©{new Date().getFullYear()}</p>
        <ul className="footer__links">
          <li className="footer__link-list"><a className="footer__link" href="https://practicum.yandex.ru" target="_blank" rel="noreferrer">Яндекс.Практикум</a></li>
          <li className="footer__link-list"><a href="https://github.com/vasilkovai" className="footer__link" target="_blank" rel="noreferrer">Github</a></li>
          <li className="footer__link-list"><a href="https://www.linkedin.com/in/vasilkovai/" className="footer__link" target="_blank" rel="noreferrer">LinkedIn</a></li>
        </ul>
      </div>
    </div>
  );
}

export default Footer;