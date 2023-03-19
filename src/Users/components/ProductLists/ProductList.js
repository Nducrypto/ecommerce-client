import Newsletter from "../Newsletter/Newsletter";
import Footer from "../Footer/Footer";
import Products from "../Products/Products";

import "./productList.css";
import { useLocation } from "react-router-dom";

const ProductList = () => {
  const location = useLocation();
  const url = location.pathname.split("/")[2];

  // const handleFilters = (e) => {
  //   const { name, value } = e.target;
  //   setFilters({ ...filters, [name]: value });
  // };

  return (
    <div className="pListContainer">
      <div className="pTitle">{url}</div>

      <Products />

      <Newsletter />
      <Footer />
    </div>
  );
};

export default ProductList;
