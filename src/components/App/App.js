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
  // const [amountCards, setAmountCards] = React.useState({
  //   startCards: 0,
  //   rowCards: 0,
  //   moreCards: 0,
  // });
  // const [moreBtnVisibility, setMoreBtnVisibility] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isCheckingToken, setIsCheckingToken] = React.useState(true);
  const [isShortMovies, setIsShortMovies] = React.useState(false);
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
        })
        .catch(error => { 
          console.error(error)
        })
    }
  }, [loggedIn])

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
          setIsCheckingToken(false)
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
        setLoggedIn(false)
        localStorage.clear()
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
      .catch(error => console.log(error))
    }

  // get movies
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
  // React.useEffect(() => {
  //   limitAmountCards();
  // }, []);

  // function limitAmountCards() {
  //   const viewportWidth = window.screen.width;
  //   if (viewportWidth < 767 ) {
  //     setAmountCards({ startCards: 5, rowCards: 1, moreCards: 2 });
  //   } else if (viewportWidth < 1200) {
  //     setAmountCards({ startCards: 8, rowCards: 2, moreCards: 2 });
  //   } else {
  //     setAmountCards({ startCards: 12, rowCards: 3, moreCards: 3 });
  //   }
  // }

  // const handleMoreBtn = () => {
  //   return setAmountCards({
  //     ...amountCards,
  //     startCards: amountCards.startCards + amountCards.moreCards,
  //   });
  // };

  // function moreBtnVisible() {
  //   if (filterMovies.length > amountCards.startCards) {
  //     setMoreBtnVisibility(true);
  //   } else {
  //     setMoreBtnVisibility(false);
  //   }
  // }

  // // React.useEffect(() => {
  // //   moreBtnVisible();
  // // }, [filterMovies, amountCards]);

  // window.addEventListener("resize", function () {
  //   setTimeout(() => {
  //     limitAmountCards();
  //   }, 250);
  // });

  // save/delete movies
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

  const handleMovieDelete = (movie) => {
    mainApi
      .deleteSavedMovie(movie._id)
      .then(() => {
        setSavedMovies(savedMovies.filter((item) => item._id !== movie._id))
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
          // onMoreBtn={handleMoreBtn}
          // moreBtnVisibility={moreBtnVisibility}
        />
        <ProtectedRoute
          path="/saved-movies"
          component={SavedMovies}
          loggedIn={loggedIn} 
          movies={filterSavedMovies}
          onSubmit={handleSearchMovies}
          onMovieDelete={handleMovieDelete}
          message={message}
          savedMovies={savedMovies}
          isCheckingToken={isCheckingToken}
          showShortMovies={handleShortMovies}
          isShortMovies={isShortMovies}
        />
        <ProtectedRoute
          path="/profile"
          component={Profile}
          loggedIn={loggedIn} 
          signOut={handleSignOut}
          onUpdateUser={handleUpdateUser}
          isCheckingToken={isCheckingToken}
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
