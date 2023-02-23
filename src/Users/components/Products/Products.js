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
  const navigate = useNavigate();

  const {
    setProducts,
    products,
    setFilteredProducts,
    filteredProducts,
    sort,
    url,
    filters,
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

  return (
    <div className="p-container">
      {url && !changer.length ? (
        <h1 style={{ textAlign: "center", fontSize: "2rem" }}>Out Of Stock</h1>
      ) : (
        <Swiper
          slidesPerView={2}
          spaceBetween={10}
          modules={[Pagination, Navigation]}
          // className="mySwiper"
          loopFillGroupWithBlank={true}
          slidesPerGroup={1}
          loop={true}
          navigation={url ? false : true}
        >
          {changer?.map((item) => (
            <SwiperSlide key={item._id}>
              <div
                className="p-imgDiv"
                onClick={() => navigate(`/productDetail/${item._id}`)}
              >
                <img
                  className={
                    item.title === "Watch" ? "p-watch-image" : "p-image"
                  }
                  src={item.image}
                  alt=""
                />
              </div>
              <div className="left-s">
                <div className="name">
                  <div className="p-title">{item.title}</div>

                  <div className="p-price">
                    &#8358; {Intl.NumberFormat().format(item.price)}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default Products;
