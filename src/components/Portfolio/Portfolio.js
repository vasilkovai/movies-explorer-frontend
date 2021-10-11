import React from 'react';
import './Portfolio.css';

function Portfolio() {
  return (
    <div className="portfolio">
      <h4 className="portfolio__title">Портфолио</h4>
      <div className="portfolio__container">
        <a href="https://github.com/vasilkovai/how-to-learn" className="portfolio__link" target="_blank" rel="noreferrer">
          <p className="portfolio__text">Статичный сайт</p>
          <p className="portfolio__icon">↗</p>
        </a>
        <a href="https://github.com/vasilkovai/russian-travel" className="portfolio__link" target="_blank" rel="noreferrer">
          <p className="portfolio__text">Адаптивный сайт</p>
          <p className="portfolio__icon">↗</p>
        </a>
        <a href="https://github.com/vasilkovai/react-mesto-api-full" className="portfolio__link" target="_blank" rel="noreferrer">
          <p className="portfolio__text">Одностраничное приложение</p>
          <p className="portfolio__icon">↗</p>
        </a>
      </div>
    </div>
  );
}

export default Portfolio;