import M from 'materialize-css/dist/js/materialize.min.js';
import React, { useEffect } from "react";
import curryImg from './images/curry.jpg';
import pieImg from './images/decorating_pie.jpg';
import cookingImg from './images/cooking.jpg';

export const Slider = () => {
    useEffect(() => {
        const slider = document.querySelector('.slider');
        M.Slider.init(slider, {
            indicators: false,
            height: 350,
            transition: 500,
            interval: 3000
        });
    })

    return (
        <div className="slider">
            <ul className="slides">
                <li>
                    <img src={pieImg} />
                </li>
                <li>
                    <img src={curryImg} />
                </li>
                <li>
                    <img src={cookingImg} />
                </li>
            </ul>
        </div>
    );
}

export default Slider;
