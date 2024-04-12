"use client";
import UserType from "@/utils/interfaces/userType";
import React, { createContext, useContext, useState } from "react";

interface AuthPayloadType {
  isAuthenticated: boolean;
  user: UserType | null;
}

interface AuthContextType {
  authState: AuthPayloadType;
  setAuthenticatedState: (authState: AuthPayloadType) => void;
}

const initialAuthState: AuthPayloadType = {
  isAuthenticated: false,
  user: null,
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);
// Custom Hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<AuthPayloadType>(initialAuthState);

  const setAuthenticatedState = (authState: AuthPayloadType) => {
    setAuthState(authState);
  };
  console.log(authState);

  return (
    <AuthContext.Provider value={{ setAuthenticatedState, authState }}>
      {children}
    </AuthContext.Provider>
  );
};
