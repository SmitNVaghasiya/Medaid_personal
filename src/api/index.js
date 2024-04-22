import Axios from "axios";
import { API_SERVER } from "../config/constant";
import { auth } from "./firebase";

const axios = Axios.create({
  baseURL: `${API_SERVER}`,
  headers: { "Content-Type": "application/json" },
});

axios.interceptors.request.use(
  async (config) => {
    if (auth.currentUser) {
      config.headers.Authorization = await auth.currentUser.getIdToken();
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (response) => Promise.resolve(response),
  (error) => {
    return Promise.reject(error);
  }
);

export default axios;
