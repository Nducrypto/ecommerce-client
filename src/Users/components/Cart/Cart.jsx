import React, { useEffect } from "react";
import axios from "axios";

import { Add, Remove } from "@mui/icons-material";
// import Footer from "../Footer/Footer";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import {
  deleteFromCart,
  clearCart,
  increaseQuantity,
  reduceQuantity,
} from "../../../States/Redux/cartRedux";
import { Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import "./Cart.css";
import CloseIcon from "@mui/icons-material/Close";
import { useStateContext } from "../../../States/Hooks/ContextProvider";
const Cart = () => {
  const { stripeToken, setStripeToken, setOpen } = useStateContext();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { product, subTotal } = useSelector((state) => state.cartReducer);

  const user = JSON.parse(localStorage.getItem("userRedux"));

  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const { data } = await axios.post(
          "http://localhost:5000/api/stripe/payment",
          {
            tokenId: stripeToken.id,
            amount: subTotal * 100,
          }
        );
        navigate("/succes", { state: { data: data } });
      } catch (error) {
        console.log(error);
      }
    };
    stripeToken && makeRequest();
  }, [stripeToken, subTotal, navigate]);

  return (
    <div className="cart">
      <CloseIcon
        sx={{ color: "white", backgroundColor: "red", borderRadius: "1rem" }}
        onClick={() => setOpen(false)}
      />
      <div className="overFlowdiv">
        {product?.map((item) => (
          <div className="item" key={item._id}>
            <img src={item.image} alt="" />
            <div className="details">
              <div
                style={{
                  color: "black",
                }}
              >
                {item.title}
              </div>
              <div
                style={{
                  color: "black",
                }}
              >
                {item.description}
              </div>
              <div
                style={{
                  marginTop: ".3rem",
                  color: "black",
                }}
              >
                {item.size}
              </div>
              <div
                className="color"
                style={{
                  backgroundColor: item.color,
                  marginTop: ".3rem",
                }}
              />

              <div className="quantityContainer">
                <Add
                  className="increase"
                  onClick={() => dispatch(increaseQuantity(item))}
                />
                <div className="quantity">{item.quantity}</div>
                <Remove
                  className="decrease"
                  onClick={() => dispatch(reduceQuantity(item))}
                />
              </div>
              <div className="productPrice">
                &#8358; {Intl.NumberFormat().format(item.price)}
              </div>
              {/* <div className="productPrice"> */}
              {/* total: */}
              {/* <span style={{ color: "blue" }}>${item.totalPrice}</span> */}
              {/* </div> */}
            </div>
            <Tooltip title="delete">
              <DeleteIcon
                fontSize="small"
                className="delete"
                onClick={() => dispatch(deleteFromCart(item))}
              />
            </Tooltip>
          </div>
        ))}
      </div>
      <div className="total">
        <span>SUBTOTAL</span>
        <span>${Intl.NumberFormat().format(subTotal)}</span>
      </div>

      <button className="clearCat" onClick={() => dispatch(clearCart())}>
        clearCat
      </button>

      {!user?.id ? (
        <button
          className="checkout"
          onClick={() => {
            setOpen(false);
            navigate("/login");
          }}
        >
          Login
        </button>
      ) : (
        <StripeCheckout
          // name={user.firstName}
          description={`Your Total is ${subTotal}`}
          // image={cartReducer.p}
          amount={subTotal * 100}
          currency="NGN"
          stripeKey={process.env.REACT_APP_STRIPE_KEY}
          token={onToken}
          // email={user.email}
          // billingAddress
          // shippingAddress
        >
          <button className="checkout">CHECKOUT NOW</button>
        </StripeCheckout>
      )}
    </div>
  );
};

export default Cart;
