import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

interface AuthContextProps {
  login: (userData: { name: string; email: string }) => Promise<void>;
  logout: () => void;
  checkToken: () => void;
  isAuthenticated: any;
}
const AuthContext = createContext<AuthContextProps>({
  login: async () => Promise.resolve(),
  logout: () => {},
  checkToken: () => {},
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
        const userDataWithExpiry = {
          data: userData,
          expiry: Date.now() + 50 * 60 * 1000, // 50 minutes from now
        };
        localStorage.setItem("fetch-user", JSON.stringify(userDataWithExpiry));
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

  const checkToken = () => {
    const storedData = localStorage.getItem("fetch-user");

    if (storedData) {
      const parsedData = JSON.parse(storedData);
      const currentTime = Date.now();

      if (parsedData.expiry && currentTime > parsedData.expiry) {
        console.log("User data has expired");
        localStorage.removeItem("fetch-user");
        logout();
      }
    } else {
      logout();
      console.log("No user data found");
    }
  };

  useEffect(() => {
    checkToken();
  }, []);
  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, checkToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
