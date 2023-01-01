import {
  Delete,
  //  ShoppingCartOutlined
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../../States/Hooks/ContextProvider";
import { useEffect } from "react";
import { publicApi } from "../../../States/Api";

import "./products.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Products = () => {
  const user = JSON.parse(localStorage.getItem("userRedux"));
  const navigate = useNavigate();

  const {
    setProducts,
    products,
    setFilteredProducts,
    filteredProducts,
    sort,
    url,
    filters,
    // setLoading,
    // loading,
  } = useStateContext();

  // ========PRODUCTS And FILTEREDPRODUCt USEEFFECT
  useEffect(() => {
    const getProducts = async () => {
      try {
        const { data } = await publicApi.get("/products");
        setProducts(data);
      } catch (error) {
        // console.log(error);
      }
    };
    if (url) {
      setFilteredProducts(
        products.filter((item) => item.title === url),
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
    }
    getProducts();
  }, [url, products, setFilteredProducts, setProducts, filters]);

  // ========FILTEREDPRODUCTS USEEFFECT
  // useEffect(() => {
  //   if (url) {
  //     setFilteredProducts(
  //       products.filter((item) => item.title === url)
  //       // products.filter((item) =>
  //       //   Object.entries(filters).every(([key, value]) =>
  //       //     item[key].includes(value)
  //       //   )
  //       // )
  //     );
  //   }
  // }, [url, products, filters, setFilteredProducts]);

  // ========SORT USEEFFECT
  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "high") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort, setFilteredProducts]);

  // const changer = cat ? filteredProducts : products.slice(0, 2);
  const changer = url ? filteredProducts : products;

  const handleDelete = async (id) => {
    try {
      const { data } = await publicApi.patch(`/products/delete/${id}`);
      data.filter((p) => p._id !== id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-container">
      {url && !changer.length ? (
        <h1 style={{ textAlign: "center", fontSize: "2rem" }}>Out Of Stock</h1>
      ) : (
        <Swiper
          slidesPerView={3}
          spaceBetween={4}
          modules={[Pagination, Navigation]}
          // className="mySwiper"
          loopFillGroupWithBlank={true}
          slidesPerGroup={2}
          loop={true}
          navigation={true}
        >
          {changer?.map((item) => (
            <SwiperSlide key={item._id}>
              <div
                className="p-imgDiv"
                onClick={() => navigate(`/productDetail/${item._id}`)}
              >
                <img className="p-image" src={item.image} alt="" />
              </div>
              <div className="left-s">
                <div className="name">
                  <div className="p-title">{item.title}</div>

                  <div className="p-price">
                    &#8358; {Intl.NumberFormat().format(item.price)}
                  </div>
                </div>

                {user?.isAdmin && (
                  <div style={{ display: "flex" }}>
                    <Delete onClick={() => handleDelete(item._id)} />

                    {/* <div>
                  <ShoppingCartOutlined
                    sx={{ float: "right", backgroundColor: "red" }}
                    onClick={() => navigate(`/cart`)}
                  />
                </div> */}
                  </div>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default Products;
