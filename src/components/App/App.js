import React from 'react';
import { Route, Redirect, Switch, useHistory } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Preloader from '../Preloader/Preloader';
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
  const [moreBtnVisibility, setMoreBtnVisibility] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isCheckingToken, setIsCheckingToken] = React.useState(true);
  const [isShortMovies, setIsShortMovies] = React.useState(false);
  const [message, setMessage] = React.useState({
    searchForm: null,
  });
  const [amountCards, setAmountCards] = React.useState({
    startCards: 0,
    rowCards: 0,
    moreCards: 0,
  });
  const [isRequestStatus, setIsRequestStatus] = React.useState('');
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
      mainApi
        .getSavedMovies()
        .then((movie) => { 
          setSavedMovies(movie.data)
          localStorage.setItem('savedMovies', JSON.stringify(movie.data));
        })
        .catch(error => { 
          console.error(error)
        })
    }
  }, [loggedIn])

  React.useEffect(() => {
    const localMovies = JSON.parse(localStorage.getItem('foundMovies'));
    if (localMovies !== null && loggedIn) {
      setMovies(localMovies);
    }
  }, [loggedIn]);

  React.useEffect(() => { 
    const jwt = localStorage.getItem('jwt') 
    if (jwt) { 
      mainApi 
        .getUserInfo(jwt) 
        .then((res) => { 
          setLoggedIn(true) 
          setIsCheckingToken(false)
        }) 
        .catch(error => { 
          console.error(error)
          setIsCheckingToken(false);
        }) 
    } 
  }, [])

  // auth
  const handleRegister = ({name, password, email}) => { 
    mainApi 
      .register(name, password, email) 
      .then(() => { 
        history.push('/signin')
      })
      .catch((err) => { 
        if (err === '409') {
          setIsRequestStatus('Пользователь с таким email уже существует.');
        } else {
          setIsRequestStatus('При регистрации профиля произошла ошибка.');
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
          setIsRequestStatus('Вы ввели неправильный логин или пароль.');
        } else if (err === '400') {
          setIsRequestStatus('Введите корректные данные.');
        } else {
          setIsRequestStatus('При авторизации произошла ошибка.');
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

  // checkbox
  const filterMovies = !isShortMovies ? movies : movies.filter(
    (movie) => movie.duration <= 40,
  )

  const filterSavedMovies = !isShortMovies ? savedMovies : savedMovies.filter(
    (movie) => movie.duration <= 40,
  )

  function handleShortMovies() {
    if (!isShortMovies) {
      setIsShortMovies(true)
    } else {
      setIsShortMovies(false);
    }
  }

  // show "more" cards
  React.useEffect(() => {
    limitAmountCards();
  }, []);

  function limitAmountCards() {
    const viewportWidth = window.screen.width;
    if (viewportWidth <= 480 ) {
      setAmountCards({ startCards: 5, rowCards: 1, moreCards: 2 });
    } else if (viewportWidth <= 768) {
      setAmountCards({ startCards: 8, rowCards: 2, moreCards: 2 });
    } else {
      setAmountCards({ startCards: 12, rowCards: 3, moreCards: 3 });
    }
  }

  const handleMoreBtn = () => {
    return setAmountCards({
      ...amountCards,
      startCards: amountCards.startCards + amountCards.moreCards,
    });
  };

  React.useEffect(() => { 
    if (filterMovies.length > amountCards.startCards) {
      setMoreBtnVisibility(true);
    } else {
      setMoreBtnVisibility(false);
    }
  }, [filterMovies, amountCards])

  React.useEffect(() => { 
    if (filterSavedMovies.length > amountCards.startCards) {
      setMoreBtnVisibility(true);
    } else {
      setMoreBtnVisibility(false);
    }
  }, [filterSavedMovies, amountCards])

  window.addEventListener("resize", function () {
    setTimeout(() => {
      limitAmountCards();
    }, 250);
  });

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
            isCheckingToken={isCheckingToken}
          />
        </Route>
        <ProtectedRoute
          path="/movies"
          component={Movies}
          loggedIn={loggedIn}
          movies={filterMovies}
          onSubmit={handleSearchMovies}
          onSaveMovie={handleSaveMovie}
          message={message}
          isLoading={isLoading}
          savedMovies={savedMovies}
          isCheckingToken={isCheckingToken}
          onMovieDelete={handleMovieDelete}
          showShortMovies={handleShortMovies}
          isShortMovies={isShortMovies}
          onMoreBtn={handleMoreBtn}
          moreBtnVisibility={moreBtnVisibility}
          amount={amountCards.startCards}
        />
        <ProtectedRoute
          path="/saved-movies"
          component={SavedMovies}
          loggedIn={loggedIn} 
          movies={filterSavedMovies}
          onSubmit={handleSearchSavedMovies}
          onMovieDelete={handleMovieDelete}
          message={message}
          savedMovies={savedMovies}
          isCheckingToken={isCheckingToken}
          showShortMovies={handleShortMovies}
          isShortMovies={isShortMovies}
          onMoreBtn={handleMoreBtn}
          moreBtnVisibility={moreBtnVisibility}
          amount={amountCards.startCards}
        />
        <ProtectedRoute
          path="/profile"
          component={Profile}
          loggedIn={loggedIn} 
          signOut={handleSignOut}
          onUpdateUser={handleUpdateUser}
          isCheckingToken={isCheckingToken}
          errorMessage={isRequestStatus}
        />
        <Route path="/signin">
          {isCheckingToken ? (
            <Preloader isCheckingToken={isCheckingToken} />
          ) : loggedIn ? (
            <Redirect to="/movies" />
          ) : (
            <Login 
              handleLogin={handleLogin}
              errorMessage={isRequestStatus}
            />
          )}
        </Route>
        <Route path="/signup">
          <Register 
            handleRegister={handleRegister}
            errorMessage={isRequestStatus}
            />
        </Route>
        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
    </CurrentUserContext.Provider>
  );
}

export default App;
