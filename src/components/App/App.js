import React from 'react';
import { Route, Redirect, Switch, useHistory } from 'react-router-dom';
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
  const [isLoading, setIsLoading] = React.useState(false);
  const [isCheckingToken, setIsCheckingToken] = React.useState(true);
  const [message, setMessage] = React.useState({
    searchForm: null,
  });
  const [isRequestStatus, setIsRequestStatus] = React.useState('');
  const [isRequestLoginStatus, setIsRequestLoginStatus] = React.useState('');
  const [isRequestRegisterStatus, setIsRequestRegisterStatus] = React.useState('');
  const history = useHistory();
  
  // get user content
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
    }
  }, [loggedIn])

  React.useEffect(() => { 
    mainApi
      .getSavedMovies()
      .then((res) => { 
        setSavedMovies(res.data.filter((movie) => movie.owner === currentUser._id))
        localStorage.setItem('savedMovies', JSON.stringify(res.data));
      })
      .catch(error => { 
        console.error(error)
      })

  }, [currentUser])

  React.useEffect(() => { 
      mainApi 
        .getUserInfo() 
        .then((res) => { 
          setLoggedIn(true) 
        }) 
        .catch(error => { 
          console.error(error)
        }) 
        .finally(() => {
          setIsCheckingToken(false);
        })
  }, [loggedIn])

  // auth
  const handleRegister = ({name, password, email}) => { 
    mainApi 
      .register(name, password, email) 
      .then((res) => { 
        handleLogin({email, password})
        history.push('/movies')
      })
      .catch((err) => { 
        if (err === '409') {
          setIsRequestRegisterStatus('Пользователь с таким email уже существует.');
        } else {
          setIsRequestRegisterStatus('При регистрации профиля произошла ошибка.');
        }
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
      .catch((err) => { 
        if (err === '401') {
          setIsRequestLoginStatus('Вы ввели неправильный логин или пароль.');
        } else if (err === '400') {
          setIsRequestLoginStatus('Введите корректные данные.');
        } else {
          setIsRequestLoginStatus('При авторизации произошла ошибка.');
        }
      })
  }

  const handleSignOut = () => {
    mainApi
      .signOut()
      .then(() => {
        setLoggedIn(false)
        localStorage.removeItem('jwt')
        history.push('/signin')
      })
      .catch(error => { 
        console.error(error)
      })
  }

  // edit profile
  const handleUpdateUser = (user) => {
    mainApi
      .setUserInfo(user)
      .then((user) => {
        setCurrentUser(user.data)
      })
      .catch((err) => { 
        if (err === '409') {
          setIsRequestStatus('Пользователь с таким email уже существует.');
        } else {
          setIsRequestStatus('При обновлении профиля произошла ошибка.');
        }
      })
    }

  // search movies
  const searchMovies = (name) => {
    const beatFilmMovies = JSON.parse(localStorage.getItem('beatFilmMovies'));
    const foundMovies = beatFilmMovies.filter((c) => c.nameRU.toLowerCase().includes(name.toLowerCase()));
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
        .then((res) => {
          localStorage.setItem('beatFilmMovies', JSON.stringify(res.data));
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

  const handleSearchSavedMovies = (name) => {
    const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
    const foundSavedMovies = savedMovies.filter(
      (c) => c.nameRU.toLowerCase().includes(name.toLowerCase()));
    if (foundSavedMovies.length === 0) {
      setMessage({
        searchForm: 'Ничего не найдено',
      });
    } else {
      setSavedMovies(foundSavedMovies);
      setMessage({
        searchForm: '',
      });
    }
  }

  // save/delete movies
  const handleSaveMovie= (movie) => {
    mainApi
      .saveMovie(movie)
      .then((newMovie) => {
        setSavedMovies([newMovie.data, ...savedMovies])
        localStorage.setItem('savedMovies', JSON.stringify([newMovie.data, ...savedMovies]));
      })
      .catch(error => { 
        console.error(error)
      })
  }

  const handleMovieDelete = (movie) => {
    const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
    mainApi
      .deleteSavedMovie(movie._id)
      .then(() => {
        setSavedMovies((state) => state.filter((c) => c._id !== movie._id));
        const newSavedMovies = savedMovies.filter(
          (c) => c._id !== movie._id,
        );
        localStorage.setItem('savedMovies', JSON.stringify(newSavedMovies));
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
          path="/movies"
          component={Movies}
          loggedIn={loggedIn}
          movies={movies}
          onSubmit={handleSearchMovies}
          onSaveMovie={handleSaveMovie}
          message={message}
          isLoading={isLoading}
          savedMovies={savedMovies}
          isCheckingToken={isCheckingToken}
          onMovieDelete={handleMovieDelete}

        />
        <ProtectedRoute
          path="/saved-movies"
          component={SavedMovies}
          loggedIn={loggedIn} 
          movies={savedMovies}
          onSubmit={handleSearchSavedMovies}
          onMovieDelete={handleMovieDelete}
          message={message}
          isCheckingToken={isCheckingToken}
        />
        <ProtectedRoute
          path="/profile"
          component={Profile}
          loggedIn={loggedIn} 
          signOut={handleSignOut}
          onUpdateUser={handleUpdateUser}
          errorMessage={isRequestStatus}
          isCheckingToken={isCheckingToken}
        />
        <Route path="/signin">
          {loggedIn 
            ? <Redirect to="/" />
            : <Login 
              handleLogin={handleLogin}
              errorMessage={isRequestLoginStatus}
            />
          }
        </Route>
        <Route path="/signup">
          {loggedIn 
              ? <Redirect to="/" />
              : <Register 
              handleRegister={handleRegister}
              errorMessage={isRequestRegisterStatus}
              />
            }
        </Route>
        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
    </CurrentUserContext.Provider>
  );
}

export default App;
