import React, { useState, useEffect } from "react";
import "./Slider.css";
import { sliderItems } from "../../../data";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timeOutId = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderItems.length);
    }, 4500);
    return () => clearTimeout(timeOutId);
  }, [currentSlide]);

  return (
    <div className="slider-container">
      <div
        className="slider-wrapper"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {sliderItems.map((item, index) => (
          <div
            key={index}
            className={`slide ${index === currentSlide ? "current-slide" : ""}`}
          >
            <img src={item.img} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
