"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const router = useRouter();

  // Login: Save user info and navigate home
  const login = (email, username) => {
    setUser({ email, username });
    localStorage.setItem("user", JSON.stringify({ email, username }));
    router.push("/");
  };

  // Logout: Clear user and navigate to login
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    router.push("/login");
  };

  // Restore user from localStorage when app loads
  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) setUser(JSON.parse(saved));
  }, []); // 👈 must be useEffect, not useState

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

//  Custom hook to easily access auth data
export function useAuth() {
  return useContext(AuthContext);
}
