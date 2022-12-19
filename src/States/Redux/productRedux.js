import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    isLoading: false,
    isError: false,
  },
  reducers: {
    getProductStarts: (state) => {
      state.isLoading = true;
      state.isError = false;
    },
    getProductSuccess: (state, action) => {
      state.products = action.payload;
      state.isLoading = false;
    },
    getProductFailure: (state) => {
      state.isError = false;
      state.isLoading = false;
    },

    createProduct: (state, action) => {
      state.products.push(action.payload);
      state.isLoading = false;
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter(
        (p) => p._id !== action.payload._id
      );
    },
  },
});

export const {
  getProductStarts,
  getProductSuccess,
  createProduct,
  getProductFailure,
  deleteProduct,
} = productSlice.actions;
export default productSlice.reducer;
