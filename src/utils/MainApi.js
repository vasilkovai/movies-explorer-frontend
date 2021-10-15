import { MOVIES_URL } from './constans';
import { MAIN_API } from './constans';

class MainApi {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkStatus(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    }
  }

  register(name, password, email) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({name, password, email})
    })
    .then(this._checkStatus)
  }; 

  login(password, email) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({password, email})
    })
    .then(this._checkStatus)
  };

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers,
      credentials: 'include',
    })
    .then(this._checkStatus)
  };

  setUserInfo(user) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        name: user.name,
        email: user.email,
      })
    })
    .then(this._checkStatus)
  }

  signOut() {
    return fetch(`${this._baseUrl}/signout`, {
      method: "DELETE",
      headers: this._headers,
      credentials: "include",
    })
    .then(this._checkStatus)
  };

  getSavedMovies() {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'GET',
      headers: this._headers,
      credentials: 'include',
    })
    .then(this._checkStatus)
  }

  saveMovie(movie) {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: `${MOVIES_URL}${movie.image.url}`,
        trailer: movie.trailerLink,
        thumbnail: `${MOVIES_URL}${movie.image.formats.thumbnail.url}`,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
        movieId: movie.id,
      }),
    })
    .then(this._checkStatus)
  }

  deleteSavedMovie(movieId) {
    return fetch(`${this._baseUrl}/movies/${movieId}`, {
      method: 'DELETE',
      headers: this._headers,
      credentials: 'include',
    })
    .then(this._checkStatus)
  }
}

const mainApi = new MainApi({
  baseUrl: MAIN_API,
  headers: {
    'Accept': "application/json",
    'Content-Type': 'application/json',
    "Authorization" : `Bearer ${localStorage.getItem('jwt')}`
  },
});

export default mainApi;