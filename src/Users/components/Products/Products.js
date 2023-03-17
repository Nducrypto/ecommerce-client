import { useNavigate } from "react-router-dom";

import "./products.css";

import useFetch from "../../../States/Hooks/useFetch";
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  CardActions,
  Grid,
  CardHeader,
  Rating,
  CircularProgress,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
const Products = () => {
  const navigate = useNavigate();

  const { products, isLoading, url } = useFetch("/products");

  const changer = url
    ? products?.filter((item) => item.title === url)
    : products;

  return (
    <div className="p-container">
      {isLoading && <CircularProgress sx={{ fontSize: "4rem" }} />}

      <Grid container spacing={2} justifyContent="center" alignItems="center">
        {changer?.map((item) => (
          <Grid item xs={12} sm={3} md={2} key={item._id}>
            {/* <span className="freedelivery">free delivery</span> */}

            <Card
              sx={{
                cursor: "pointer",
                borderRadius: "0.5rem",
                boxShadow: "0.5rem 0.2rem 0.4rem grey",
                "&:hover": {
                  transform: "scale(1.04)",
                },
              }}
              onClick={() => navigate(`/productDetail/${item._id}`)}
            >
              <CardHeader
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
                  height: "0.1rem",
                }}
                action={
                  <>
                    {item.title === "Bluetooth" || item.title === "T-shirt" ? (
                      ""
                    ) : (
                      <>Free Delivery</>
                    )}
                  </>
                }
              />
              <CardMedia sx={{ height: 200 }} image={item.image} title="" />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  &#8358; {Intl.NumberFormat().format(item.price)}
                </Typography>
              </CardContent>
              <CardActions>
                <Rating
                  name="text-feedback"
                  value={item.rating}
                  readOnly
                  precision={item.rating}
                  emptyIcon={
                    <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                  }
                />
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Products;
