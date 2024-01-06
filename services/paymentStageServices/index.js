import { store } from "/store";
import { fetchData } from "/utils/api";

const endpoint = "/PaymentStages";

const getPaymentStagesByProjectId = async ({
  projectId = "",
  status = "",
  search = "",
  pageSize = "",
  page = "",
} = {}) => {
  try {
    const token = store.getState().customer?.token ?? "";
    const url = `${endpoint}/project/${projectId}?status=${status}&name=${search}&pageSize=${pageSize}&pageNo=${page}&projectId=${projectId}`;
    const response = await fetchData({
      url,
      method: "GET",
      token,
      body: null,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching payment stages by project ID:", error);
    throw error;
  }
};

const getPaymentStageById = async (id) => {
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
    console.error("Error fetching payment stage by ID:", error);
    throw error;
  }
};

export { getPaymentStagesByProjectId, getPaymentStageById };
