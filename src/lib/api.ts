import axios from "axios";

const BASE =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "https://myblogbackend-3559.onrender.com";

export const api = axios.create({
  baseURL: BASE + "/api",
  withCredentials: true,
});
