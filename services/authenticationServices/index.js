import { fetchData } from "/utils/api";

const endpoint = "/Authentications";

const registerUser = async (request) => {
  try {
    const url = `${endpoint}/register`;
    const response = await fetchData({
      url,
      method: "POST",
      contentType: "application/json",
      body: JSON.stringify(request),
    });
    return response;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

const loginUser = async (request) => {
  try {
    const url = `${endpoint}/login`;
    const response = await fetchData({
      url,
      method: "POST",
      contentType: "application/json",
      body: JSON.stringify(request),
    });
    return response;
  } catch (error) {
    console.error("Error login:", error);
    throw error;
  }
};

const updatePassword = async (userId, request) => {
  try {
    const url = `${endpoint}/update-password/${userId}`;
    const response = await fetchData({
      url,
      method: "PUT",
      contentType: "application/json",
      body: JSON.stringify(request),
    });
    return response;
  } catch (error) {
    console.error("Error updating password:", error);
    throw error;
  }
};

const logoutUser = async (email) => {
  try {
    const url = `${endpoint}/logout`;
    const response = await fetchData({
      url,
      method: "POST",
      contentType: "application/json",
      body: JSON.stringify(email),
    });
    return response;
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
};

const verifyUser = async (request) => {
  try {
    const url = `${endpoint}/verify`;
    const response = await fetchData({
      url,
      method: "POST",
      contentType: "application/json",
      body: JSON.stringify(request),
    });
    return response;
  } catch (error) {
    console.error("Error verifying user:", error);
    throw error;
  }
};

const resetPassword = async (request) => {
  try {
    const url = `${endpoint}/reset-password`;
    const response = await fetchData({
      url,
      method: "POST",
      contentType: "application/json",
      body: JSON.stringify(request),
    });
    return response;
  } catch (error) {
    console.error("Error resetting password:", error);
    throw error;
  }
};

export {
  registerUser,
  loginUser,
  updatePassword,
  logoutUser,
  verifyUser,
  resetPassword,
};
