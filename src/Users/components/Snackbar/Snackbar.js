import { Snackbar, Alert, Container } from "@mui/material";
import React from "react";
import { useStateContext } from "../../../States/Hooks/ContextProvider";

const CustomizedSnackbar = () => {
  const { setSnackBarOpen, snackBarOpen } = useStateContext();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setSnackBarOpen(false);
  };

  return (
    <Container
      sx={{
        width: "100%",
        zIndex: "150000",
      }}
    >
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        open={snackBarOpen}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          elevation={6}
          variant="filled"
        >
          {snackBarOpen === "deleteFromCart"
            ? "Deleted Successfuly"
            : snackBarOpen === "clearCat"
            ? "Cart Cleared Successfully"
            : snackBarOpen === "addToCart"
            ? "Added To Cart Successfully"
            : null}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CustomizedSnackbar;
