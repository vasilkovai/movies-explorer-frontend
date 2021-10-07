import React from 'react';
import './AboutProject.css';

function AboutProject() {
  return (
    <div className="about-project" id="about-project">
      <h3 className="about-project__title">О проекте</h3>
      <div className="about-project__text">
        <div className="about-project__info">
          <h3 className="about-project__info-title">Дипломный проект включал 5 этапов</h3>
          <p className="about-project__info-paragraph">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </div>
        <div className="about-project__info">
          <h3 className="about-project__info-title">На выполнение диплома ушло 5 недель</h3>
          <p className="about-project__info-paragraph">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
        
      </div>
      <div className="about-project__map">
        <div className="about-project__map-container">
          <div className="about-project__week about-project__week_black">1 неделя</div>
          <p className="about-project__part">Back-end</p>
        </div>
        <div className="about-project__map-container">
          <div className="about-project__week">4 недели</div>
          <p className="about-project__part">Front-end</p>
        </div>
      </div>
    </div>
  );
}

export default AboutProject;