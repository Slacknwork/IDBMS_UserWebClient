import { fetchData } from "/utils/api";

const endpoint = "/AdvertisementProjects";

const getAdvertisementProjects = async ({
  search = "",
  status = "",
  type = "",
  page = "",
  pageSize = "",
} = {}) => {
  try {
    const url = `${endpoint}?name=${search}&status=${status}&type=${type}&pageNo=${page}&pageSize=${pageSize}`;
    const response = await fetchData({
      url,
      method: "GET",
      body: null,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};

const getAdvertisementProjectById = async (projectId = "") => {
  try {
    const url = `${endpoint}/${projectId}`;
    const response = await fetchData({
      url,
      method: "GET",
      body: null,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};

const getAdvertisementProjectDocuments = async ({
  projectId = "",
  search = "",
  status = "",
  category = "",
  page = "",
  pageSize = "",
} = {}) => {
  try {
    const url = `${endpoint}/${projectId}/documents?documentName=${search}&isPublicAdvertisement=${status}&category=${category}&pageNo=${page}&pageSize=${pageSize}`;
    const response = await fetchData({
      url,
      method: "GET",
      body: null,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};

export {
  getAdvertisementProjects,
  getAdvertisementProjectById,
  getAdvertisementProjectDocuments,
};
