import React from 'react';
import { Route } from 'react-router-dom';
import cardImage from './../../images/film1.svg';
import './MoviesCard.css';

function MoviesCard() {

  return (
    <div className="card">
      <Route exact path="/movies" >
        <img className="card__img" alt="Постер фильма" src={cardImage}/>
        <div className="card__description"> 
          <div className="card__items">
            <h2 className="card__title">33 слова о дизайне</h2>
            <button className="card__save-btn"></button>
          </div>
          <p className="card__time">1ч42м</p>
        </div>
      </Route>
      <Route exact path="/saved-movies" >
        <img className="card__img" alt="Постер фильма" src={cardImage}/>
        <div className="card__description"> 
          <div className="card__items">
            <h2 className="card__title">33 слова о дизайне</h2>
            <button className="card__save-btn_delete"></button>
          </div>
          <p className="card__time">1ч42м</p>
        </div>
      </Route>
    </div>
    
  );
}

export default MoviesCard;