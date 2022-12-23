import { SearchOutlined, ShoppingCartOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../States/Hooks/ContextProvider";
import { useEffect } from "react";
import { publicApi } from "../../States/Api";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
  IconButton,
  Grid,
} from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const Products = () => {
  const navigate = useNavigate();

  const {
    setProducts,
    products,
    setFilteredProducts,
    filters,
    filteredProducts,
    sort,
    cat,
  } = useStateContext();

  // ========PRODUCTS USEEFFECT
  useEffect(() => {
    const getProducts = async () => {
      try {
        const { data } = await publicApi.get(
          cat ? `/products?categories=${cat}` : "/products"
        );
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, [cat, setProducts]);

  // ========FILTEREDPRODUCTS USEEFFECT
  useEffect(() => {
    if (cat) {
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
    }
  }, [cat, products, filters, setFilteredProducts]);

  // ========SORT USEEFFECT
  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
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
  const changer = cat ? filteredProducts : products;
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <Grid
        sx={{
          display: "flex",
          flexDirection: "row",
          // justifyContent: "center",
          // alignItems: "center",
        }}
        // container
        // // alignItems="center"
        // // spacing={3}
        container
        justifyContent="center"
        alignItems="center"
        spacing={3}
      >
        <Grid item xs={8} sm={4} md={4} lg={3}>
          {changer?.map((item) => (
            <Card key={item._id}>
              <CardHeader
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title={item.title}
              />
              <CardMedia
                component="img"
                height="150"
                image={item.image}
                alt=""
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                  <ShareIcon />
                </IconButton>
                <SearchOutlined
                  onClick={() => navigate(`/productDetail/${item._id}`)}
                />
                <ShoppingCartOutlined />
              </CardActions>
            </Card>
          ))}
        </Grid>
      </Grid>
    </div>
  );
};

export default Products;
