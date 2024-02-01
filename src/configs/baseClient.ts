import axios from "axios";

const baseClient = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_API_URL}/api`,
  // withCredentials: true,
});

export default baseClient;
