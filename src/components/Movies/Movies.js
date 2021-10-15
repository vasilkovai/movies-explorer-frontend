import React from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import Preloader from '../Preloader/Preloader'
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoreButton from '../MoreButton/MoreButton';
import Footer from '../Footer/Footer'
import './Movies.css';

function Movies({
  movies,
  onSubmit,
  onSaveMovie,
  loggedIn,
  message,
  isLoading,
  savedMovies,
  onMovieDelete,
}) {
  

  return (
    <div className="movies">
      <Header 
        loggedIn={loggedIn}
      />
      <SearchForm 
        onSubmit={onSubmit}
      />
      <FilterCheckbox 
      />
      {isLoading ? 
        (<Preloader />) :
        (<MoviesCardList 
          movies={movies}
          message={message}
          onSaveMovie={onSaveMovie}
          savedMovies={savedMovies}
          onMovieDelete={onMovieDelete}
        />)
      }
      <MoreButton movies={movies}/>
      <Footer />
    </div>
  );
}

export default Movies;