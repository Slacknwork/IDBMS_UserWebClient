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
    setBasicInfo: (state, actions) => {
      state.name = actions.payload.name || state.name;
      state.projectCategoryId =
        actions.payload.projectCategoryId || state.projectCategoryId;
      state.description = actions.payload.description || state.description;
    },
    addSite(state) {
      state.sites.push({
        id: uniqueId(),
        name: "",
        usePurpose: "",
        address: "",
        description: "",
        floors: [],
      });
    },
    editSite(state, actions) {
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
    deleteSite(state, actions) {
      state.sites.splice(actions.payload.siteNo, 1);
    },
    addFloor(state, actions) {
      state.sites[actions.payload.siteNo].floors.push({
        id: uniqueId(),
        usePurpose: "",
        description: "",
        rooms: [],
      });
    },
    editFloor(state, actions) {
      const siteNo = actions.payload.siteNo;
      const floorNo = actions.payload.floorNo;

      state.sites[siteNo].floors[floorNo].usePurpose =
        actions.payload.usePurpose ||
        state.sites[siteNo].floors[floorNo].usePurpose;
      state.sites[siteNo].floors[floorNo].description =
        actions.payload.description ||
        state.sites[siteNo].floors[floorNo].description;
    },
    deleteFloor(state, actions) {
      state.sites[actions.payload.siteNo].floors.splice(
        actions.payload.floorNo,
        1
      );
    },
    addRoom(state, actions) {
      const siteNo = actions.payload.siteNo;
      const floorNo = actions.payload.floorNo;

      state.sites[siteNo].floors[floorNo].rooms.push({
        id: uniqueId(),
        roomType: 0,
        usePurpose: "",
        description: "",
        area: 0,
        suggestions: [],
      });
    },
    editRoom(state, actions) {
      const siteNo = actions.payload.siteNo;
      const floorNo = actions.payload.floorNo;
      const roomNo = actions.payload.roomNo;

      state.sites[siteNo].floors[floorNo].rooms[roomNo].roomType =
        actions.payload.roomType ||
        state.sites[siteNo].floors[floorNo].rooms[roomNo].roomType;

      state.sites[siteNo].floors[floorNo].rooms[roomNo].usePurpose =
        actions.payload.usePurpose ||
        state.sites[siteNo].floors[floorNo].rooms[roomNo].usePurpose;

      state.sites[siteNo].floors[floorNo].rooms[roomNo].description =
        actions.payload.description ||
        state.sites[siteNo].floors[floorNo].rooms[roomNo].description;

      state.sites[siteNo].floors[floorNo].rooms[roomNo].area =
        actions.payload.area ||
        state.sites[siteNo].floors[floorNo].rooms[roomNo].area;
    },
    deleteRoom(state, actions) {
      const siteNo = actions.payload.siteNo;
      const floorNo = actions.payload.floorNo;
      const roomNo = actions.payload.roomNo;

      state.sites[siteNo].floors[floorNo].rooms.splice(roomNo);
    },
  },
});

export const {
  setBasicInfo,
  addSite,
  editSite,
  deleteSite,
  addFloor,
  editFloor,
  deleteFloor,
  addRoom,
  editRoom,
  deleteRoom,
} = draftProjectSlice.actions;

export default draftProjectSlice.reducer;
