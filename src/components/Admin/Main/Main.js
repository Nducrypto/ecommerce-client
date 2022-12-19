import React from "react";
import Orders from "../Order/Orders";
import Revenue from "../Order/Revenue";
import UserStats from "../UserStats/UserStats";
import AllProducts from "../AllProducts/AllProducts";

const Main = () => {
  return (
    <div>
      <AllProducts />
      <Orders />
      <Revenue />
      <UserStats />
    </div>
  );
};

export default Main;
