import { useEffect, useState } from "react";
import { publicApi } from "../Api/index";
import { useLocation } from "react-router-dom";

// const API = axios.create({ baseURL: process.env.REACT_APP_URL });

const useFetch = (route) => {
  const location = useLocation();
  const url = location.pathname.split("/")[2];

  const [filters, setFilters] = useState("");

  const [sort, setSort] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        setIsLoading(true);
        const { data } = await publicApi.get(route);
        setProducts(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, [route]);

  // useEffect(() => {
  //   if (filters) {
  //     // setProducts(
  //     // products?.filter((item) => item.title === filters);
  //     products?.filter((item) =>
  //       Object.entries(filters).every(([key, value]) =>
  //         item[key].includes(value)
  //       )
  //     );
  //     // );
  //   }
  // }, [filters, products]);

  useEffect(() => {
    if (sort === "maximum") {
      setProducts((prev) => [...prev].sort((a, b) => b.price - a.price));
    } else if (sort === "minimum") {
      setProducts((prev) => [...prev].sort((a, b) => a.price - b.price));
    }
  }, [sort]);

  return {
    products,
    url,
    isLoading,
    publicApi,

    filters,
    setFilters,
    sort,
    setSort,
  };
};

export default useFetch;
