import { useState } from "react";
import { Card } from "@/components/simple/card/card";
import { Pagination } from "@/components/simple/pagination/pagination";
import { BottomBar } from "@/components/integrated/bottom-bar";
import { useFilter } from "@/context/filter-context";
import { Autocomplete } from "@mui/joy";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";

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
    console.log(favorites);
  };
  const removeFavorite = (id: string) => {
    setFavorites((prevDogs) => prevDogs.filter((dog) => dog.id !== id));
  };

  const items = [
    { label: "Breed - Ascending", value: "breed:asc" },
    { label: "Breed - Descending", value: "breed:desc" },
    { label: "Name - Ascending", value: "name:asc" },
    { label: "Name - Descending", value: "name:desc" },
    { label: "Age - Ascending", value: "age:asc" },
    { label: "Age - Descending", value: "age:desc" },
  ];

  return (
    <div className="flex flex-col items-center space-y-6 p-6">
      <div className="flex flex-wrap gap-4 justify-center w-full">
        {/* Breed Autocomplete */}
        <Autocomplete
          multiple
          placeholder="Select Multiple Breeds"
          options={breeds}
          getOptionLabel={(option: any) => option}
          sx={{ width: 300 }}
          onChange={(_, newValue) => updateFilters({ breeds: newValue })}
          className="bg-white shadow-md rounded-md border"
        />

        {/* Sort Select */}
        <Select
          value={filters.sort}
          onChange={(_, newValue) => updateFilters({ sort: newValue })}
          placeholder="Sort by"
          sx={{ width: 300 }}
          className="bg-white shadow-md rounded-md border"
        >
          <Option value={""}>Sort by</Option>
          {items.map((item) => (
            <Option value={item.value} key={item.value}>
              {item.label}
            </Option>
          ))}
        </Select>
      </div>

      {/* Pagination */}
      <Pagination />

      {loading && <p className="text-center text-gray-500">Loading...</p>}

      {/* Dog Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
        {dogs.map(
          (info: {
            img: string;
            breed: string;
            id: string;
            name: string;
            zip_code: string;
          }) => (
            <Card
              key={info.id}
              {...info}
              callback={(info) => addFavorites(info)}
              disabled={favorites.some((favDog) => favDog.id === info.id)}
            />
          )
        )}
      </div>

      {/* Pagination */}
      <Pagination />

      {/* Bottom Bar Which will appear when favorites are added */}
      <BottomBar favorites={favorites} removeFavorite={removeFavorite} />
    </div>
  );
};
