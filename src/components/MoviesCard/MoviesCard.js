import React from 'react';
import './MoviesCard.css';

function MoviesCard() {

  return (
    <div className="card">
      <div className="card__img"></div>
      <div className="card__description"> 
        <div className="card__items">
          <h2 className="card__title">33 слова о дизайне</h2>
          <button className="card__save-btn"></button>
        </div>
        <p className="card__time">1ч42м</p>
      </div>
    </div>
  );
}

export default MoviesCard;