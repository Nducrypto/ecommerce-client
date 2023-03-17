import React, { createContext, useContext, useState } from "react";

const stateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [stripeToken, setStripeToken] = useState(null);
  const [open, setOpen] = useState(false);
  const [snackBarOpen, setSnackBarOpen] = useState("");

  return (
    <stateContext.Provider
      value={{
        stripeToken,
        setStripeToken,
        open,
        setOpen,
        snackBarOpen,
        setSnackBarOpen,
      }}
    >
      {children}
    </stateContext.Provider>
  );
};

export const useStateContext = () => useContext(stateContext);
