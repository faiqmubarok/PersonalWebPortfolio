import axios from "axios";
import axiosInstance from "./axiosInstance";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/messages`;

export const createMessage = async (messageData) => {
  try {
    const response = await axios.post(API_URL, messageData);
    return response.data;
  } catch (error) {
    console.error("Error creating message:", error);
    throw error;
  }
};

export const getMessages = async (page, filter, search) => {
  try {
    const response = await axiosInstance.get("/api/messages", {
      params: { page, search, filter, limit: 5 },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching messages:", error);
    throw error;
  }
};

export const updateMessage = async (id, updateData) => {
  try {
    const response = await axiosInstance.put(`/api/messages/${id}`, updateData);
    return response.data;
  } catch (error) {
    console.error(`Error updating message with id ${id}:`, error);
    throw error;
  }
};

export const deleteMessage = async (id) => {
  try {
    const response = await axiosInstance.delete(`api/messages/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting message with id ${id}:`, error);
    throw error;
  }
};
