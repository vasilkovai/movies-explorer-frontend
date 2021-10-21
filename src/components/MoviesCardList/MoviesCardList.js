import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

function MoviesCardList({movies, message, onSaveMovie, onMovieDelete, savedMovies, amount}) {
  return (
    <div className="cards">
      { message ? (
        <span className="cards__error">{message}</span>) : (
        <ul className="cards__list">
          {movies.slice(0, amount).map(movie => {
            return (
              <MoviesCard 
                key={movie.id ? movie.id : movie.movieId} 
                movie={movie}
                savedMovies={savedMovies}
                onSaveMovie={onSaveMovie}
                onMovieDelete={onMovieDelete}
              />)
              }
            )
          }
        </ul>
      )}
    </div>
  );
}

export default MoviesCardList;