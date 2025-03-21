import { createContext, useState, useContext, ReactNode } from "react";
// import { login as _login, logout as _logout } from "../api/dog-api";

interface AuthContextProps {
  login: (userData: { name: string; email: string }) => Promise<void>;
  logout: () => void;
  isAuthenticated: any;
}
const AuthContext = createContext<AuthContextProps>({
  login: async () => Promise.resolve(),
  logout: () => {},
  isAuthenticated: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const baseUrl = (import.meta.env.VITE_API_BASE_URL as string) || "";
  const login = async (userData: { name: string; email: string }) => {
    try {
      const response = await fetch(`${baseUrl}/auth/login`, {
        method: "POST",
        body: JSON.stringify(userData),
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error(`HTTP Error:${response.status}`);
      } else {
        console.log(response.json());
        localStorage.setItem("fetch-user", JSON.stringify(userData));
        setIsAuthenticated(true);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const logout = async () => {
    const userData = localStorage.getItem("fetch-user");
    setIsAuthenticated(false);
    if (userData) {
      localStorage.removeItem("fetch-user");
      try {
        const response = await fetch(`${baseUrl}/auth/logout`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) {
          throw new Error(`HTTP Error:${response.status}`);
        } else {
          setIsAuthenticated(false);
        }
      } catch (e) {
        console.log(e);
      }
    }
  };
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
