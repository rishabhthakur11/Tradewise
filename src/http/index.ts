import APIResponseType from "@/utils/interfaces/response";
import axios, { AxiosRequestConfig } from "axios";

const api = axios.create({
  baseURL: "http://localhost:5500/api",
  withCredentials: true,
});

api.defaults.headers.post['Content-Type'] = 'application/json';
api.defaults.headers.put['Content-Type'] = 'application/json';
api.defaults.headers.delete['Content-Type'] = 'application/json';
api.defaults.headers.patch['Content-Type'] = 'application/json';
api.defaults.headers.get['Content-Type'] = 'application/json';

api.interceptors.request.use((config: any) => {
  console.log("Request URL:", config.url);
  console.log("Request Method:", config.method);
  console.log("Request Headers:", config.headers);
  console.log("Request Data:", config.data);
  return config;
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
export const userlogout = (): Promise<APIResponseType> => api.get("/auth/logout");
export const userRefreshLogin = (): Promise<APIResponseType> => api.get("/auth/refresh");

// STOCKS
export const getStocks = () => api.get("/stocks");
export const getIndividualStock = (stockId: string) => api.get(`/stocks/${stockId}`);

// USER 
export const changeUserPassword = (data:{_id:string,password:string,newPassword:string}) => api.post<APIResponseType, APIResponseType>("user/profile/updatePassword", data);





api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return error.response.data;
  }
);

export default api;
