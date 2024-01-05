import { store } from "/store";
import { fetchData } from "/utils/api";

const endpoint = "/Floors";
const getFloorsByProjectId = async ({
  projectId = "",
  search = "",
  page = "",
  pageSize = "",
} = {}) => {
  try {
    const token = store.getState().customer?.token ?? "";
    const url = `${endpoint}/project/${projectId}?noOfFloor=${
      !isNaN(search) ? search : ""
    }&usePurpose=${search}&pageNo=${page}&pageSize=${pageSize}&projectId=${projectId}`;
    const response = await fetchData({
      url,
      method: "GET",
      token,
      body: null,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching floors by project ID:", error);
    throw error;
  }
};

const getFloorById = async ({ projectId = "", floorId = "" } = {}) => {
  try {
    const token = store.getState().customer?.token ?? "";
    const url = `${endpoint}/${floorId}?projectId=${projectId}`;
    const response = await fetchData({
      url,
      method: "GET",
      token,
      body: null,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching floors by ID:", error);
    throw error;
  }
};

export { getFloorsByProjectId, getFloorById };
