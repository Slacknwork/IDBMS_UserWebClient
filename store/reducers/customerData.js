import { createSlice } from "@reduxjs/toolkit";

import { getAdvertisementProjectById } from "/services/advertisementServices";
import { getProjectParticipation } from "/services/projectParticipationServices";
import { getProjectById } from "/services/projectServices";

const initialState = {
  project: { name: "Dự án", type: 0, status: 0, language: 0 },
  participationRole: { userId: "", projectId: "", role: "" },
};

export const customerDataSlice = createSlice({
  name: "customerData",
  initialState,
  reducers: {
    setProject: (state, actions) => {
      state.project = actions.payload.project || state.project;
    },
    clearProject: (state) => {
      state.project = { name: "Dự án", type: 0, status: 0, language: 0 };
    },
    setParticipationRole: (state, actions) => {
      state.participationRole =
        actions.payload.participationRole || state.participationRole;
    },
    clearParticipationRole: (state) => {
      state.participationRole = { userId: "", projectId: "", role: "" };
    },
  },
});

export const fetchAdvertisementProjectData = (id) => {
  return async (dispatch) => {
    try {
      const response = await getAdvertisementProjectById(id);
      dispatch(setProject({ project: response }));
    } catch (error) {
      dispatch(clearProject());
    }
  };
};

export const fetchProjectData = (id) => {
  return async (dispatch) => {
    try {
      const response = await getProjectById(id);
      dispatch(setProject({ project: response }));
    } catch (error) {
      dispatch(clearProject());
    }
  };
};

export const fetchParticipationRoleData = ({ userId, projectId } = {}) => {
  return async (dispatch) => {
    try {
      const response = await getProjectParticipation({ userId, projectId });
      dispatch(setParticipationRole({ participationRole: response }));
    } catch (error) {
      dispatch(clearProject());
    }
  };
};

export const {
  setProject,
  clearProject,
  setParticipationRole,
  clearParticipationRole,
} = customerDataSlice.actions;

export default customerDataSlice.reducer;
