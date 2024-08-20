import axios from "axios";

const API_URL = "https://dutchbill.vercel.app/api";

const headers = {
  "Content-Type": "application/json",
};

// Add new user data
export const addNewUser = async (userData) => {
  try {
    const response = await axios.post(
      `${API_URL}/user/create`,
      {
        name: userData.name,
        username: userData.username,
        password: userData.password,
        emailId: userData.emailId,
      },
      { headers }
    );
    return response.data;
  } catch (error) {
    console.error("Error posting user data:", error);
  }
};

// Get all users
export const allUsers = async () => {
  try {
    const response = await axios.post(`${API_URL}/user`, {});
    return response.data;
  } catch (error) {
    console.error("Error getting all user data:", error);
  }
};

// Get user
export const getUser = async (value) => {
  try {
    const response = await axios.post(`${API_URL}/user/singleuser`, value, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error("Error getting user data:", error);
  }
};

// Get all users
export const getAllUser = async (value) => {
  try {
    const response = await axios.get(`${API_URL}/user/allusers`, value, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error("Error getting user data:", error);
  }
};

// Update user - name or password - value -> {password: password, name: name} or any one, also formType
export const updateUser = async (value) => {
  try {
    const response = await axios.put(`${API_URL}/user/update`, value, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating user data:", error);
  }
};

// Delete user
export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`${API_URL}/user/${userId}`, {});
    return response.data;
  } catch (error) {
    console.error("Error deletion user data:", error);
  }
};

// Check Existing User
export const checkExistingUser = async (value) => {
  try {
    const response = await axios.post(`${API_URL}/user/check`, value, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error("Error while checking existing user:", error);
  }
};

// OTP Action
export const otpActionUser = async (value) => {
  try {
    const response = await axios.post(`${API_URL}/user/otp`, value, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error("Error while checking existing user:", error);
  }
};

// expenseType,persons,amount,shareType,group,ifOthersComment,paidBy, amountDistribution,
// Add expense
export const addExpense = async (value) => {
  try {
    const response = await axios.post(`${API_URL}/expense/addexpense`, value, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error("Error while checking existing user:", error);
  }
};

// Remove expense value = {expenseId: id}
export const removeExpense = async (value) => {
  try {
    const response = await axios.delete(
      `${API_URL}/expense/removeexpense`,value, {headers}
    );
    return response.data;
  } catch (error) {
    console.error("Error while removing expense:", error);
  }
};

// Fetch expenses value = {userId: id}
export const fetchExpense = async (value) => {
  try {
    const response = await axios.post(`${API_URL}/expense/fetchexpense`, value, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error("Error while fetching expense:", error);
  }
};
