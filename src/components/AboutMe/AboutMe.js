import React from 'react';
import photoStudent from './../../images/aboutme.jpeg';
import './AboutMe.css';

function AboutMe() {
  return (
    <div className="about-me">
      <h3 className="about-me__title">Студент</h3>
      <div className="about-me__container">
        <div className="about-me__text">
          <h2 className="about-me__name">Ирина</h2>
          <h4 className="about-me__info">Веб-разработчица, 28 лет</h4>
          <p className="about-me__about">
            Я родилась в городе Уфа, 
            в 18 лет переехала в Санкт-Петербург поступать на экномиста в СПбГЭУ, 
            после университета устроилась на работу аудитором, 
            но 2020 год дал понять, что заниматься этим всю жизнь я не хочу и мне интересно попробовать профессию будущего.
            Свой путь в изучении я начала с языка Python и первый же проект "Социальная сеть на Django" определил, 
            что именно мне нравится в программировании - визуальная и интерактивная часть. 
          </p>
        </div>
        <div className="about-me__links">
          <a href="https://vk.com/vasilkovai" className="about-me__link" target="_blank" rel="noreferrer">VK</a>
          <a href="https://github.com/vasilkovai" className="about-me__link" target="_blank" rel="noreferrer">Github</a>
        </div>
        <img className="about-me__photo" alt="Фото студента" src={photoStudent}/>
      </div>
    </div>
  );
}

export default AboutMe;