import {
  Delete,
  // SearchOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../States/Hooks/ContextProvider";
import { useEffect } from "react";
import { publicApi } from "../../States/Api";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Grid,
} from "@mui/material";
// import FavoriteIcon from "@mui/icons-material/Favorite";

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

  const handleDelete = async (id) => {
    try {
      const { data } = await publicApi.patch(`/products/delete/${id}`);
      data.filter((p) => p._id !== id);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Grid
      sx={{ marginTop: "2rem" }}
      container
      justifyContent="center"
      alignItems="center"
      spacing={1}
    >
      {changer?.map((item) => (
        <Grid item xs={5} sm={2} md={2} lg={2} key={item._id} style={{}}>
          <Card>
            <div onClick={() => navigate(`/productDetail/${item._id}`)}>
              <CardMedia
                component="img"
                height="150"
                image={item.image}
                alt=""
              />
            </div>
            <CardContent
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography variant="body2" color="text.secondary">
                {item.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ${item.price}
              </Typography>
            </CardContent>
            <CardActions>
              <IconButton
                aria-label="delete"
                onClick={() => handleDelete(item._id)}
              >
                <Delete />
                {/* <ShareIcon /> */}
              </IconButton>
              {/* <SearchOutlined
                onClick={() => navigate(`/productDetail/${item._id}`)}
              /> */}
              <>
                <ShoppingCartOutlined
                  sx={{ float: "right" }}
                  onClick={() => navigate(`/cart`)}
                />
              </>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Products;
