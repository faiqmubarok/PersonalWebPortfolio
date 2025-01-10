import axiosInstance from "./axiosInstance";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/auth`;

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

export const useFetchResetLink = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: async () => {
      const response = await axios.get(`${API_URL}/send-reset-password`);
      return response.data;
    },
    onSuccess,
    onError,
  });
};

export const useResetPassword = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: async ({ credentials, token }) => {
      const response = await axios.post(
        `${API_URL}/reset-password`,
        credentials,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
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

export const useLogout = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.post("/api/auth/logout");
      return response.data;
    },
    onSuccess,
    onError,
  });
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
