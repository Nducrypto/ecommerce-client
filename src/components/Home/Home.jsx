import React from "react";
import Categories from "../Categories/Categories";
import Footer from "../Footer/Footer";
import Newsletter from "../Newsletter";
import Products from "../Products/Products";
import Slider from "../Sliders/Slider";

const Home = () => {
  return (
    <div>
      <Slider />
      <Categories />
      <Products />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Home;
