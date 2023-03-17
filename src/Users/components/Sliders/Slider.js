import React, { useState, useEffect } from "react";

import "./Slider.css";
import { sliderItems } from "../../../data";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(1);

  useEffect(() => {
    setTimeout(() => {
      setCurrentSlide(currentSlide === 10 ? 1 : (prev) => prev + 1);
    }, 4500);
  }, [currentSlide]);

  return (
    <div className="container-slider">
      {sliderItems.map((item, index) => {
        return (
          <div
            key={index}
            className={
              currentSlide === index + 1 ? "slide active-anim" : "slide"
            }
          >
            <img src={item.img} alt="" />
          </div>
        );
      })}
    </div>
  );
};

export default Slider;
