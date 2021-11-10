import { MOVIES_API } from './constans';

class MoviesApi {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkStatus(res) {
    return res.ok
     ? res.json() 
     : Promise.reject(`${res.status}`);
  }

  getMovies() {
    return fetch(`${this._baseUrl}`, {
      method: 'GET',
      headers: this._headers,
    })
    .then(this._checkStatus)
  }
}

const moviesApi = new MoviesApi({
  baseUrl: MOVIES_API,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default moviesApi;