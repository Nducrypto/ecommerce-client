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
    getProductFailure: (state, action) => {
      state.isError = action.payload;
      state.isLoading = false;
    },

    createProduct: (state, action) => {
      state.products.push(action.payload);
      state.isLoading = false;
    },
    deleteProduct: (state, action) => {
      state.products.splice(
        state.products.findIndex((item) => item._id === action.payload),
        1
      );

      // state.products = state.products.filter((p) => p._id !== action.payload);
    },
    updateProduct: (state, action) => {
      state.products[
        state.products.findIndex((item) => item._id === action.payload._id)
      ] = action.payload;

      // state.products = state.products.map((item) =>
      //   item._id === action.payload._id ? action.payload : item
      // );
    },
  },
});

export const {
  getProductStarts,
  getProductSuccess,
  createProduct,
  getProductFailure,
  deleteProduct,
  updateProduct,
} = productSlice.actions;
export default productSlice.reducer;
