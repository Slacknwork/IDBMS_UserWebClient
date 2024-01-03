import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  token: "",
  username: "",
  loggedIn: false,
};

export const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    login: (state, actions) => {
      state.id = actions.payload.id || state.id;
      state.token = actions.payload.token || state.token;
      state.username = actions.payload.name || state.username;
      state.loggedIn = true;
    },
    logout: (state) => {
      state.id = "";
      state.token = "";
      state.username = "";
      state.loggedIn = false;
    },
  },
});

export const { login, logout } = customerSlice.actions;

export default customerSlice.reducer;
