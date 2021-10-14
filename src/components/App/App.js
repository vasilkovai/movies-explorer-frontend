import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import PageNotFound from '../PageNotFound/PageNotFound';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import mainApi from '../../utils/MainApi';
import moviesApi from '../../utils/MovieApi';

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [movies, setMovies] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [message, setMessage] = React.useState({
    searchForm: null,
  });
  const [isLoading, setIsLoading] = React.useState(false);
  const history = useHistory(); 
  

  React.useEffect(() => { 
    if (loggedIn) { 
      mainApi 
        .getUserInfo() 
        .then((user) => { 
          setCurrentUser(user.data)
        }) 
        .catch(error => { 
          console.error(error)
        })
      mainApi
        .getSavedMovies()
        .then((movie) => { 
          setSavedMovies(movie.data)
        })
        .catch(error => { 
          console.error(error)
        })
    }
  }, [loggedIn])

  React.useEffect(() => { 
    checkToken() 
  }, []) 

  function checkToken() { 
    const jwt = localStorage.getItem('jwt') 
    if (jwt) { 
      mainApi 
        .getUserInfo(jwt) 
        .then((res) => { 
          setLoggedIn(true) 
        }) 
        .catch(error => { 
          console.error(error)
        }) 
    } 
  } 

  React.useEffect(() => { 
    if (loggedIn) { 
      history.push('/movies')
    } 
  }, [history, loggedIn])

  const handleUpdateUser = (user) => {
    mainApi
      .setUserInfo(user)
      .then((user) => {
        setCurrentUser(user.data)
      })
      .catch(error => console.log(error))
  }

  const handleRegister = ({name, password, email}) => { 
    mainApi 
      .register(name, password, email) 
      .then(() => { 
        history.push('/signin')
      })
      .catch(error => { 
        console.log(error) 
      })   
  } 

  const handleLogin = ({password, email}) => { 
    mainApi 
      .login(password, email) 
      .then((res) => { 
        setLoggedIn(true) 
        localStorage.setItem('jwt', res.token) 
        history.push('/movies') 
      }) 
      .catch(error => { 
        console.log(error) 
      }) 
  }

  const handleSignOut = () => {
    mainApi
      .signOut()
      .then(() => {
        localStorage.removeItem('jwt')
        setLoggedIn(false)
        history.push('/signin')
      })
      .catch(error => { 
        console.error(error)
      })
  }

  const searchMovies = (name) => {
    const beatFilmMovies = JSON.parse(localStorage.getItem('beatFilmMovies'));
    const foundMovies = beatFilmMovies.filter(
      (c) => c.nameRU.toLowerCase().includes(name.toLowerCase()),
    );
    if (foundMovies.length === 0) {
      setMessage({
        searchForm: 'Ничего не найдено',
      });
    } else {
      setMovies(foundMovies);
      localStorage.setItem('searchMovies', JSON.stringify(foundMovies));
      setMessage({
        searchForm: '',
      });
    }
  };

  const handleSearchMovies = (name) => {
    const beatFilmMovies = JSON.parse(localStorage.getItem('beatFilmMovies'));
    if (!beatFilmMovies) {
      setIsLoading(true);
      moviesApi
        .getMovies()
        .then((data) => {
          localStorage.setItem('beatFilmMovies', JSON.stringify(data));
          setIsLoading(false);
        })
        .then(() => {
          searchMovies(name);
        })
        .catch(error => { 
          console.error(error)
        })
        .finally(() => setIsLoading(false));
    } else {
      searchMovies(name);
    }
  };

  const handleMovieDelete = (movie) => {
    mainApi
      .deleteSavedMovie(movie._id)
      .then(() => {
        setSavedMovies(savedMovies.filter((movie) => movie.movieId !== movie._id))
      })
      .catch(error => { 
        console.error(error)
      })
  }

  const handleSaveMovie= (movie) => {
    mainApi
      .saveMovie(movie)
      .then((newMovie) => {
        setSavedMovies([newMovie.data, ...savedMovies])
      })
      .catch(error => { 
        console.error(error)
      })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Switch>
        <Route exact path="/">
          <Main 
            loggedIn={loggedIn}
          />
        </Route>
        <ProtectedRoute
          exact path="/movies"
          component={Movies}
          loggedIn={loggedIn}
          movies={movies}
          onSubmit={handleSearchMovies}
          onSaveMovie={handleSaveMovie}
          message={message}
          isLoading={isLoading}
        />
        <ProtectedRoute
          exact path="/saved-movies"
          component={SavedMovies}
          loggedIn={loggedIn} 
          movies={savedMovies}
          onMovieDelete={handleMovieDelete}
          message={message}
        />
        <ProtectedRoute
          exact path="/profile"
          component={Profile}
          loggedIn={loggedIn} 
          signOut={handleSignOut}
          onUpdateUser={handleUpdateUser}
        />
        <Route path="/signin">
          <Login handleLogin={handleLogin}/>
        </Route>
        <Route path="/signup">
          <Register handleRegister={handleRegister}/>
        </Route>
        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
    </CurrentUserContext.Provider>
  );
}

export default App;
