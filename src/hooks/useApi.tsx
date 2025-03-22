import { useFilter } from "@/context/filter-context";
import { useAuth } from "../context/auth-context";

const useApi = () => {
  const { logout, checkToken } = useAuth();
  const { resetData } = useFilter();
  const baseUrl = import.meta.env.VITE_API_BASE_URL as string;

  if (!baseUrl) {
    throw new Error("API base URL is not defined. Check your .env file.");
  }

  const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
    const headers = { ...options.headers };
    checkToken();
    try {
      const response = await fetch(`${baseUrl}${endpoint}`, {
        ...options,
        headers,
        credentials: "include",
      });

      if (!response.ok) {
        if (response.status === 401) {
          resetData();
          logout();
          throw new Error("Unauthorized: Logging out...");
        }

        const errorMessage = await response.text();
        throw new Error(`API Error (${response.status}): ${errorMessage}`);
      }

      return response.json();
    } catch (error) {
      console.error("API Request Failed:", error);
      throw error;
    }
  };

  const getDogsById = async (dog: string[]) => {
    if (!Array.isArray(dog) || dog.length === 0) {
      throw new Error("getDogsById requires a non-empty array of dog IDs.");
    }

    return await apiFetch("/dogs", {
      method: "POST",
      body: JSON.stringify(dog),
      headers: { "Content-Type": "application/json" },
    });
  };

  const getDogs = async (queryString: string) => {
    return await apiFetch(`/dogs/search?${queryString}`, { method: "GET" });
  };

  const getBreeds = async () => {
    return await apiFetch("/dogs/breeds", { method: "GET" });
  };

  return { apiFetch, getDogs, getBreeds, getDogsById };
};

export default useApi;
