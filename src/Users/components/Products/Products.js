import { useNavigate, useParams } from "react-router-dom";
import "./products.css";
import useFetch from "../../../States/Hooks/useFetch";
import {
  Card,
  Typography,
  CardMedia,
  Grid,
  CircularProgress,
  Box,
} from "@mui/material";
import { useMemo } from "react";

const Products = () => {
  // ===USED THIS PARAMS {id} IN PRODUCTDETAIL===
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    products,
    isLoading,
    url,
    sortPrice,
    setSortPrice,
    filters,
    setFilters,
  } = useFetch("/products");

  // HOW TO DISPLAY ONE TITLE FROM MULTIPLE SIMILAR TITLES IN AN ARRAY
  // const titles = useMemo(
  //   () => [...new Set(products.map(({ title, price }) => ({ price, title })))],
  //   [products]
  // );
  const titles = useMemo(() => {
    const unique = [
      ...new Set(
        products
          .map(({ title, image, _id }) => ({ title, image, _id }))
          .filter(
            (product, index, array) =>
              array.findIndex((p) => p.title === product.title) === index
          )
      ),
    ];
    return unique;
  }, [products]);

  const changer =
    filters !== "All"
      ? products?.filter((item) => item.title.includes(filters))
      : url
      ? products?.filter((item) => (item.title === url) & (item._id !== id))
      : sortPrice
      ? products
      : titles;

  return (
    <div className="p-container">
      {!url && !id && (
        <div className="filterContainer">
          <div className="filter">
            <span className="filterText">Category</span>
            <select
              onChange={(e) => setFilters(e.target.value)}
              className="select"
            >
              <option selected value="All">
                All
              </option>

              {titles.map((item) => (
                <option key={item.title} value={item.title}>
                  {item.title}
                </option>
              ))}
            </select>
          </div>
          <div className="filter">
            <span className="filterText">Price</span>
            <select
              onChange={(e) => setSortPrice(e.target.value)}
              className="select"
            >
              <option selected disabled>
                Price
              </option>
              <option value="maximum">Maximum</option>
              <option value="minimum">Minimum</option>
            </select>
          </div>
        </div>
      )}

      {isLoading && <CircularProgress sx={{ fontSize: "4rem" }} />}

      <Grid container spacing={2} justifyContent="center" alignItems="center">
        {changer?.map((item) => (
          <Grid item xs={6} sm={3} md={2} key={item._id}>
            {/* <span className="freedelivery">free delivery</span> */}
            <Box
              sx={{
                position: "absolute",
                fontSize: "0.9rem",
                marginTop: ".3rem",
                marginLeft: "1%",
                backgroundColor:
                  item.title === "Bluetooth" || item.title === "T-shirt"
                    ? ""
                    : "orange",
                color: "white",
              }}
            >
              {item.title === "Bluetooth" || item.title === "T-shirt" ? (
                ""
              ) : (
                <>Free Delivery</>
              )}
            </Box>
            <Card
              sx={{
                cursor: "pointer",
                borderRadius: "0.5rem",
                boxShadow: "0.5rem 0.2rem 0.4rem grey",
                "&:hover": {
                  transform: "scale(1.04)",
                },
              }}
              onClick={() =>
                navigate(`/productDetail/${item.title}/${item._id}`, {
                  state: { id: item._id },
                })
              }
            >
              <CardMedia
                sx={{ height: { xs: 150, sm: 200, md: 200 } }}
                image={item.image}
                title=""
              />
              <Typography gutterBottom fontSize="1rem" component="div">
                {item.title}s
              </Typography>
              <Typography fontSize="1rem" color="black">
                {filters !== "All" || url || sortPrice ? (
                  <>&#8358; {Intl.NumberFormat().format(item.price)}</>
                ) : null}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Products;
