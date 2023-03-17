import { useEffect, useState } from "react";
import { publicApi } from "../Api/index";
import { useLocation } from "react-router-dom";

// const API = axios.create({ baseURL: process.env.REACT_APP_URL });

const useFetch = (route) => {
  const location = useLocation();
  const url = location.pathname.split("/")[2];
  const [filters, setFilters] = useState({});

  const [sort, setSort] = useState("newest");
  console.log(sort);
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        setIsLoading(true);
        const { data } = await publicApi.get(route);
        setProducts(data);
        setIsLoading(false);

        // const { data } = await publicApi.get(
        //   cat ? `/products?categories=${cat} ` : "/products "
        // );
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, [route]);

  //   useEffect(() => {
  //     if (url) {
  //       setFilteredProducts(
  //         products?.filter((item) => item.title === url),
  //         products?.filter((item) =>
  //           Object.entries(filters).every(([key, value]) =>
  //             item[key].includes(value)
  //           )
  //         )
  //       );
  //     }
  //   }, [filters, products, url]);

  useEffect(() => {
    if (sort === "newest") {
      setProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setProducts((prev) => [...prev].sort((a, b) => a.price - b.price));
    } else {
      setProducts((prev) => [...prev].sort((a, b) => b.price - a.price));
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
