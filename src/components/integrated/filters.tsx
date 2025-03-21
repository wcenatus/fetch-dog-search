import { useFilter } from "@/context/filter-context";
import { Autocomplete, Input, FormLabel } from "@mui/joy";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";

export const Filters = () => {
  const { breeds, filters, setFilters } = useFilter();
  const updateFilters = (newValue: any) => {
    setFilters({ ...filters, ...newValue });
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
      {/* Breed Autocomplete */}
      <div className="w-full">
        <FormLabel>Breed</FormLabel>
        <Autocomplete
          multiple
          placeholder="Select Multiple Breeds"
          options={breeds}
          getOptionLabel={(option: any) => option}
          sx={{ width: "100%" }}
          onChange={(_, newValue) => updateFilters({ breeds: newValue })}
          className="bg-white shadow-md rounded-md border"
        />
      </div>

      {/* Zip Codes Input */}
      <div className="w-full">
        <FormLabel>Zip Codes</FormLabel>
        <Input
          value={filters.zipCodes?.join(", ")} // Display selected zip codes
          onChange={(e) => {
            const newZipCodes = e.target.value
              .split(",")
              .map((zip) => zip.trim());
            updateFilters({ zipCodes: newZipCodes }); // Update filters with new zip codes
          }}
          placeholder="Enter Zip Codes"
          sx={{ width: "100%" }}
          className="bg-white shadow-md rounded-md border"
        />
      </div>

      {/* Age Range Filter */}
      <div className="flex flex-col sm:flex-row gap-4 w-full">
        <div className="w-full sm:w-1/2">
          <FormLabel>Min Age</FormLabel>
          <Input
            type="number"
            value={filters.ageMin}
            onChange={(e) => {
              const newMinAge = e.target.value;
              updateFilters({ ageMin: newMinAge }); // Update filters with min age
            }}
            placeholder="Min Age"
            sx={{ width: "100%" }}
            className="bg-white shadow-md rounded-md border"
          />
        </div>

        <div className="w-full sm:w-1/2">
          <FormLabel>Max Age</FormLabel>
          <Input
            type="number"
            slotProps={{
              input: {
                min: filters.ageMin,
              },
            }}
            value={filters.ageMax}
            onChange={(e) => {
              const newMaxAge = e.target.value;
              updateFilters({ ageMax: newMaxAge }); // Update filters with max age
            }}
            placeholder="Max Age"
            sx={{ width: "100%" }}
            className="bg-white shadow-md rounded-md border"
          />
        </div>
      </div>

      {/* Sort Select */}
      <div className="w-full">
        <FormLabel>Sort By</FormLabel>
        <Select
          value={filters.sort}
          onChange={(_, newValue) => updateFilters({ sort: newValue })}
          placeholder="Sort by"
          sx={{ width: "100%" }}
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
    </div>
  );
};
