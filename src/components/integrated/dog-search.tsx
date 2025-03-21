import { useState } from "react";
import { Card } from "@/components/simple/card";
import { Pagination } from "@/components/integrated/pagination";
import { BottomBar } from "@/components/integrated/bottom-bar";
import { useFilter } from "@/context/filter-context";
import { Autocomplete, Input } from "@mui/joy";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import { Dog } from "@/types/dog";
import { Filters } from "./filters";

export interface DogProps {
  img: string;
  breed: string;
  id: string;
  name: string;
  zip_code: string;
}

export const DogSearch = () => {
  const { dogs, breeds, filters, setFilters, loading } = useFilter();
  const [favorites, setFavorites] = useState<DogProps[]>([]);
  const updateFilters = (newValue: any) => {
    setFilters({ ...filters, ...newValue });
  };
  const addFavorites = (dog: any) => {
    setFavorites([...favorites, dog]);
  };
  const removeFavorite = (id: string) => {
    setFavorites((prevDogs) => prevDogs.filter((dog) => dog.id !== id));
  };

  return (
    <div className="flex flex-col items-center space-y-6 p-6">
      {/* {Filter} */}
      <Filters />

      {/* Pagination */}
      <Pagination />

      {loading && <p className="text-center text-gray-500">Loading...</p>}

      {/* Dog Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
        {dogs.map((info: Dog) => (
          <Card
            key={info.id}
            data={info}
            callback={(info) => addFavorites(info)}
            disabled={favorites.some((favDog) => favDog.id === info.id)}
          />
        ))}
      </div>

      {/* Pagination */}
      <Pagination />

      {/* Bottom Bar Which will appear when favorites are added */}
      <BottomBar favorites={favorites} removeFavorite={removeFavorite} />
    </div>
  );
};
