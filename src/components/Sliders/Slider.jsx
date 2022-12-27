// import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
// import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
// import { useState } from "react";
// import styled from "styled-components";
// import { sliderItems } from "../../data";
// import { mobile } from "../../responsive";

// const Container = styled.div`
//   width: 100%;
//   height: 100vh;
//   display: flex;
//   position: relative;
//   overflow: hidden;
//   ${mobile({ display: "none" })}
// `;

// const Arrow = styled.div`
//   width: 50px;
//   height: 50px;
//   color: red;
//   border-radius: 50%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   position: absolute;
//   top: 0;
//   bottom: 0;
//   left: ${(props) => props.direction === "left" && "10px"};
//   right: ${(props) => props.direction === "right" && "10px"};
//   margin: auto;
//   cursor: pointer;
//   opacity: 0.5;
//   z-index: 2;
// `;

// const Wrapper = styled.div`
//   height: 100%;
//   margin-top: 2rem;
//   display: flex;
//   transition: all 1.5s ease;
//   transform: translateX(${(props) => props.slideIndex * -100}vw);
// `;

// const Slide = styled.div`
//   width: 100vw;
//   height: 100vh;
//   display: flex;
//   align-items: center;
//   background-color: #${(props) => props.bg};
// `;

// const ImgContainer = styled.div`
//   height: 100%;
//   flex: 1;
// `;

// const Image = styled.img`
//   height: 80%;
// `;

// const InfoContainer = styled.div`
//   flex: 1;
//   padding: 50px;
// `;

// const Title = styled.h1`
//   font-size: 70px;
// `;

// const Desc = styled.p`
//   margin: 50px 0px;
//   font-size: 20px;
//   font-weight: 500;
//   letter-spacing: 3px;
// `;

// const Button = styled.button`
//   padding: 10px;
//   font-size: 20px;
//   background-color: transparent;
//   cursor: pointer;
// `;

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
import { sliderItems } from "../../data";

const Sidebar = () => {
  const [currentSlide, setCurrentSlide] = useState(1);

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 1 ? 4 : (prev) => prev - 1);
  };

  const nextSlide = () => {
    setCurrentSlide(currentSlide === 4 ? 1 : (prev) => prev + 1);
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
        {Array.from({ length: 4 }).map((item, index) => (
          <div
            onClick={() => moveDot(index + 1)}
            className={currentSlide === index + 1 ? "dot active" : "dot"}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
