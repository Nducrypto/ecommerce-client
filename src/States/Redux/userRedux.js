import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    authData: null,
    loading: false,
    error: false,
  },
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      localStorage.setItem("userRedux", JSON.stringify({ ...action.payload }));
      state.authData = action.payload;
      state.loading = false;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    Logout: (state) => {
      localStorage.clear("userRedux");
      // state.authData = null;
      state.loading = false;
      state.error = false;
    },
  },
});

export const { loginStart, loginFailure, loginSuccess, Logout } =
  userSlice.actions;
export default userSlice.reducer;
