import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

function MoviesCardList({movies, message, onSaveMovie, onMovieDelete, savedMovies, amount}) {
  return (
    <div className="cards">
      { message.searchForm ? (
        <span className="cards__error">{message.searchForm}</span>) : (
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