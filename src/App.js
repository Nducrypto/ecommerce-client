import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";

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
  Navbar,
  Announcement,
  Succes,
  Main,
} from "./Users/components";
import { getAllProducts } from "./States/Actions/ProductAction";
import CustomizedSnackbar from "./Users/components/Snackbar/Snackbar";

const App = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("userRedux"));

  const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => {
      const cantControlScrollRestoration =
        "scrollRestoration" in window.history;
      if (cantControlScrollRestoration) {
        window.history.scrollRestoration = "manual";
      }
      window.scrollTo(0, 0);
    }, [pathname]);

    // return children;
  };

  useEffect(() => {
    dispatch(getAllProducts());

    JSON.parse(localStorage.getItem("userRedux"));
  }, [dispatch, location]);

  const AdminProtected = ({ children }) => {
    if (user?.isAdmin) {
      return children;
    } else {
      return <Navigate to="/" />;
    }
  };
  const LoginProtected = ({ children }) => {
    if (!user?.id) {
      return children;
    } else {
      return <Navigate to="/" />;
    }
  };

  return (
    <>
      <ScrollToTop />
      <Announcement />
      <Navbar />
      <CustomizedSnackbar />
      <Routes>
        <Route
          path="/main"
          element={
            <AdminProtected>
              <Main />
            </AdminProtected>
          }
        />
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            <LoginProtected>
              <Login />
            </LoginProtected>
          }
        />
        <Route
          path="/register"
          element={
            <LoginProtected>
              <Register />
            </LoginProtected>
          }
        />
        <Route path="/success" element={<Succes />} />
        <Route path="/productDetail/:title/:id" element={<ProductDetail />} />
        <Route path="/productlist/:category" element={<ProductList />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default App;
