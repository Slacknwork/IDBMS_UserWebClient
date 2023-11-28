const getTransactionById = async (transactionId) => {
  try {
    const response = await fetch(
      `https://localhost:7062/api/Transactions/${transactionId}`,
      { cache: "no-store" }
    );
    const transaction = await response.json();
    return transaction;
  } catch (error) {
    console.error("Error fetching transaction by ID:", error);
    throw error;
  }
};

const getTransactionsByProjectId = async (projectId) => {
  try {
    const response = await fetch(
      `https://localhost:7062/api/Transactions/project/${projectId}`,
      { cache: "no-store" }
    );
    const transactions = await response.json();
    return transactions;
  } catch (error) {
    console.error("Error fetching transactions by project ID:", error);
    throw error;
  }
};

const getTransactionsByUserId = async (userId) => {
  try {
    const response = await fetch(
      `https://localhost:7062/api/Transactions/user/${userId}`,
      { cache: "no-store" }
    );
    const transactions = await response.json();
    return transactions;
  } catch (error) {
    console.error("Error fetching transactions by user ID:", error);
    throw error;
  }
};

const createTransaction = async (transaction, file) => {
  const formData = new FormData();
  formData.append("transactionReceiptImage", file);
  formData.append("type", transaction.type);
  formData.append("amount", transaction.amount);
  formData.append("note", transaction.note);
  formData.append("userId", transaction.userId);
  formData.append("projectId", transaction.projectId);
  formData.append("status", transaction.status);
  try {
    const response = await fetch(`https://localhost:7062/api/Transactions`, {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      console.error("Response status:", response.status);
      const errorData = await response.json();
      console.error("Error details:", errorData);
      throw new Error(`Request failed with status ${response.status}`);
    }
    const responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error("Error fetching transactions by user ID:", error);
    throw error;
  }
};

export {
  getTransactionById,
  getTransactionsByProjectId,
  getTransactionsByUserId,
  createTransaction,
};
