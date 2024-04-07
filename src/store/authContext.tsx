"use client";
import React, { createContext, useContext, useState } from "react";

interface AuthState {
  isAuthenticated: boolean;
  user: null | string;
  email: string;
}

interface AuthContextType {
  authState: AuthState;
  login: (email: string) => void;
  logout: () => void;
}

const initialAuthState: AuthState = {
  isAuthenticated: false,
  user: null,
  email: "",
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
  const [authState, setAuthState] = useState<AuthState>(initialAuthState);

  const login = (email: string) => {
    setAuthState({ isAuthenticated: true, user: email, email });
  };

  const logout = () => {
    setAuthState(initialAuthState);
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
