import React from 'react'
import './Preloader.css'

const Preloader = ({isCheckingToken}) => {
    return (
        <div className={`preloader ${isCheckingToken ? "preloader_active" : ""}`}>
            <div className="preloader__container">
                <span className="preloader__round"></span>
            </div>
        </div>
    )
};

export default Preloader
