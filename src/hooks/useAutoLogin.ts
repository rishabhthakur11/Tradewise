"use server";
import axios from 'axios';
import { useAuth } from '@/store/authContext';

export default async function useAutoLogin() {
  const { setAuthenticatedState } = useAuth();
  try {
    const res = await axios.get(`${process.env.API_BASE_URL}/api/auth/refresh`, {
      withCredentials: true,
    });
    if (res.status === 200) {
      if (res.data.success) {
        setAuthenticatedState({
          isAuthenticated: true,
          user: res.data,
        });
      }
      return false; // Indicate loading complete
    } else {
      return false; // Indicate loading complete
    }
  } catch (err) {
    console.error(err);
    return false; // Indicate loading complete
  }
};
