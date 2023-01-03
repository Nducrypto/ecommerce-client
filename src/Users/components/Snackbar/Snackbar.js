import { Snackbar, Alert, Container, Slide } from "@mui/material";
import React from "react";
import { useStateContext } from "../../../States/Hooks/ContextProvider";

const CustomizedSnackbar = ({
  message,
  variant,
  anchorOrigin,
  direction,
  severity,
}) => {
  const { setSnackBarOpen, snackBarOpen } = useStateContext();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setSnackBarOpen(false);
  };

  const TransitionLeft = (props) => {
    return <Slide {...props} direction={direction} />;
  };

  return (
    <Container
      sx={{
        width: "100%",
        zIndex: "150000",
      }}
    >
      <Snackbar
        TransitionComponent={TransitionLeft}
        anchorOrigin={anchorOrigin}
        open={snackBarOpen}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={severity}
          elevation={6}
          variant={variant}
        >
          {message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CustomizedSnackbar;
