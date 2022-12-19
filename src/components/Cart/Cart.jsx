import React, { useEffect, useState } from "react";
import axios from "axios";

import { Add, Remove } from "@mui/icons-material";
import styled from "styled-components";
import Footer from "../Footer/Footer";
import { mobile } from "../../responsive";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import {
  deleteFromCart,
  clearCart,
  addToCart,
  increaseQuantity,
  reduceQuantity,
} from "../../States/Redux/cartRedux";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const Cart = () => {
  const [stripeToken, setStripeToken] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { product, total } = useSelector((state) => state.cartReducer);
  // console.log(cartReducer.product);
  // const ndu = cartReducer.product.map((p) => p.quantity);

  // console.log(ndu);

  const { authData } = useSelector((state) => state.userReducer);
  const user = authData;

  const Key =
    "pk_test_51MD6WxDZNN8gl0X1RDm7u38qO4i6OBUJ31YhMcapPaDgCWFk5LtckqARnp8LiYEeqrA4HhQYkRstZfmhlh4U5lDn00SJVCovrN";

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
            amount: total * 100,
          }
        );
        navigate("/succes", { state: { data: data } });
      } catch (error) {
        console.log(error);
      }
    };
    stripeToken && makeRequest();
  }, [stripeToken, total, navigate]);

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  // const handleQuantity = (type) => {
  //   if (type === "inc") {
  //     setQuantity(quantity + 1);
  //   } else if (type === "dec") {
  //     setQuantity(quantity - 1);
  //   }
  // };

  const handleDelete = (p) => {
    dispatch(deleteFromCart({ _id: p._id, totalPrice: p.totalPrice }));
  };

  return (
    <Container>
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton>CONTINUE SHOPPING</TopButton>
          <TopTexts>
            <TopText>Shopping Bag {product.length}</TopText>
            <TopText>Your Wishlist (0)</TopText>
          </TopTexts>
          <TopButton type="filled" onClick={() => navigate("/pay")}>
            HISTORY
          </TopButton>
        </Top>
        <Bottom>
          <Info>
            {product?.map((p) => (
              <Product key={p._id}>
                <ProductDetail>
                  <Image src={p.image} />
                  <Details>
                    <ProductName>
                      <b>Product:</b> {p.title}
                    </ProductName>
                    <ProductId>
                      <b>ID:</b> {p._id}
                    </ProductId>
                    <ProductColor color={p.color} />
                    <ProductSize>
                      <b>Size:</b> {p.size}
                    </ProductSize>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    <Add onClick={() => dispatch(increaseQuantity(p))} />
                    <ProductAmount>{p.quantity}</ProductAmount>
                    <Remove onClick={() => dispatch(reduceQuantity(p))} />

                    <Button onClick={() => handleDelete(p)}>Delete</Button>
                  </ProductAmountContainer>
                  <ProductPrice>$ {p.price}</ProductPrice>
                  <ProductPrice>$ {p.totalPrice}</ProductPrice>
                </PriceDetail>
              </Product>
            ))}

            <button onClick={handleClearCart}>clear</button>
            <Hr />
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ {total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ 5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ -5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ {total}</SummaryItemPrice>
            </SummaryItem>
            {/* <StripeCheckout
              name={user.firstName}
              description={`Your Total is ${cartReducer.total}`}
              // image={cartReducer.p}
              amount={cartReducer.total * 100}
              currency="NGN"
              stripeKey={Key}
              token={onToken}
              email={user.email}
              // billingAddress
              // shippingAddress
            >
              <Button>CHECKOUT NOW</Button>
            </StripeCheckout> */}
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
