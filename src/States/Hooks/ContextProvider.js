import React, { createContext, useContext, useState } from "react";
import { useLocation } from "react-router-dom";

const stateContext = createContext();

export const ContextProvider = ({ children }) => {
  const location = useLocation();
  const cat = location.pathname.split("/")[2];
  const [filters, setFilters] = useState({});

  const [sort, setSort] = useState("newest");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

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
        cat,
      }}
    >
      {children}
    </stateContext.Provider>
  );
};

export const useStateContext = () => useContext(stateContext);
