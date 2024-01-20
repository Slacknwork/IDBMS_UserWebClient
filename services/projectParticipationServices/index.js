import { store } from "/store";
import { fetchData } from "/utils/api";

const endpoint = "/ProjectParticipations";
const getProjectParticipation = async ({
  projectId = "",
  userId = "",
} = {}) => {
  try {
    const token = store.getState().customer?.token ?? "";
    const url = `${endpoint}?userId=${userId}&projectId=${projectId}`;
    const response = await fetchData({
      url: `${url}`,
      method: "GET",
      token,
      body: null,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching all project participations:", error);
    throw error;
  }
};

const getAllProjectParticipations = async ({
  role = "",
  search = "",
  pageSize = "",
  pageNo = "",
} = {}) => {
  try {
    const token = store.getState().customer?.token ?? "";
    const url = `${endpoint}?role=${role}&name=${search}&pageSize=${pageSize}&pageNo=${pageNo}`;
    const response = await fetchData({
      url,
      method: "GET",
      token,
      body: null,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching all project participations:", error);
    throw error;
  }
};

const getParticipationsByUserId = async ({
  userId = "",
  role = "",
  search = "",
  pageSize = "",
  pageNo = "",
  status = "",
} = {}) => {
  try {
    const token = store.getState().customer?.token ?? "";
    const url = `${endpoint}/user/${userId}?role=${role}&projectName=${search}&pageSize=${pageSize}&pageNo=${pageNo}&projectStatus=${status}`;
    const response = await fetchData({
      url,
      method: "GET",
      token,
      body: null,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching participations by user ID:", error);
    throw error;
  }
};

const getProjectParticipationInProjectByUserView = async ({
  projectId,
  search,
  pageSize = "",
  page = "",
} = {}) => {
  try {
    const token = store.getState().customer?.token ?? "";
    const url = `${endpoint}/user-view?pageSize=${pageSize}&pageNo=${page}&name=${search}`;
    const response = await fetchData({
      url: `${url}${projectId ? "&projectId=" + projectId : ""}`,
      method: "GET",
      token,
      body: null,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching participations by project ID:", error);
    throw error;
  }
};

const getUsersByParticipationInProject = async ({ projectId } = {}) => {
  try {
    const token = store.getState().customer?.token ?? "";
    const url = `${endpoint}/project/${projectId}/users`;
    const response = await fetchData({
      url,
      method: "GET",
      token,
      body: null,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching users by participate in project ID:", error);
    throw error;
  }
};

const createProjectParticipation = async (request) => {
  try {
    const token = store.getState().customer?.token ?? "";
    const url = `${endpoint}`;
    const response = await fetchData({
      url,
      method: "POST",
      contentType: "application/json",
      token,
      body: JSON.stringify(request),
    });
    return response.data;
  } catch (error) {
    console.error("Error creating project participation:", error);
    throw error;
  }
};

const createEmployees = async (request) => {
  try {
    const token = store.getState().customer?.token ?? "";
    const url = `${endpoint}/employees`;
    const response = await fetchData({
      url,
      method: "POST",
      contentType: "application/json",
      token,
      body: JSON.stringify(request),
    });
    return response.data;
  } catch (error) {
    console.error("Error creating employees project participations:", error);
    throw error;
  }
};

const updateProjectParticipation = async (participationId, request) => {
  try {
    const token = store.getState().customer?.token ?? "";
    const url = `${endpoint}/${participationId}`;
    const response = await fetchData({
      url,
      method: "PUT",
      contentType: "application/json",
      token,
      body: JSON.stringify(request),
    });
    return response.data;
  } catch (error) {
    console.error("Error updating project participation:", error);
    throw error;
  }
};

const deleteProjectParticipation = async (participationId) => {
  try {
    const token = store.getState().customer?.token ?? "";
    const url = `${endpoint}/${participationId}`;
    const response = await fetchData({
      url,
      method: "DELETE",
      token,
      body: null,
    });
    return response.message;
  } catch (error) {
    console.error("Error deleting project participation:", error);
    throw error;
  }
};

const getParticipationsUserView = async ({
  projectId = "",
  search = "",
  page = "",
  pageSize = "",
} = {}) => {
  try {
    const token = store.getState().customer?.token ?? "";
    const url = `${endpoint}/user-view`;
    const response = await fetchData({
      url,
      method: "GET",
      token,
      body: null,
    });
    return response.data;
  } catch (error) {
    console.error("Error getting project participation:", error);
    throw error;
  }
};

const createParticipationByEmail = async (email, projectId) => {
  try {
    const token = store.getState().customer?.token ?? "";
    const url = `${endpoint}/addviewer?projectId=${projectId}`;
    const response = await fetchData({
      url,
      method: "POST",
      contentType: "application/json",
      token,
      body: JSON.stringify(email),
    });
    return response.data;
  } catch (error) {
    console.error("Error getting project participation:", error);
    throw error;
  }
};

export {
  getProjectParticipation,
  getAllProjectParticipations,
  getParticipationsByUserId,
  getProjectParticipationInProjectByUserView,
  getUsersByParticipationInProject,
  createProjectParticipation,
  createEmployees,
  updateProjectParticipation,
  deleteProjectParticipation,
  getParticipationsUserView,
  createParticipationByEmail,
};
