import React from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoreButton from '../MoreButton/MoreButton';
import Footer from '../Footer/Footer'
import './Movies.css';

function Movies({movies, onSubmit, onSaveMovie, loggedIn, message, isLoading}) {

  return (
    <div className="movies">
      <Header loggedIn={loggedIn}/>
      <SearchForm 
        onSubmit={onSubmit}
      />
      <FilterCheckbox />
      <MoviesCardList 
        movies={movies}
        onSaveMovie={onSaveMovie}
        message={message}
        isLoading={isLoading}
      />
      <MoreButton />
      <Footer />
    </div>
  );
}

export default Movies;