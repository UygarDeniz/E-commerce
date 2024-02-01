import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null,
  loading: false,
  error: false,
  success: false,
  message: "",
};

export const register = createAsyncThunk(
  "user/register",
  async (formData, thunkAPI) => {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        return thunkAPI.rejectWithValue(errorData.message);
      }

      return await res.json();
    } catch (error) {
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
);

export const login = createAsyncThunk(
  "user/login",
  async (formData, thunkAPI) => {
    try {
      const res = await fetch("api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        return thunkAPI.rejectWithValue(errorData.message);
      }
      const data = await res.json();
      localStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk("user/logout", async (_, thunkAPI) => {
  try {
    const res = await fetch("/api/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    localStorage.removeItem("userInfo");
    return await res.json();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: (state, action) => {
      state.loading = false;
      state.error = false;
      state.success = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.userInfo = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.success = false;
        state.message = action.payload;
      })
      .addCase(login.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.userInfo = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.success = false;
        state.message = action.payload;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.userInfo = null;
      })
  },
});
export const { reset } = userSlice.actions;
export default userSlice.reducer;
