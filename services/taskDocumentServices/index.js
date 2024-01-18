import { store } from "/store";
import { fetchData } from "/utils/api";

const endpoint = "/TaskDocuments";

const getAllTaskDocuments = async () => {
  try {
    const token = store.getState().customer?.token ?? "";
    const url = `${endpoint}`;
    const response = await fetchData({
      url,
      method: "GET",
      token,
      body: null,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching all task documents:", error);
    throw error;
  }
};

const getTaskDocumentById = async (id) => {
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
    console.error("Error fetching task document by ID: ", error);
    throw error;
  }
};

const getTaskDocumentsByTaskReportId = async (taskReportId) => {
  try {
    const token = store.getState().customer?.token ?? "";
    const url = `${endpoint}/task-report/${taskReportId}`;
    const response = await fetchData({
      url,
      method: "GET",
      token,
      body: null,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching task documents by task report ID:", error);
    throw error;
  }
};

export {
  getAllTaskDocuments,
  getTaskDocumentById,
  getTaskDocumentsByTaskReportId,
};
