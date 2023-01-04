import React from "react";
import Awards from "../Award/Awards";
import Categories from "../Categories/Categories";
import Footer from "../Footer/Footer";
import Newsletter from "../Newsletter/Newsletter";
import Products from "../Products/Products";
import Slider from "../Sliders/Slider";

const Home = () => {
  return (
    <div>
      <Slider />
      <Categories />
      <Products />
      <Awards />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Home;
