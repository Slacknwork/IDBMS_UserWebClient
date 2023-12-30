const getProjects = async ({
  search = "",
  type = "",
  status = "",
  page = "",
  pageSize = "",
} = {}) => {
  try {
    const response = await fetch(
      `https://localhost:7062/api/Projects?name=${search}&status=${status}&type=${type}&pageNo=${page}&pageSize=${pageSize}`,
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

const getProjectById = async (id) => {
  try {
    const response = await fetch(`https://localhost:7062/api/Projects/${id}`, {
      cache: "no-store",
    });
    const project = await response.json();
    return project;
  } catch (error) {
    console.error("Error fetching project by ID:", error);
    throw error;
  }
};

export { getProjects, getProjectById };
