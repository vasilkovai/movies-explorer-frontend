import React from 'react';
import './SearchForm.css';

function SearchForm() {
  return (
    <div className="search">
      <form className="search__form">
        <input 
          type="text"
          placeholder="Фильм"
          className="search__input"
          required
        />
        <button className="search__button"></button>
      </form>
    </div>
  );
}

export default SearchForm;