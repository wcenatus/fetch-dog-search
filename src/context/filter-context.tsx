import {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import useApi from "../hooks/useApi";
import { useAuth } from "./auth-context";
import { createQueryString } from "@/libs/helpers";

interface FiltersProps {
  breeds?: string[];
  zipCodes?: string[];
  ageMax?: string;
  ageMin?: string;
  size: number;
  from?: string;
  sort?:
    | "breed:asc"
    | "breed:desc"
    | "name:asc"
    | "name:desc"
    | "age:asc"
    | "age:desc"
    | "";
}

interface FilterContextProps {
  dogs: any;
  breeds: any;
  loading: boolean;
  filters: FiltersProps;
  total: number;
  page: number;
  setPage: any;
  setFilters: any;
  resetData: any;
}
const FilterContext = createContext<FilterContextProps>({
  dogs: [],
  breeds: [],
  loading: false,
  filters: { size: 25 },
  total: 0,
  page: 0,
  setPage: () => {},
  setFilters: () => {},
  resetData: () => {},
});

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const { getDogs, getDogsById, getBreeds } = useApi();
  const { isAuthenticated } = useAuth();

  const [dogs, setDogs] = useState([]);
  const [breeds, setBreeds] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<FiltersProps>({ size: 25 });
  const [page, setPage] = useState(1);

  const resetData = () => {
    setDogs([]);
    setBreeds([]);
    setTotal(0);
    setLoading(false);
    setFilters({ size: 25 });
  };

  //Load data and prevent unnecesary re-fetching with useCallback
  const loadDogs = useCallback(async () => {
    setLoading(true);
    const queryString = createQueryString(filters);
    getDogs(queryString)
      .then(async (res) => {
        const dogs = await getDogsById(res.resultIds);
        console.log(dogs);
        setDogs(dogs);
        setTotal(res.total);
      })
      .catch((e) => console.error("Error Fetching Data", e))
      .finally(() => setLoading(false));
  }, [filters]);

  //Get all Breeds
  const loadBreeds = async () => {
    getBreeds()
      .then((res) => {
        setBreeds(res);
      })
      .catch((e) => console.error("Error Fetching Data", e));
  };

  //Load Data when user authenticates
  useEffect(() => {
    loadDogs();
    loadBreeds();
  }, [isAuthenticated]);

  useEffect(() => {
    loadDogs();
  }, [filters]);

  return (
    <FilterContext.Provider
      value={{
        dogs,
        breeds,
        loading,
        total,
        page,
        setPage,
        filters,
        resetData,
        setFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export function useFilter() {
  return useContext(FilterContext);
}
