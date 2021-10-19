import React from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoreButton from '../MoreButton/MoreButton';
import './SavedMovies.css';

import { useWindowSize } from '../../hooks/useWindowSize';
import { getCardsRender } from '../../utils/cardsRender';

function SavedMovies({
  movies, 
  onMovieDelete, 
  message, 
  loggedIn, 
  onSubmit,
}) {
  const [isShortMovies, setIsShortMovies] = React.useState(false);
  const [moreBtnVisibility, setMoreBtnVisibility] = React.useState(false);
  const [amountCards, setAmountCards] = React.useState({total: 12, add: 3});

  const { width } = useWindowSize();

  //checkbox
  const filterSavedMovies = !isShortMovies ? movies : movies.filter(
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
    if (filterSavedMovies.length > amountCards.total) {
      setMoreBtnVisibility(true);
    } else {
      setMoreBtnVisibility(false);
    }
  }, [filterSavedMovies, amountCards])

  return (
    <div className="saved-movies">
      <Header loggedIn={loggedIn}/>
      <SearchForm 
        onSubmit={onSubmit}
      />
      <FilterCheckbox 
        isShortMovies={isShortMovies}
        showShortMovies={handleShortMovies}
      />
      <MoviesCardList
        movies={filterSavedMovies}
        onMovieDelete={onMovieDelete}
        message={message}
        amount={amountCards.total}
      />
      <MoreButton 
        onMoreBtn={handleMoreBtn}
        isVisible={moreBtnVisibility}
      />
    </div>
  );
}

export default SavedMovies;