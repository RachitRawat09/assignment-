// frontend/src/api/axios.js
import axios from "axios";

const API = axios.create({
  baseURL: "https://assignment-backend-0lmy.onrender.com", // backend base URL
});

// Attach token automatically if present
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
