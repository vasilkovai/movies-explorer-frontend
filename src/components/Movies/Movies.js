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
  showShortMovies,
  isShortMovies,
  onMoreBtn,
  moreBtnVisibility,
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
      showShortMovies={showShortMovies}
      isShortMovies={isShortMovies}
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
      <MoreButton 
        onMoreBtn={onMoreBtn}
        isVisible={moreBtnVisibility}
      />
      <Footer />
    </div>
  );
}

export default Movies;