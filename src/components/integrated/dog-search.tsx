import { useState } from "react";
import { Card } from "@/components/simple/card";
import { Pagination } from "@/components/integrated/pagination";
import { BottomBar } from "@/components/integrated/bottom-bar";
import { useFilter } from "@/context/filter-context";
import { Filters } from "./filters"; // Assuming Filters component contains all the filter inputs
import { Dog } from "@/types/dog";
import { Button } from "@mui/joy";
import { FilterAlt } from "@mui/icons-material";
import { Navbar } from "./navbar";

export interface DogProps {
  img: string;
  breed: string;
  id: string;
  name: string;
  zip_code: string;
}

export const DogSearch = () => {
  const { dogs, loading } = useFilter();
  const [favorites, setFavorites] = useState<DogProps[]>([]);
  const [showFilters, setShowFilters] = useState(false); // State to control visibility of filters

  const addFavorites = (dog: any) => {
    setFavorites([...favorites, dog]);
  };

  const removeFavorite = (id: string) => {
    setFavorites((prevDogs) => prevDogs.filter((dog) => dog.id !== id));
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center space-y-6 p-6">
        {/* Container for Pagination and Filters Button */}
        <div className="w-full flex sm:flex-row sm:items-center sm:gap-4 sm:mb-4 flex-col justify-between items-center mb-4">
          <div className="flex-shrink-0 sm:w-auto sm:flex justify-start w-full">
            <Pagination />
          </div>
          <Button
            startDecorator={<FilterAlt />}
            variant="outlined"
            onClick={() => setShowFilters(!showFilters)}
          >
            {showFilters ? "Hide Filters" : "Show Filters"}
          </Button>
        </div>

        {/* Filters Section */}
        <div
          className={`rounded p-10 bg-gray-100 ${showFilters ? "" : "hidden"}`}
        >
          <Filters />
        </div>

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

        {/* Bottom Pagination */}
        <div className="w-full flex lg:justify-start mt-4">
          <Pagination />
        </div>

        {/* Bottom Bar Which will appear when favorites are added */}
        <BottomBar favorites={favorites} removeFavorite={removeFavorite} />
      </div>
    </>
  );
};
