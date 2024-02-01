import { createSlice } from '@reduxjs/toolkit';

export const paymentSlice = createSlice({
  name: 'payment',
  initialState: {
    success: false,
  },
  reducers: {
    paymentSuccess: (state) => {
      state.success = true;
      console.log("Payment Success: ", state.success);
    },
    resetPayment: (state) => {
      state.success = false;
    },
  },
});

export const { paymentSuccess, resetPayment } = paymentSlice.actions;

export default paymentSlice.reducer;