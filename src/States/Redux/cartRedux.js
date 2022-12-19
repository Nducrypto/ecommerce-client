import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    product: [],
    total: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const item = state.product.find(
        (item) => item._id === action.payload._id
      );
      if (item) {
        item.quantity += action.payload.quantity;
        item.totalPrice += action.payload.totalPrice;
      } else {
        state.product.push(action.payload);
      }
      state.total += action.payload.totalPrice;
    },
    deleteFromCart: (state, action) => {
      state.product = state.product.filter((p) => p._id !== action.payload._id);
      state.total -= action.payload.totalPrice;
    },
    clearCart: (state) => {
      state.product = [];
      state.total = 0;
    },
    increaseQuantity: (state, action) => {
      const item = state.product.find(
        (item) => item._id === action.payload._id
      );
      item.quantity = action.payload.quantity + 1;
      item.totalPrice += action.payload.price;
      state.total += action.payload.price;
    },
    reduceQuantity: (state, action) => {
      const item = state.product.find(
        (item) => item._id === action.payload._id
      );

      if (item.quantity > 1) {
        item.quantity = action.payload.quantity - 1;
        item.totalPrice -= action.payload.price;
        state.total -= action.payload.price;
      }
    },
  },
});

export const {
  addToCart,
  deleteFromCart,
  clearCart,
  increaseQuantity,
  reduceQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
