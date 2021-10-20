import React from 'react';
import { Route, Link } from 'react-router-dom';
import { MOVIES_URL } from '../../utils/constans';
import './MoviesCard.css';
import getDuration from '../../utils/getDuration';

function MoviesCard({movie, onSaveMovie, onMovieDelete, savedMovies}) {

  const isSaved = movie.id && savedMovies.some(m => m.movieId === movie.id);

  const cardLikeButtonClassName = (
    `card__save-btn ${isSaved ? 'card__save-btn_active' : 'card__save-btn'}`
  );

  function handleSaveClick() {
    if (isSaved) {
      onMovieDelete(savedMovies.filter((m) => m.movieId === movie.id)[0]);
    } else if (!isSaved) {
      onSaveMovie(movie);
    }
  }

  function handleDeleteClick() {
    onMovieDelete(movie)
  }

  return (
    <li className="card">
      <Route path='/movies'>
      <Link
        to={{pathname: movie.trailerLink}}
        target="_blank"
        aria-label={`Открыть трейлер фильма ${movie.nameRU}`}>
        <img className="card__img" alt="Постер фильма" src={`${MOVIES_URL}${movie.image.url}`} />
      </Link>
      </Route>
      <Route path='/saved-movies'>
      <Link
        to={{pathname: movie.trailer}}
        target="_blank"
        aria-label={`Открыть трейлер фильма ${movie.nameRU}`}>
        <img className="card__img" alt="Постер фильма" src={movie.image} />
      </Link>
      </Route>
        <div className="card__description"> 
          <div className="card__items">
            <h2 className="card__title">{movie.nameRU}</h2>
            <Route exact path="/movies" >
            <button type="button" className={cardLikeButtonClassName} onClick={handleSaveClick}></button>
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