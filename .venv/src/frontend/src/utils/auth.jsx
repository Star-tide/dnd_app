// auth.js - Utility to check if user is logged in
import axios from "axios";

export const isUserLoggedIn = async () => {
  const token = localStorage.getItem("token");

  if (!token) return false;

  try {
    const response = await axios.get("/api/user/", {
      headers: {
        Authorization: `${token}`,
      },
    });

    return response.status === 200;
  } catch (error) {
    return false;
  }
};
