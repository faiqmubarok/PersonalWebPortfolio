import axios from "axios";
import axiosInstance from "./axiosInstance";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/portfolios`;

export const createPortfolio = async (portfolioData) => {
  try {
    const formData = new FormData();

    // Loop untuk images, tech, dan paragraphs
    ["images", "tech", "paragraphs"].forEach((key) => {
      portfolioData[key].forEach((item) => formData.append(key, item));
    });

    // Append field lainnya
    ["name", "client", "link", "type"].forEach((key) => {
      formData.append(key, portfolioData[key]);
    });

    const response = await axiosInstance.post(`api/portfolios`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating portfolio:", error);
    throw error;
  }
};

export const getPortfolios = async ({ page, search, filter, limit }) => {
  try {
    const response = await axios.get(API_URL, {
      params: { page, search, filter, limit },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching portfolios:", error);
    throw error;
  }
};

export const deletePortfolio = async (id) => {
  try {
    const response = await axiosInstance.delete(`api/portfolios/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting portfolio with id ${id}:`, error);
    throw error;
  }
};

export const updatePortfolio = async (id, updateData) => {
  try {
    const response = await axiosInstance.put(
      `/api/portfolios/${id}`,
      updateData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating portfolio with id ${id}:`, error);
    throw error;
  }
};

export const getPortfolio = async (id) => {
  try {
    const response = await axiosInstance.get(`api/portfolios/${id}`);
    return response?.data;
  } catch (error) {
    console.error(`Error fetching portfolio with id ${id}:`, error);
    throw error;
  }
};
