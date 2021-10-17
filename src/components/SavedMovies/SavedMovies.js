import React from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoreButton from '../MoreButton/MoreButton';
import './SavedMovies.css';

function SavedMovies({
  movies, 
  onMovieDelete, 
  message, 
  loggedIn, 
  savedMovies, 
  isShortMovies, 
  showShortMovies,
  onSubmit,
  onMoreBtn,
  moreBtnVisibility,
  amount,
}) {
  return (
    <div className="saved-movies">
      <Header loggedIn={loggedIn}/>
      <SearchForm 
        onSubmit={onSubmit}
      />
      <FilterCheckbox 
        isShortMovies={isShortMovies}
        showShortMovies={showShortMovies}
      />
      <MoviesCardList
        movies={movies}
        onMovieDelete={onMovieDelete}
        message={message}
        savedMovies={savedMovies}
        amount={amount}
      />
      <MoreButton 
        onMoreBtn={onMoreBtn}
        isVisible={moreBtnVisibility}
      />
    </div>
  );
}

export default SavedMovies;