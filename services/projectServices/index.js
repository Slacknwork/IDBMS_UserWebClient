import { store } from "/store";
import { fetchData } from "/utils/api";

const endpoint = "/Projects";

const getProjectsBySiteId = async ({
  siteId = "",
  search = "",
  type = "",
  status = "",
  page = "",
  pageSize = "",
} = {}) => {
  try {
    const token = store.getState().customer?.token ?? "";
    const url = `${endpoint}/site/${siteId}?name=${search}&status=${status}&type=${type}&pageNo=${page}&pageSize=${pageSize}`;
    const response = await fetchData({
      url,
      method: "GET",
      token,
      body: null,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching projects by site ID:", error);
    throw error;
  }
};

const getProjectById = async (id) => {
  try {
    const token = store.getState().customer?.token ?? "";
    const url = `${endpoint}/${id}`;
    const response = await fetchData({
      url,
      method: "GET",
      token,
      body: null,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching project by ID:", error);
    throw error;
  }
};

const getProjectStatusByUserId = async ({ userId = "" } = {}) => {
  try {
    const token = store.getState().customer?.token ?? "";
    const url = `${endpoint}/status?userId=${userId}`;
    const response = await fetchData({
      url,
      method: "GET",
      token,
      body: null,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching project by ID:", error);
    throw error;
  }
};

export { getProjectById, getProjectsBySiteId, getProjectStatusByUserId };
