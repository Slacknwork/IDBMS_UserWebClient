import { uniqueId } from "lodash";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  projectCategoryId: 0,
  description: "",
  sites: [],
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
    addDraftProjectSite(state) {
      state.sites.push({
        id: uniqueId(),
        name: "",
        usePurpose: "",
        address: "",
        description: "",
        floors: [],
      });
    },
    editDraftProjectSite(state, actions) {
      const siteNo = actions.payload.siteNo;
      state.sites[siteNo].name =
        actions.payload.name || state.sites[siteNo].name;
      state.sites[siteNo].usePurpose =
        actions.payload.usePurpose || state.sites[siteNo].usePurpose;
      state.sites[siteNo].address =
        actions.payload.address || state.sites[siteNo].address;
      state.sites[siteNo].description =
        actions.payload.description || state.sites[siteNo].description;
    },
    deleteDraftProjectSite(state, actions) {
      state.sites.splice(actions.payload.siteNo, 1);
    },
  },
});

export const {
  setDraftProjectBasicInfo,
  addDraftProjectSite,
  editDraftProjectSite,
} = draftProjectSlice.actions;

export default draftProjectSlice.reducer;
