import React from 'react';
import { Route, Switch, Redirect, useHistory} from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import PageNotFound from '../PageNotFound/PageNotFound';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

// import MoviesApi from '../../utils/MovieApi';
import * as MainApi from '../../utils/MainApi';

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false)
  const [currentUser, setCurrentUser] = React.useState({});
  const history = useHistory(); 


  React.useEffect(() => { 
    checkToken() 
  }, []) 

  function checkToken() { 
    const jwt = localStorage.getItem('jwt') 
    if (jwt) { 
      MainApi 
        .getUserInfo(jwt) 
        .then((res) => { 
          setLoggedIn(true) 
        }) 
        .catch(error => { 
          console.error(error)}) 
    } 
  } 


  React.useEffect(() => { 
    if (loggedIn) { 
      history.push('/movies') 
    } 
  }, [history, loggedIn]) 

  function handleUpdateUser(user) {
    MainApi
      .setUserData(user)
      .then((user) => {
        setCurrentUser(user.data)
      })
      .catch(error => console.log(error))
  }

  function handleRegister({name, password, email}) { 
    MainApi 
      .register(name, password, email) 
      .then(() => { 
        history.push('/signin');})
      .catch(error => { 
        console.log(error) 
    })   
  } 

  function handleLogin({password, email}) { 
    MainApi 
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

  // const handleSignOut = () => {
  //   MainApi
  //     .signOut()
  //     .then(() => {
  //       localStorage.removeItem('jwt')
  //       setLoggedIn(false)
  //       history.push('/signin')
  //     })
  //     .catch(error => console.log(error))
  // }

  const handleSignOut = () => {
    MainApi
      .signOut()
      .then(() => {
        localStorage.removeItem('jwt')
        setLoggedIn(false)
        history.push('/signin')
      })
      .catch(error => console.log(error))
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <ProtectedRoute
          exact path="/movies"
          component={Movies}
          loggedIn={loggedIn} 
        />
        <ProtectedRoute
          exact path="/saved-movies"
          component={SavedMovies}
          loggedIn={loggedIn} 
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
        <Route exact path="/movies">
          {loggedIn ? <Redirect to="/movies" /> : <Redirect to="/signin" />}
        </Route>  
      </Switch>
    </CurrentUserContext.Provider>
  );
}

export default App;
