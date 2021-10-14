import React from 'react';
import './SearchForm.css';

function SearchForm({onSubmit}) {
  const [movieValue, setMovieValue] = React.useState('');

  function handleMovieChange(e) {
    setMovieValue(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onSubmit(movieValue);
  }

  React.useEffect(() => {
    setMovieValue('')
  }, [onSubmit])

  return (
    <div className="search">
      <form className="search__form" onSubmit={handleSubmit}>
        <input 
          type="text"
          placeholder="Фильм"
          className="search__input"
          required
          onChange={handleMovieChange}
          value={movieValue}
        />
        <button className="search__button"></button>
      </form>
    </div>
  );
}

export default SearchForm;