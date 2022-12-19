import { Badge } from "@mui/material";
import { Search, ShoppingCartOutlined } from "@mui/icons-material";
import React from "react";
import styled from "styled-components";
import { mobile } from "../../responsive";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Logout } from "../../States/Redux/userRedux";

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })};
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { product } = useSelector((state) => state.cartReducer);
  const { authData } = useSelector((state) => state.userReducer);

  // const userReducer = useSelector((state) => state.userReducer);

  // console.log(userReducer);
  const user = authData;
  // const user = JSON.parse(
  //   JSON.parse(localStorage.getItem("persist:root")).userReducer
  // )?.authData;
  // console.log(user);
  const logout = () => {
    dispatch(Logout());
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="Search" />
            <Search style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Center>
          <Logo>
            {user?.firstName} {user?.lastName}
          </Logo>
        </Center>
        <Right>
          {user?.id ? (
            <button onClick={logout}>Logout</button>
          ) : (
            <>
              <MenuItem onClick={() => navigate("/login")}>SIGN IN</MenuItem>

              <MenuItem onClick={() => navigate("/register")}>
                REGISTER
              </MenuItem>
            </>
          )}
          <MenuItem>
            <Badge badgeContent={product.length} color="primary">
              <ShoppingCartOutlined onClick={() => navigate("/cart")} />
            </Badge>
          </MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
