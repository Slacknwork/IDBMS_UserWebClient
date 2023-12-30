const getAdvertisementProjects = async ({
  search = "",
  status = "",
  type = "",
  page = "",
  pageSize = "",
} = {}) => {
  try {
    const response = await fetch(
      `https://localhost:7062/api/AdvertisementProjects?name=${search}&status=${status}&type=${type}&pageNo=${page}&pageSize=${pageSize}`,
      {
        cache: "no-store",
      }
    );
    const projects = await response.json();
    return projects.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};

const getAdvertisementProjectById = async (projectId = "") => {
  try {
    const response = await fetch(
      `https://localhost:7062/api/AdvertisementProjects/${projectId}`,
      {
        cache: "no-store",
      }
    );
    const project = await response.json();
    return project.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};

export { getAdvertisementProjects, getAdvertisementProjectById };
