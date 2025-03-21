import { useAuth } from "../context/auth-context";

const useApi = () => {
  const { logout } = useAuth();
  const baseUrl = (import.meta.env.VITE_API_BASE_URL as string) || "";
  const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
    const headers = {
      ...options.headers,
    };
    try {
      console.log(`${baseUrl}${endpoint}`);
      const response = await fetch(`${baseUrl}${endpoint}`, {
        ...options,
        headers,
        credentials: "include",
      });

      if (response.status === 401) {
        logout();
        throw new Error("Unauthorized: Logging out...");
      }

      return response.json();
    } catch (e) {
      throw e;
    }
  };

  //Get Information of Dogs by an array ID's
  const getDogsById = async (dog: string[]) => {
    const response = await apiFetch("/dogs", {
      method: "POST",
      body: JSON.stringify(dog),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response;
  };
  const getDogs = async (queryString: any) => {
    const response = apiFetch(`/dogs/search?${queryString}`, { method: "GET" });
    return response;
  };
  const getBreeds = async () => {
    const response = await apiFetch("/dogs/breeds", { method: "GET" });
    return response;
  };

  return { apiFetch, getDogs, getBreeds, getDogsById };
};

export default useApi;
