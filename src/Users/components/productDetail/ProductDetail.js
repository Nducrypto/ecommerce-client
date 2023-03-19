import { Add, Remove } from "@mui/icons-material";
import { Rating } from "@mui/material";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import Footer from "../Footer/Footer";
import Newsletter from "../Newsletter/Newsletter";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../States/Redux/cartRedux";

import "./ProductDetail.css";
import { useStateContext } from "../../../States/Hooks/ContextProvider";
import useFetch from "../../../States/Hooks/useFetch";
import Products from "../Products/Products";

const Product = () => {
  const location = useLocation();
  const id = location.state.id;
  const { products, isLoading } = useFetch(`/products/${id}`);

  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState([]);
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState("");
  const { setSnackBarOpen } = useStateContext();
  const dispatch = useDispatch();

  const handleQuantity = (type) => {
    if (type === "inc") {
      setQuantity(quantity + 1);
    } else if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    }
  };

  const totalPrice = quantity * products.price;
  const handleAddToCart = () => {
    dispatch(addToCart({ ...products, quantity, totalPrice, color, size }));
    setSnackBarOpen("addToCart");
  };

  const handleSetColor = (c) => {
    const check = color?.find((p) => p === c);

    setColor(check ? color?.filter((item) => item !== check) : [...color, c]);
  };
  return (
    <div>
      {isLoading ? null : (
        <div className="wrapper">
          <div className="imageContainer">
            <img alt="" className="productImage" src={products.image} />
          </div>
          <div className="productInfo">
            <div className="title">{products.title}</div>
            <div className="description">{products.description}</div>
            <div>
              <Rating
                value={Number(products?.rating)}
                readOnly
                precision={Number(products?.rating)}
              />
            </div>

            <span className="price">
              &#8358; {Intl.NumberFormat().format(products.price)}
            </span>
            <div className="filteredcontainer">
              <div className="filter">
                <div className="filterTitle">Color</div>
                {products.color?.map((c) => (
                  <div
                    className="filterColor"
                    style={{ backgroundColor: c, marginTop: ".4rem" }}
                    key={c}
                    onClick={() => {
                      handleSetColor(c);
                    }}
                  />
                ))}
              </div>
              <div className="filter">
                <div className="filterTitle">Size</div>
                <select value={size} onChange={(e) => setSize(e.target.value)}>
                  <option hidden>-Select-</option>

                  {products?.size?.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="addContainer">
              <div className="amountContainer">
                <Remove onClick={() => handleQuantity("dec")} />
                <div className="amount">{quantity}</div>
                <Add onClick={() => handleQuantity("inc")} />
              </div>
              {/* Notifyin Color Selected By user */}
              <div
                className="colorCountContainer"
                onClick={() => setOpen((prev) => !prev)}
              >
                {!open ? (
                  <>
                    <span className="colorCount"> {color.length}</span>
                    <span style={{ marginTop: ".1rem" }}>
                      {color.length > 1 ? "Colors" : "Color"} Selected
                    </span>
                  </>
                ) : null}
                {open && (
                  <div className="openColor">
                    {color.map((s, i) => (
                      <div
                        key={i}
                        className="filterColor"
                        style={{ backgroundColor: s }}
                      />
                    ))}
                  </div>
                )}
              </div>
              <button className="zbutton" onClick={handleAddToCart}>
                ADD TO CART
              </button>
            </div>
          </div>
        </div>
      )}

      <Products />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Product;
