import axios from "axios";
import { refreshAccessToken } from "./auth";

// Membuat instance axios dengan konfigurasi dasar
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL, // URL Backend
  withCredentials: true, // Agar cookies (refreshToken) dikirim
});

axiosInstance.interceptors.request.use(
  (config) => {
    // Ambil token dari localStorage jika belum ada di defaults.headers
    let accessToken = axiosInstance.defaults.headers.common["Authorization"];
    if (!accessToken) {
      const storedToken = sessionStorage.getItem("accessToken");
      if (storedToken) {
        accessToken = `Bearer ${storedToken}`;
        axiosInstance.defaults.headers.common["Authorization"] = accessToken;
      }
    }

    // Set token ke config.headers untuk request ini
    if (accessToken) {
      config.headers["Authorization"] = accessToken;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Menambahkan interceptor untuk menangani token refresh
axiosInstance.interceptors.response.use(
  (response) => response, // Lanjutkan jika response sukses
  async (error) => {
    const originalRequest = error.config;

    // Jika token expired (status 401), coba refresh token
    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true; // Hindari loop tanpa henti

      try {
        const newAccessToken = await refreshAccessToken(); // Refresh token

        // Set kembali access token di session storage
        sessionStorage.setItem("accessToken", newAccessToken);

        // Set kembali Authorization header dengan access token baru
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${newAccessToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest); // Kirim ulang request dengan token baru
      } catch (refreshError) {
        console.error("Failed to refresh token");
        window.location.href = "/auth/sign-in"; // Redirect ke login jika refresh gagal
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error); // Kembalikan error jika bukan 401
  }
);

export default axiosInstance;
