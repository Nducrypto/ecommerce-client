// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useStateContext } from "./ContextProvider";

// const API = axios.create({ baseURL: process.env.REACT_APP_URL });

// const useFetch = (url) => {
//   const { filters, sort, setProducts, setFilteredProducts } = useStateContext();

//   useEffect(() => {
//     const getProducts = async () => {
//       try {
//         const { data } = await publicApi.get(
//           cat ? `/products?categories=${cat} ` : "/products "
//         );
//         setProducts(data);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     getProducts();
//   }, [cat]);

//   useEffect(() => {
//     if (cat) {
//       setFilteredProducts(
//         products.filter((item) =>
//           Object.entries(filters).every(([key, value]) =>
//             item[key].includes(value)
//           )
//         )
//       );
//     }
//   }, [cat, products, filters]);

//   useEffect(() => {
//     if (sort === "newest") {
//       setFilteredProducts((prev) =>
//         [...prev].sort((a, b) => a.createdAt - b.createdAt)
//       );
//     } else if (sort === "asc") {
//       setFilteredProducts((prev) =>
//         [...prev].sort((a, b) => a.price - b.price)
//       );
//     } else {
//       setFilteredProducts((prev) =>
//         [...prev].sort((a, b) => b.price - a.price)
//       );
//     }
//   }, [sort]);

//   //   useEffect(() => {
//   //     const fetchData = async () => {
//   //       //   setLoading(true);
//   //       try {
//   //         const { data } = await API.get(url);
//   //         setProducts(data);
//   //         // setLoading(false);
//   //       } catch (error) {
//   //         console.log(error);
//   //         // setError(err);
//   //       }
//   //     };
//   //     fetchData();
//   //   }, [url]);

//   return { data, loading, error, reFetch, setData, API };
// };

// export default useFetch;
