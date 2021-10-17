import React from "react";
import { Route, Redirect } from "react-router-dom";
import Preloader from '../Preloader/Preloader';
import Footer from '../Footer/Footer'
import './ProtectedRoute.css'

const ProtectedRoute = ({ component: Component, ...props }) => {
  return (
    <Route>
      {() => 
      props.isCheckingToken 
      ? <Preloader isCheckingToken={props.isCheckingToken}/> 
      : props.loggedIn 
      ? <div className="protected-route">
          <Component {...props} /> 
          <Route path="/(movies|saved-movies)">
            <Footer />
          </Route>
        </div>
      : <Redirect to="/movies" />
      }
    </Route>
  );
};

export default ProtectedRoute;