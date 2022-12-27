import { AppBar, Switch, Badge, Tooltip } from "@mui/material";

import { ShoppingCartOutlined } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Logout } from "../../States/Redux/userRedux";

import "./Navbar.css";
import { useState } from "react";
import Cart from "../Cart/Cart";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { product } = useSelector((state) => state.cartReducer);

  const user = JSON.parse(localStorage.getItem("userRedux"));

  const logout = () => {
    dispatch(Logout());
    navigate("/");
  };

  return (
    <div className="container ">
      <AppBar position="sticky">
        <div className="Navbar">
          <Link to="/" className="nav-logo">
            <span>Mabench</span>
          </Link>
          <div className="nav-items">
            <div></div>
            <span>
              {user?.firstName} {user?.lastName}
            </span>
            <span className="divider"></span>

            <Badge badgeContent={product.length} color="primary">
              {" "}
              <ShoppingCartOutlined
                // onClick={() => navigate("/cart")}
                onClick={() => setOpen(!open)}
              />
            </Badge>
            <span className="divider"></span>

            {user?.id ? (
              <button className="logout" onClick={logout}>
                Logout
              </button>
            ) : (
              <>
                <button className="login" onClick={() => navigate("/login")}>
                  Login
                </button>

                <button onClick={() => navigate("/register")}>Register</button>
              </>
            )}
          </div>
        </div>

        <nav className="navsmall">
          {/* <Tooltip title="home">
            <a
              href="#home"
              onClick={() => setActiveNav("#home")}
              className={activeNav === "#home" ? "active" : ""}
            >
              <AiOutlineHome />
            </a>
          </Tooltip> */}

          {/* <Tooltip title="about">
            <a
              href="#about"
              onClick={() => setActiveNav("#about")}
              className={activeNav === "#about" ? "active" : ""}
            >
              <BiUserPlus />
            </a>
          </Tooltip> */}
          {/* 
          <Tooltip title="skills">
            <a
              href="#skills"
              onClick={() => setActiveNav("#skills")}
              className={activeNav === "#skills" ? "active" : ""}
            >
              <BiBookOpen />
            </a>
          </Tooltip> */}
          {/* <Tooltip title="contact">
            <a
              href="#contact"
              onClick={() => setActiveNav("#contact")}
              className={activeNav === "#contact" ? "active" : ""}
            >
              <BiMessageAltDetail />
            </a>
          </Tooltip> */}
          <Tooltip title="cart">
            <Badge
              badgeContent={product.length}
              color="primary"
              className="navSmallIcons"
            >
              {" "}
              <ShoppingCartOutlined onClick={() => navigate("/cart")} />
            </Badge>
          </Tooltip>
          <button style={{ backgroundColor: "red", border: "none" }}>
            <Switch size="small" />
          </button>
        </nav>
      </AppBar>
      {open && <Cart />}
    </div>
  );
};

export default Navbar;
