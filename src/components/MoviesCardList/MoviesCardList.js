import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

function MoviesCardList({movies, message, onSaveMovie, onMovieDelete}) {
  return (
    <div className="cards">
      { message.searchForm ? (
        <span className="cards__error">{message.searchForm}</span>) : (
        <ul className="cards__list">
          {movies.map(movie => {
            return (
              <MoviesCard 
                key={movie.id} 
                movie={movie}
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