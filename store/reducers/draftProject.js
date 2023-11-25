import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  projectCategoryId: 0,
  description: "",
};

export const draftProjectSlice = createSlice({
  name: "draftProject",
  initialState,
  reducers: {
    setDraftProjectBasicInfo: (state, actions) => {
      state.name = actions.payload.name || state.name;
      state.projectCategoryId =
        actions.payload.projectCategoryId || state.projectCategoryId;
      state.description = actions.payload.description || state.description;
    },
  },
});

export const { setDraftProjectBasicInfo } = draftProjectSlice.actions;

export default draftProjectSlice.reducer;
