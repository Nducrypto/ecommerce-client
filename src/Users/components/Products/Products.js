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
  const { products, isLoading, url, setSort, filters, setFilters } =
    useFetch("/products");

  const searching = products?.filter((item) => item.title.includes(filters));

  const changer = url
    ? products?.filter((item) => (item.title === url) & (item._id !== id))
    : filters !== "All"
    ? searching
    : products;

  // HOW TO DISPLAY ONE TITLE FROM MULTIPLE SIMILAR TITLES IN AN ARRAR
  const titles = useMemo(
    () => [...new Set(products.map(({ title }) => title))],
    [products]
  );

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
              {titles.map((title) => (
                <option key={title} value={title}>
                  {title}
                </option>
              ))}
            </select>
          </div>
          <div className="filter">
            <span className="filterText">Price</span>
            <select
              onChange={(e) => setSort(e.target.value)}
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
                {item.title}
              </Typography>
              <Typography fontSize="1rem" color="black">
                &#8358; {Intl.NumberFormat().format(item.price)}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Products;
