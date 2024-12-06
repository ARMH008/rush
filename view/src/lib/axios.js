import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:3000/api/v1"
      : "https://rush-construction-backend.onrender.com/api/v1",  // Live production API
  withCredentials: true,
});
//   headers: {
//     "Content-Type": "application/json",
//   },
