import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";

// import Home from "./components/Home/Home";
// import ProductList from "./components/Products/ProductList";
// import Register from "./components/Register";
// import Login from "./components/Login";
// import Cart from "./components/Cart/Cart";
// import Navbar from "./components/Navbar/Navbar";
// import Announcement from "./components/Announcement/Announcement";
// import Succes from "./Succes";
import {
  ProductDetail,
  Home,
  ProductList,
  Register,
  Login,
  Cart,
  Navbar,
  Announcement,
  Succes,
  Main,
} from "./components";
import { getAllProducts } from "./States/Actions/ProductAction";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <>
      <Announcement />
      <Navbar />
      <Routes>
        {/* <Route path="/" element={<Main />} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/success" element={<Succes />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/productlist/:category" element={<ProductList />} />
      </Routes>
    </>
  );
};

export default App;
