import { uniqueId } from "lodash";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  companyName: "",
  companyAddress: "",
  companyCode: "",
  description: "",
  projectCategoryId: 0,
  language: 0,
  projectDesignId: 0,
  estimateBusinessDay: 0,
  basedOnDecorProjectId: "",
  documents: [],
  projectDesigns: [],
  totalArea: 0,
  totalPrice: 0,
  sites: [],
};

const calculate = (state, actions) => {
  const siteNo = actions.payload.siteNo;
  const floorNo = actions.payload.floorNo;

  const site = state.sites[siteNo];
  const floor = state.sites[siteNo]?.floors[floorNo];

  if (floor) {
    floor.totalArea = floor.rooms.reduce(
      (acc, room) => acc + Number(room.area),
      0
    );
    floor.totalPrice = floor.rooms.reduce(
      (acc, room) => acc + room.pricePerArea * room.area,
      0
    );
  }

  if (site) {
    site.totalArea = site.floors.reduce(
      (acc, floor) => acc + floor.totalArea,
      0
    );
    site.totalPrice = site.floors.reduce(
      (acc, floor) => acc + floor.totalPrice,
      0
    );
  }

  state.totalArea = state.sites?.reduce((acc, site) => acc + site.totalArea, 0);
  state.totalPrice = state.sites?.reduce(
    (acc, site) => acc + site.totalPrice,
    0
  );

  state.projectDesignId = 0;
  state.estimateBusinessDay = 0;

  state.projectDesigns.forEach((design) => {
    if (
      state.totalPrice > design.minBudget &&
      state.totalPrice <= design.maxBudget
    ) {
      state.projectDesignId = design.id;
      state.estimateBusinessDay = design.estimateBusinessDay;
    }
  });
};

export const draftProjectSlice = createSlice({
  name: "draftProject",
  initialState,
  reducers: {
    reset: () => initialState,

    setBasicInfo: (state, actions) => {
      state.name = actions.payload.name || state.name;
      state.companyName = actions.payload.companyName || state.companyName;
      state.companyAddress =
        actions.payload.companyAddress || state.companyAddress;
      state.companyCode = actions.payload.companyCode || state.companyCode;
      state.projectCategoryId =
        actions.payload.projectCategoryId || state.projectCategoryId;
      state.description = actions.payload.description || state.description;
      state.language = actions.payload.language || state.language;
      state.projectDesignId =
        actions.payload.projectDesignId || state.projectDesignId;
      state.estimateBusinessDay =
        actions.payload.estimateBusinessDay || state.estimateBusinessDay;
      state.projectDesigns =
        actions.payload.projectDesigns || state.projectDesigns;
      state.basedOnDecorProjectId =
        actions.payload.basedOnDecorProjectId || state.basedOnDecorProjectId;
    },

    addSite(state) {
      state.sites.push({
        id: uniqueId(),
        name: "",
        usePurpose: "",
        address: "",
        description: "",
        totalArea: 0,
        totalPrice: 0,
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
      calculate(state, actions);
    },

    addFloor(state, actions) {
      state.sites[actions.payload.siteNo].floors.push({
        id: uniqueId(),
        usePurpose: "",
        description: "",
        totalArea: 0,
        totalPrice: 0,
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
      calculate(state, actions);
    },

    addRoom(state, actions) {
      const siteNo = actions.payload.siteNo;
      const floorNo = actions.payload.floorNo;

      state.sites[siteNo].floors[floorNo].rooms.push({
        id: uniqueId(),
        roomTypeId: 0,
        roomTypeName: "",
        usePurpose: "",
        description: "",
        area: 0,
        pricePerArea: 0,
        tasks: [],
      });
    },
    editRoom(state, actions) {
      const siteNo = actions.payload.siteNo;
      const floorNo = actions.payload.floorNo;
      const roomNo = actions.payload.roomNo;

      const room = state.sites[siteNo].floors[floorNo].rooms[roomNo];

      room.roomTypeId = actions.payload.roomTypeId || room.roomTypeId;
      room.roomTypeName = actions.payload.roomTypeName || room.roomTypeName;
      room.usePurpose = actions.payload.usePurpose || room.usePurpose;
      room.description = actions.payload.description || room.description;
      room.area = actions.payload.area || room.area;
      room.pricePerArea = actions.payload.pricePerArea || room.pricePerArea;

      calculate(state, actions);
    },
    deleteRoom(state, actions) {
      const siteNo = actions.payload.siteNo;
      const floorNo = actions.payload.floorNo;
      const roomNo = actions.payload.roomNo;

      state.sites[siteNo].floors[floorNo].rooms.splice(roomNo);
      calculate(state, actions);
    },

    addTask(state, actions) {
      const siteNo = actions.payload.siteNo;
      const floorNo = actions.payload.floorNo;
      const roomNo = actions.payload.roomNo;

      state.sites[siteNo].floors[floorNo].rooms[roomNo].tasks.push({
        id: uniqueId(),
        name: actions.payload.name || "",
        description: actions.payload.description || "",
        interiorItemId: actions.payload.interiorItemId || "",
        interiorItemName: actions.payload.interiorItemName || "",
        calculationUnit: actions.payload.calculationUnit || 0,
        unitInContract: actions.payload.unitInContract || 0,
      });
    },
    editTask(state, actions) {
      const siteNo = actions.payload.siteNo;
      const floorNo = actions.payload.floorNo;
      const roomNo = actions.payload.roomNo;
      const taskNo = actions.payload.taskNo;

      const task =
        state.sites[siteNo].floors[floorNo].rooms[roomNo].tasks[taskNo];

      task.name = actions.payload.name || task.name;
      task.description = actions.payload.description || task.description;
      task.interiorItemId =
        actions.payload.interiorItemId || task.interiorItemId;
      task.interiorItemName =
        actions.payload.interiorItemName || task.interiorItemName;
      task.calculationUnit =
        actions.payload.calculationUnit || task.calculationUnit;
      task.unitInContract =
        actions.payload.unitInContract || task.unitInContract;
    },
    deleteTask(state, actions) {
      const siteNo = actions.payload.siteNo;
      const floorNo = actions.payload.floorNo;
      const roomNo = actions.payload.roomNo;
      const taskNo = actions.payload.taskNo;

      state.sites[siteNo].floors[floorNo].rooms[roomNo].tasks.splice(taskNo);
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
  addTask,
  editTask,
  deleteTask,
} = draftProjectSlice.actions;

export default draftProjectSlice.reducer;
