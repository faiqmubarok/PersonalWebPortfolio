import axios from "axios";
import axiosInstance from "./axiosInstance";
import { useQuery, useMutation } from "@tanstack/react-query";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/experiences`;
const API_URL_ACCESS = "api/experiences";

export const useFetchExperience = ({ page, filter, search, onError }) => {
  return useQuery({
    queryFn: async () => {
      const responseExperiences = await axios.get(API_URL, {
        params: { page, search, filter },
      });
      return responseExperiences?.data;
    },
    queryKey: ["fetch.experiences", filter, page, search],
    onError,
  });
};

export const useCreateExperience = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: async (experience) => {
      const experienceResponse = await axiosInstance.post(
        API_URL_ACCESS,
        experience
      );
      return experienceResponse;
    },
    onSuccess,
    onError,
  });
};

export const useUpdateExperience = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: async (body) => {
      const experienceResponse = await axiosInstance.put(
        `${API_URL_ACCESS}/${body._id}`,
        body
      );
      return experienceResponse;
    },
    onSuccess,
    onError,
  });
};

export const createExperience = async (experienceData) => {
  try {
    const response = await axiosInstance.post(
      `api/experiences`,
      experienceData
    );
    return response.data;
  } catch (error) {
    console.error("Error creating experience:", error);
    throw error;
  }
};

export const getExperiences = async ({ page, filter, search, limit }) => {
  try {
    const response = await axios.get(API_URL, {
      params: { page, search, filter, limit },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching experiences:", error);
    throw error;
  }
};

export const deleteExperience = async (id) => {
  try {
    const response = await axiosInstance.delete(`api/experiences/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting experience with id ${id}:`, error);
    throw error;
  }
};

export const updateExperience = async (id, updateData) => {
  try {
    const response = await axiosInstance.put(
      `/api/experiences/${id}`,
      updateData
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating experience with id ${id}:`, error);
    throw error;
  }
};
