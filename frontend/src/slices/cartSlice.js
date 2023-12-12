import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [], shippingAddress: {} };

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;

      const existItem = state.cartItems.find(
        (item) => item._id === newItem._id
      );
      if (existItem) {
        state.cartItems = state.cartItems.map((item) =>
          item._id === existItem._id ? newItem : item
        );
      } else {
        state.cartItems.push(newItem);
      }
      localStorage.setItem("cart", JSON.stringify(state));
    },
    decreaseQuantity: (state, action) => {
      const id = action.payload;
      state.cartItems = state.cartItems.map((item) =>
        item._id === id ? { ...item, quantity: item.quantity - 1 } : item
      );
      console.log(state.cartItems);
      localStorage.setItem("cart", JSON.stringify(state));
    },

    removeFromCart: (state, action) => {
      const id = action.payload;
      state.cartItems = state.cartItems.filter((item) => item._id !== id);
      localStorage.setItem("cart", JSON.stringify(state));
    },
    clearCart: (state) => {
      state.cartItems = [];
      localStorage.removeItem("cart");
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const {
  addToCart,
  clearCart,
  decreaseQuantity,
  removeFromCart,
  saveShippingAddress,
} = cartSlice.actions;
export default cartSlice.reducer;
