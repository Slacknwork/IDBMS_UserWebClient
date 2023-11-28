const getParticipationByProjectId = async (projectId) => {
  try {
    const response = await fetch(
      `https://localhost:7062/api/ProjectParticipations/project/${projectId}`,
      { cache: "no-store" }
    );
    const projectParticipation = await response.json();
    return projectParticipation;
  } catch (error) {
    console.error("Error fetching project participation by project ID:", error);
    throw error;
  }
};

const getParticipationByUserIdFilter = async (userId, status, projectType) => {
  try {
    const response = await fetch(
      `https://localhost:7062/odata/ProjectParticipations?$expand=Project&$filter=Project/Status eq ${status} and UserId eq ${userId} and Project/ProjectType eq ${projectType}`,
      { cache: "no-store" }
    );
    const projectParticipation = await response.json();
    return projectParticipation;
  } catch (error) {
    console.error("Error fetching project participation by project ID:", error);
    throw error;
  }
};

const getParticipationByUserId = async (userId) => {
  try {
    const response = await fetch(
      `https://localhost:7062/api/ProjectParticipations/user/${userId}`,
      { cache: "no-store" }
    );
    const projectParticipation = await response.json();
    return projectParticipation;
  } catch (error) {
    console.error("Error fetching project participation by user ID:", error);
    throw error;
  }
};

export {
  getParticipationByProjectId,
  getParticipationByUserIdFilter,
  getParticipationByUserId,
};
