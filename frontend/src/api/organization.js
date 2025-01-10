import axios from "axios";
import axiosInstance from "./axiosInstance";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/organizations`;

export const createOrganization = async (experienceData) => {
  try {
    const response = await axiosInstance.post(
      `api/organizations`,
      experienceData
    );
    return response.data;
  } catch (error) {
    console.error("Error creating organization:", error);
    throw error;
  }
};

export const getOrganization = async ({ page, search, limit }) => {
  try {
    const response = await axios.get(API_URL, {
      params: { page, search, limit },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching organizations:", error);
    throw error;
  }
};

export const deleteOrganization = async (id) => {
  try {
    const response = await axiosInstance.delete(`api/organizations/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting organization with id ${id}:`, error);
    throw error;
  }
};

export const updateOrganization = async (id, updateData) => {
  try {
    const response = await axiosInstance.put(
      `/api/organizations/${id}`,
      updateData
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating organization with id ${id}:`, error);
    throw error;
  }
};
