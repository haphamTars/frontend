// api/axiosClient.js
import axios from "axios";

// const sTag = "[AxiosClient]";

const axiosClient = axios.create({
  baseURL: "http://localhost:8000/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;
