// frontend/src/api/axios.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api", // backend base URL
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
