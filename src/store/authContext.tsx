"use client";
import { userRefreshLogin } from "@/http";
import UserType from "@/utils/interfaces/userType";
import React, { createContext, useContext, useEffect, useState } from "react";

interface AuthPayloadType {
  isAuthenticated: boolean;
  user: UserType;
}

interface AuthContextType {
  authState: AuthPayloadType;
  setAuthenticatedState: (authState: AuthPayloadType) => void;
  balance: number;
  setBalance: (balance: number) => void;
}

const initialAuthState: AuthPayloadType = {
  isAuthenticated: false,
  user: {} as UserType,
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<AuthPayloadType>(initialAuthState);
  const [balance, setBalance] = useState<number>(authState.user.balance);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Set isMounted to true when component mounts
    setIsMounted(true);

    // Cleanup function to set isMounted to false when component unmounts
    return () => {
      setIsMounted(false);
    };
  }, []);

  useEffect(() => {
    // Fetch user data only when isMounted is true, i.e., on browser refresh
    if (isMounted) {
      const fetchUser = async () => {
        try {
          const res = await userRefreshLogin();
          const { success } = res;
          if (success) {
            setAuthenticatedState({
              isAuthenticated: true,
              user: res.data,
            });
            setBalance(res.data.balance);
          }
        } catch (err) {
          console.log(err);
        }
      };
      fetchUser();
    }
  }, [isMounted]);

  const setAuthenticatedState = (authState: AuthPayloadType) => {
    setAuthState(authState);
    setBalance(authState.user.balance);
  };

  return (
    <AuthContext.Provider
      value={{ setAuthenticatedState, authState, balance, setBalance }}
    >
      {children}
    </AuthContext.Provider>
  );
};
