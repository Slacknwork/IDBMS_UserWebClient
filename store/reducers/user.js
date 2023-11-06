import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "asdf",
  loggedIn: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsername: (username) => {
      state.username = username;
    },
  },
});

export const { setUsername } = userSlice.actions;

export default userSlice.reducer;
