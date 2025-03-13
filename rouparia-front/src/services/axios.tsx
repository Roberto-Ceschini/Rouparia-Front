import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001", // URL base da API
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
