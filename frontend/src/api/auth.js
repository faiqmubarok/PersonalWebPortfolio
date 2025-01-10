import axiosInstance from "./axiosInstance";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/auth`;

// export const login = async (credentials) => {
//   try {
//     const response = await axios.post(
//       `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
//       credentials
//     );
//     return response.data;
//   } catch (error) {
//     console.error("Login failed:", error.response?.data || error.message);
//     throw error;
//   }
// };

export const useLogin = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: async (credentials) => {
      const loginResponse = await axios.post(`${API_URL}/login`, credentials);
      return loginResponse.data;
    },
    onSuccess,
    onError,
  });
};

export const refreshAccessToken = async () => {
  try {
    const response = await axiosInstance.post("/api/auth/refresh-token");
    axiosInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${response.data.accessToken}`;
    console.log("Access token refreshed");
    return response.data.accessToken;
  } catch (error) {
    console.error(
      "Failed to refresh token:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await axiosInstance.post("/api/auth/logout");
    return response.data;
  } catch (error) {
    console.error("Logout failed:", error.response?.data || error.message);
    throw error;
  }
};
