import axios from "axios";
import axiosInstance from "./axiosInstance";
import { useQuery, useMutation } from "@tanstack/react-query";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/profiles`;
const API_URL_ACCESS = "api/profiles";

export const useFetchProfile = ({ onError }) => {
  return useQuery({
    queryFn: async () => {
      const responseProfile = await axios.get(API_URL);
      return responseProfile?.data;
    },
    queryKey: ["fetch.profile"],
    onError,
  });
};

export const useUpdateSocialMedia = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: async (body) => {
      const profileResponse = await axiosInstance.put(
        `${API_URL_ACCESS}/socialmedia`,
        body
      );
      return profileResponse.data;
    },
    onSuccess,
    onError,
  });
};
