import React from 'react';
import { Route, Link } from 'react-router-dom';
import { MOVIES_URL } from '../../utils/constans';
import './MoviesCard.css';

function MoviesCard({movie, onSaveMovie, onMovieDelete}) {
  function handleSaveClick() {
    onSaveMovie(movie);
  }

  function handleDeleteClick() {
    onMovieDelete(movie)
  }

  function getDuration(mins) {
    let hours = Math.trunc(mins/60);
    let minutes = mins % 60;

    return hours + 'ч' + minutes + 'м';
  };

  return (
    <li className="card">
      <Link
        to={{pathname: movie.trailerLink}}
        target="_blank"
        aria-label={`Открыть трейлер фильма ${movie.nameRU}`}>
        <img className="card__img" alt="Постер фильма" src={`${MOVIES_URL}${movie.image.url}`} />
      </Link>
        <div className="card__description"> 
          <div className="card__items">
            <h2 className="card__title">{movie.nameRU}</h2>
            <Route exact path="/movies" >
            <button type="button" className="card__save-btn" onClick={handleSaveClick}></button>
            </Route>
            <Route exact path="/saved-movies" >
            <button type="button" className="card__save-btn_delete" onClick={handleDeleteClick}></button>
            </Route>
          </div>
          <p className="card__time">{getDuration(movie.duration)}</p>
        </div>
      
    </li>
    
  );
}

export default MoviesCard;