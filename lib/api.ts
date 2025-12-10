import axios from "axios";

const BASE = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

export const api = axios.create({
  baseURL: BASE + "/api",
  withCredentials: true, // important to send/receive HttpOnly cookies
});
