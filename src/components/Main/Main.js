import React from 'react';
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';
import Footer from '../Footer/Footer'
import './Main.css';

function Main({loggedIn}) {
  return (
    <div className="content">
      <Promo loggedIn={loggedIn}/>
      <AboutProject />
      <Techs />
      <AboutMe />
      <Portfolio />
      <Footer />
    </div>
  );
}

export default Main;