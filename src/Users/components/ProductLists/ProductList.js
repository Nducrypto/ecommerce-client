import Newsletter from "../Newsletter/Newsletter";
import Footer from "../Footer/Footer";
import Products from "../Products/Products";

import "./productList.css";
import useFetch from "../../../States/Hooks/useFetch";
import { useLocation } from "react-router-dom";

const ProductList = () => {
  const location = useLocation();
  const url = location.pathname.split("/")[2];
  const { filters, setFilters, setSort } = useFetch(`/product/${url}`);

  const handleFilters = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  return (
    <div className="productListContainer">
      <div className="productTitle">{url}</div>

      <div className="filterContainer">
        <div className="filter">
          <span className="filterText">Filter Products:</span>
          <select name="color" onChange={handleFilters} className="select">
            <option disabled>Color</option>
            <option>White</option>
            <option>Brown</option>
            {/* <option value="Red">Red</option>
            <option>Blue</option>
            <option>Yellow</option>
            <option>Green</option> */}
          </select>
          <select name="size" onChange={handleFilters} className="select">
            <option disabled>Size</option>
            <option>XS</option>
            <option>S</option>
            {/* <option>m</option>
            <option>L</option>
            <option>XL</option> */}
          </select>
        </div>
        <div className="filter">
          <span className="filterText">Sort Products:</span>
          <select onChange={(e) => setSort(e.target.value)} className="select">
            <option value="newest">Newest</option>
            <option value="high">Price (high)</option>
            <option value="low">Price (low)</option>
          </select>
        </div>
      </div>

      <Products />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default ProductList;
