import React, { createContext, useContext, useState } from "react";
import { useLocation } from "react-router-dom";

const stateContext = createContext();

export const ContextProvider = ({ children }) => {
  const location = useLocation();
  const url = location.pathname.split("/")[2];
  const [filters, setFilters] = useState({});

  const [sort, setSort] = useState("newest");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [stripeToken, setStripeToken] = useState(null);
  const [open, setOpen] = useState(false);
  const [snackBarOpen, setSnackBarOpen] = useState("");

  return (
    <stateContext.Provider
      value={{
        filters,
        setFilters,
        sort,
        setSort,
        products,
        setProducts,
        filteredProducts,
        setFilteredProducts,
        url,
        stripeToken,
        setStripeToken,
        open,
        setOpen,
        // loading,
        snackBarOpen,
        setSnackBarOpen,
      }}
    >
      {children}
    </stateContext.Provider>
  );
};

export const useStateContext = () => useContext(stateContext);
