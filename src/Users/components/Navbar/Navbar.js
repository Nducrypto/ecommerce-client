import { AppBar, Badge, Tooltip } from "@mui/material";

import { ShoppingCartOutlined } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Logout } from "../../../States/Redux/userRedux";

import "./Navbar.css";
import Cart from "../Cart/Cart";
import { useStateContext } from "../../../States/Hooks/ContextProvider";

const Navbar = () => {
  const { open, setOpen } = useStateContext();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { product } = useSelector((state) => state.cartReducer);

  const user = JSON.parse(localStorage.getItem("userRedux"));

  const logout = () => {
    dispatch(Logout());
    navigate("/");
  };

  return (
    <AppBar position="sticky">
      <div className="navContainer ">
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
              <ShoppingCartOutlined onClick={() => setOpen((prev) => !prev)} />
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

        {user?.isAdmin && (
          <nav className="navsmall">
            <a style={{ color: "white", textDecoration: "none" }} href="/main">
              main
            </a>

            <Tooltip title="cart">
              <Badge badgeContent={product.length} color="primary">
                {" "}
                <ShoppingCartOutlined
                  onClick={() => setOpen((prev) => !prev)}
                />
              </Badge>
            </Tooltip>
          </nav>
        )}
        {open && <Cart />}
      </div>
    </AppBar>
  );
};

export default Navbar;
