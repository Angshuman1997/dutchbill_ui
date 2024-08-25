import axios from "axios";

const API_URL = "https://dutchbill.vercel.app/api";

// Add new user data { firebaseName, appUserName, username, emailId }
export const createUser = async (value) => {
  try {
    const response = await axios.post(`${API_URL}/user/createuser`, value, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("sessionToken"),
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error posting user data:", error);
  }
};

// Search User { search, userId, fetchType, alreadySelectedIds }
export const searchUser = async (value) => {
  try {
    const response = await axios.post(`${API_URL}/user/searchuser`, value, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("sessionToken"),
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error getting all user data:", error);
  }
};

// Fetch user creds if exists {userEmail}
export const fetchUserCreds = async (value) => {
  try {
    const response = await axios.post(`${API_URL}/user/fetchuser`, value, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("sessionToken"),
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error getting user data:", error);
  }
};

// Update user - {name, userId}
export const updateUser = async (value) => {
  try {
    const response = await axios.put(`${API_URL}/user/updateuser`, value, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("sessionToken"),
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating user data:", error);
  }
};

// Delete user - {userId}
export const deleteUser = async (value) => {
  try {
    const response = await axios.post(`${API_URL}/user/deleteuser`, value, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("sessionToken"),
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deletion user data:", error);
  }
};

// expenseType,persons,amount,shareType,group,ifOthersComment,paidBy, amountDistribution,
// Add expense
export const addExpense = async (value) => {
  try {
    const response = await axios.post(`${API_URL}/expense/addexpense`, value, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("sessionToken"),
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error while checking existing user:", error);
  }
};

// Remove expense value = {userId: id, expenseId: id}
export const removeExpense = async (value) => {
  try {
    const response = await axios.post(
      `${API_URL}/expense/removeexpense`,
      value,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("sessionToken"),
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error while removing expense:", error);
  }
};

// Fetch expenses value = {userId: id}
export const fetchExpense = async (value) => {
  try {
    const response = await axios.post(
      `${API_URL}/expense/fetchexpense`,
      value,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("sessionToken"),
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error while fetching expense:", error);
  }
};

// Fetch expenses value = {userId: id}
export const totalSummary = async (value) => {
  try {
    const response = await axios.post(
      `${API_URL}/expense/totalsummary`,
      value,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("sessionToken"),
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error while fetching expense:", error);
  }
};

// Payment Complete = {user: {_id, name}, expUser: {_id, name}, type}
export const paymentComplete = async (value) => {
  try {
    const response = await axios.post(
      `${API_URL}/expense/expensecomplete`,
      value,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("sessionToken"),
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error while fetching expense:", error);
  }
};