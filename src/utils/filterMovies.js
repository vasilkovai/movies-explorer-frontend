function filterMovies(movies, query, checkboxStatus) {
  let moviesToFilter = movies;
  let result;

  if (checkboxStatus) {
    moviesToFilter = moviesToFilter.filter((movie) => movie.duration <= 40);
  }

  result = moviesToFilter.filter((movie) => {
    return movie.nameRU.toLowerCase().indexOf(query.toLowerCase()) !== -1;
  })
  return result;
}

export default filterMovies;