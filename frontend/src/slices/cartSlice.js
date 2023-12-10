import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
};

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
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    }, 
    decreaseQuantity: (state, action) => {
      const id = action.payload;
      state.cartItems = state.cartItems.map((item) =>
        item._id === id ? { ...item, quantity: item.quantity - 1 } : item
      );
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    

    removeFromCart: (state, action) => {
      const id = action.payload;
      state.cartItems = state.cartItems.filter((item) => item._id !== id);
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    clearCart: (state) => {
      state.cartItems = [];
      localStorage.removeItem("cartItems");
    },
  },
});

export const { addToCart, clearCart, decreaseQuantity, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
