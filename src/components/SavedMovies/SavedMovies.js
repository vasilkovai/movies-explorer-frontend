import React from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoreButton from '../MoreButton/MoreButton';
import Footer from '../Footer/Footer'
import './SavedMovies.css';

function SavedMovies() {
  return (
    <div className="saved-movies">
      <Header />
      <SearchForm />
      <FilterCheckbox />
      <MoviesCardList />
      <MoreButton />
      <Footer />
    </div>
  );
}

export default SavedMovies;