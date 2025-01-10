import axios from "axios";
import axiosInstance from "./axiosInstance";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/certificates`;

export const createCertificate = async (certificateData) => {
  try {
    const response = await axiosInstance.post(
      `api/certificates`,
      certificateData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating certificate:", error);
    throw error;
  }
};

export const getCertificates = async ({ page, search, limit }) => {
  try {
    const response = await axios.get(API_URL, {
      params: { page, search, limit },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching certificates:", error);
    throw error;
  }
};

export const deleteCertificate = async (id) => {
  try {
    const response = await axiosInstance.delete(`api/certificates/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting certificate with id ${id}:`, error);
    throw error;
  }
};

export const updateCertificate = async (id, updateData) => {
  try {
    const response = await axiosInstance.put(
      `/api/certificates/${id}`,
      updateData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating certificate with id ${id}:`, error);
    throw error;
  }
};
