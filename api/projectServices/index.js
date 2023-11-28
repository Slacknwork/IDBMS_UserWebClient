const getProjectById = async (projectId) => {
  try {
    const response = await fetch(
      `https://localhost:7062/api/Projects/${projectId}`,
      { cache: "no-store" }
    );
    const project = await response.json();
    return project;
  } catch (error) {
    console.error("Error fetching project by ID:", error);
    throw error;
  }
};

const createDecorProject = async (project) => {
  try {
    const response = await fetch(`https://localhost:7062/api/Projects/decor`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    });
    const responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error("Error fetching project by ID:", error);
    throw error;
  }
};

export { getProjectById, createDecorProject };
