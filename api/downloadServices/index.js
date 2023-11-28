const downloadFileFromUrl = async (url, token) => {
  try {
    const response = await fetch(
      `https://localhost:7062/api/Download?url=${url}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );
    const download = await response.json();
    return download;
  } catch (error) {
    console.error("Error fetching all interior items:", error);
    throw error;
  }
};

export { downloadFileFromUrl };
