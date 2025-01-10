import axios from "axios";
import axiosInstance from "./axiosInstance";
import { useQuery, useMutation } from "@tanstack/react-query";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/skills`;
const API_URL_ACCESS = "api/skills";

export const useFetchSkills = ({ page, filter, onError, limit }) => {
  return useQuery({
    queryFn: async () => {
      const responseSkills = await axios.get(API_URL, {
        params: { filter, page, limit: limit || 5 },
      });
      return responseSkills?.data;
    },
    queryKey: ["fetch.skills", filter, page],
    onError,
  });
};

export const useCreateSkill = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: async (body) => {
      const skillResponse = await axiosInstance.post(API_URL_ACCESS, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return skillResponse;
    },
    onSuccess,
    onError,
  });
};

export const useUpdateSkill = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: async (body) => {
      const skillResponse = await axiosInstance.put(
        `${API_URL_ACCESS}/${body._id}`,
        body,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(skillResponse);
      return skillResponse;
    },
    onSuccess,
    onError,
  });
};

export const useDeleteSkill = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: async (id) => {
      const skillResponse = await axiosInstance.delete(
        `${API_URL_ACCESS}/${id}`
      );
      return skillResponse;
    },
    onSuccess,
    onError,
  });
};
