import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    product: [],
    subTotal: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      // ==== Check if product already exist before adding to cart
      const item = state.product.find(
        (item) => item._id === action.payload._id
      );
      if (item) {
        item.quantity += action.payload.quantity;
        item.color = action.payload.color;
        item.size = action.payload.size;
        item.totalPrice += action.payload.totalPrice;
      } else {
        state.product.push(action.payload);
      }
      state.subTotal += action.payload.totalPrice;
    },
    deleteFromCart: (state, action) => {
      state.product = state.product.filter((p) => p._id !== action.payload._id);
      state.subTotal -= action.payload.totalPrice;
    },
    clearCart: (state) => {
      state.product = [];
      state.subTotal = 0;
    },
    increaseQuantity: (state, action) => {
      // ==== Check if product already exist before increasing quantity

      const item = state.product.find(
        (item) => item._id === action.payload._id
      );
      item.quantity = action.payload.quantity + 1;
      item.totalPrice += action.payload.price;
      state.subTotal += action.payload.price;
    },
    reduceQuantity: (state, action) => {
      const item = state.product.find(
        (item) => item._id === action.payload._id
      );

      if (item.quantity > 1) {
        item.quantity = action.payload.quantity - 1;
        item.totalPrice -= action.payload.price;
        state.subTotal -= action.payload.price;
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
