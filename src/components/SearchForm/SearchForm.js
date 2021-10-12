import React from 'react';
import './SearchForm.css';

function SearchForm({onSubmit}) {

  const [movieValue, setMovieValue] = React.useState("");

  function handleMovieChange(e) {
    setMovieValue(e.target.value);
  }

  React.useEffect(() => {
    setMovieValue("")
  }, [onSubmit])
  return (
    <div className="search">
      <form className="search__form">
        <input 
          type="text"
          placeholder="Фильм"
          className="search__input"
          required
          value={movieValue} 
          onChange={handleMovieChange}
        />
        <button className="search__button"></button>
      </form>
    </div>
  );
}

export default SearchForm;