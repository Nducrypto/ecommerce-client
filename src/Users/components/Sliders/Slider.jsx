// import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
// import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
// import { useState } from "react";
// import styled from "styled-components";
// import { sliderItems } from "../../data";
// import { mobile } from "../../responsive";

// const Slider = () => {
//   const [slideIndex, setSlideIndex] = useState(0);
//   const handleClick = (direction) => {
//     if (direction === "left") {
//       setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
//     } else {
//       setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
//     }
//   };

//   return (
//     <Container>
//       <Arrow direction="left" onClick={() => handleClick("left")}>
//         <ArrowBackIosIcon fontSize="large" />
//       </Arrow>
//       <Wrapper slideIndex={slideIndex}>
//         {sliderItems.map((item) => (
//           <Slide bg={item.bg} key={item.id}>
//             <ImgContainer>
//               <Image src={item.img} />
//             </ImgContainer>
//             <InfoContainer>
//               <Title>{item.title}</Title>
//               <Desc>{item.desc}</Desc>
//               <Button>SHOW NOW</Button>
//             </InfoContainer>
//           </Slide>
//         ))}
//       </Wrapper>
//       <Arrow direction="right" onClick={() => handleClick("right")}>
//         <ArrowForwardIosIcon fontSize="large" />
//       </Arrow>
//     </Container>
//   );
// };

// export default Slider;

import React, { useState } from "react";
import EastOutlinedIcon from "@mui/icons-material/EastOutlined";
import WestOutlinedIcon from "@mui/icons-material/WestOutlined";
import "./Slider.css";
import { sliderItems } from "../../../data";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(1);

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 1 ? 10 : (prev) => prev - 1);
  };

  const nextSlide = () => {
    setCurrentSlide(currentSlide === 10 ? 1 : (prev) => prev + 1);
  };

  const moveDot = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="container-slider">
      {sliderItems.map((item, index) => {
        return (
          <div
            key={index.id}
            className={
              currentSlide === index + 1 ? "slide active-anim" : "slide"
            }
          >
            <img src={item.img} alt="" />
          </div>
        );
      })}
      <WestOutlinedIcon className="btn-slide prev" onClick={prevSlide} />
      <EastOutlinedIcon className="btn-slide next" onClick={nextSlide} />

      <div className="container-dots">
        {Array.from({ length: 10 }).map((item, index) => (
          <div
            key={item}
            onClick={() => moveDot(index + 1)}
            className={currentSlide === index + 1 ? "dot active" : "dot"}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
