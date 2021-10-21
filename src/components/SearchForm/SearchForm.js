import React from 'react';
import './SearchForm.css';

function SearchForm({onSubmit}) {
  const [movieValue, setMovieValue] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');

  React.useEffect(() => {
    setErrorMessage('');
  }, [movieValue]);

  function handleMovieChange(e) {
    setMovieValue(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if(!movieValue) {
      setErrorMessage('Нужно ввести ключевое слово.');
      return;
    }

    onSubmit(movieValue);
  }

  React.useEffect(() => {
    setMovieValue('')
  }, [onSubmit])

  return (
    <div className="search">
      <form className="search__form" onSubmit={handleSubmit} noValidate>
        <input 
          type="text"
          placeholder="Фильм"
          className="search__input"
          required
          onChange={handleMovieChange}
          value={movieValue || ''}
        />
        <button className="search__button"></button>
        <p className="search__error">{errorMessage}</p>
      </form>
    </div>
  );
}

export default SearchForm;