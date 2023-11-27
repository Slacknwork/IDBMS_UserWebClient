const getAllProjectDesigns = async () => {
  try {
    const response = await fetch("https://localhost:7062/api/ProjectDesigns");
    const projectDesigns = await response.json();
    return projectDesigns;
  } catch (error) {
    console.error("Error fetching all project designs:", error);
    throw error;
  }
};

export { getAllProjectDesigns };
