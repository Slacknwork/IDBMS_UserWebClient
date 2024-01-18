import { store } from "/store";
import { fetchData } from "/utils/api";
import { downloadFileFromResponse } from "/utils/downloadFile";

const endpoint = "/Download";
const downloadFileByUrl = async ({ imageUrl = "", name = "" } = {}) => {
  try {
    const token = store.getState().customer?.token ?? "";
    const encodedUrl = encodeURIComponent(imageUrl);
    const url = `${endpoint}?url=${encodedUrl}&name=${name}`;
    const response = await fetchData({
      url,
      method: "GET",
      contentType: "application/octet-stream",
      token,
    });

    downloadFileFromResponse(response.file, name);
  } catch (error) {
    console.error("Error fetching download by url:", error);
    throw error;
  }
};

export { downloadFileByUrl };
