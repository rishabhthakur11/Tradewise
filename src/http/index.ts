import APIResponseType from "@/utils/interfaces/response";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5502/api",
  withCredentials: true,
});

//interface for userLogin
interface LoginObjectType {
  email: string;
  password: string;

}

interface RegisterObjectType {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone: string;
  dateOfBirth: string;
  profileImgUrl: string;
}

//AUTH
export const userlogin = (data: LoginObjectType) => api.post<APIResponseType, APIResponseType>("/auth/login", data);
export const userRegister = (data: RegisterObjectType) => api.post<APIResponseType, APIResponseType>("/auth/register", data);
export const googleAuth = () => api.get("/auth/google/signIn");

// STOCKS
export const getStocks = () => api.get("/stocks");
export const getIndividualStock = (stockId: string) => api.get(`/stocks/${stockId}`);





api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return error.response.data;
  }
);

export default api;
