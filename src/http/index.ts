import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5500/api",
  withCredentials: true,
});

//AUTH
export const userlogin = (data: any) => api.post("/auth/login", data);
export const userRegister = (data: any) => api.post("/auth/register", data);
export const googleAuth = () => api.get("/auth/google/signIn");



api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return error.response.data;
  }
);

export default api;
