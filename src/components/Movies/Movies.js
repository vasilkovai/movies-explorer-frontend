import React from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import Preloader from '../Preloader/Preloader'
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoreButton from '../MoreButton/MoreButton';
import './Movies.css';
import '../MoviesCardList/MoviesCardList.css'

import { useWindowSize } from '../../hooks/useWindowSize';
import { getCardsRender } from '../../utils/cardsRender';

function Movies({
  movies,
  onSubmit,
  onSaveMovie,
  loggedIn,
  message,
  isLoading,
  savedMovies,
  onMovieDelete,
  isSearchDone
}) {
  const [isShortMovies, setIsShortMovies] = React.useState(false);
  const [moreBtnVisibility, setMoreBtnVisibility] = React.useState(false);
  const [amountCards, setAmountCards] = React.useState({total: 12, add: 3});

  const { width } = useWindowSize();

  //checkbox
  const filterMovies = !isShortMovies ? movies : movies.filter(
    (movie) => movie.duration <= 40,
  )

  function handleShortMovies() {
    if (!isShortMovies) {
      setIsShortMovies(true)
    } else {
      setIsShortMovies(false);
    }
  }

  // render cards
  React.useEffect (() => {
    setAmountCards(getCardsRender(width))
  }, [width])

  const handleMoreBtn = () => {
    return setAmountCards({
      ...amountCards,
      total: amountCards.total + amountCards.add,
    });
  };

  React.useEffect(() => { 
    if (filterMovies.length > amountCards.total) {
      setMoreBtnVisibility(true);
    } else {
      setMoreBtnVisibility(false);
    }
  }, [filterMovies, amountCards])
  
  return (
    <div className="movies">
      <Header 
        loggedIn={loggedIn}
      />
      <SearchForm 
        onSubmit={onSubmit}
      />
      <FilterCheckbox 
      showShortMovies={handleShortMovies}
      isShortMovies={isShortMovies}
      />
      {isLoading 
      ? (<Preloader />) 
      : isSearchDone
      ? filterMovies.length > 0
      ? (<MoviesCardList 
          movies={filterMovies}
          message={message}
          onSaveMovie={onSaveMovie}
          savedMovies={savedMovies}
          onMovieDelete={onMovieDelete}
          amount={amountCards.total}
        />)
      : (<span className="movies__error">Ничего не найдено.</span>)
      : ('')
      }
      <MoreButton 
        onMoreBtn={handleMoreBtn}
        isVisible={moreBtnVisibility}
      />
    </div>
  );
}

export default Movies;