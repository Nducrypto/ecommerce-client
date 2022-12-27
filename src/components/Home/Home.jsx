import React from "react";
import Categories from "../Categories/Categories";
import Footer from "../Footer/Footer";
import Newsletter from "../Newsletter/Newsletter";
import Products from "../Products/Products";
import Slider from "../Sliders/Slider";

const Home = () => {
  return (
    <div>
      <Slider />
      <Products />
      <Categories />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Home;
