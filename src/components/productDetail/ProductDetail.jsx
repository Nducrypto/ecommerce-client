import { Add, Remove } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../Footer/Footer";
import Newsletter from "../Newsletter/Newsletter";
import { useDispatch } from "react-redux";
import { addToCart } from "../../States/Redux/cartRedux";
import { publicApi } from "../../States/Api";
import "./ProductDetail.css";

const Product = () => {
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");

  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const { data } = await publicApi.get("/products/" + id);
        setProduct(data);
      } catch (error) {}
    };
    getProduct();
  }, [id]);

  const handleQuantity = (type) => {
    if (type === "inc") {
      setQuantity(quantity + 1);
    } else if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    }
  };

  // const handleSize = (e) => {
  //   setSize(e.target.vale);
  // };
  console.log(size);
  console.log(color);
  const totalPrice = quantity * product.price;
  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity, totalPrice, color, size }));
  };
  return (
    <div>
      <div className="wrapper">
        <div className="imageContainer">
          <img alt="" className="productImage" src={product.image} />
        </div>
        <div className="productInfo">
          <div className="title">{product.title}</div>
          <div className="description">{product.description}</div>
          <span className="price">$ {product.price}</span>
          <div className="filteredcontainer">
            <div className="filter">
              <div className="filterTitle">Color</div>
              {product.color?.map((c) => (
                <div
                  className="filterColor"
                  style={{ backgroundColor: c }}
                  key={c}
                  onClick={() => setColor(c)}
                />
              ))}
            </div>
            <div className="filter">
              <div className="filterTitle">Size</div>
              <select
                onChange={(e) => setSize(e.target.value)}
                // onChange={handleSize}
              >
                {/* {product?.size?.map((s) => (
                  <option value={s} key={s}>
                    {s}
                  </option>
                ))} */}
                <option>L</option>
                <option>XL</option>
                <option>M</option>
              </select>
            </div>
          </div>
          <div className="addContainer">
            <div className="amountContainer">
              <Remove onClick={() => handleQuantity("dec")} />
              <div className="amount">{quantity}</div>
              <Add onClick={() => handleQuantity("inc")} />
            </div>
            <button className="zbutton" onClick={handleAddToCart}>
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Product;
