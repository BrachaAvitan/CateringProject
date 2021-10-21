import axios from 'axios';

const api = axios.create({
    baseURL: "https://localhost:44317",
    headers: {
      "Content-Type": "application/json",
    },
  });
  
export default api;
