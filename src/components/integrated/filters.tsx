import { useFilter } from "@/context/filter-context";
import { Autocomplete, Input } from "@mui/joy";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";

export const Filters = () => {
  const { dogs, breeds, filters, setFilters, loading } = useFilter();
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
      <Input
        value={filters.zipCodes?.join(", ")} // Display selected zip codes
        onChange={(e) => {
          const newZipCodes = e.target.value
            .split(",")
            .map((zip) => zip.trim());
          // setZipCodes(newZipCodes);
          updateFilters({ zipCodes: newZipCodes }); // Update filters with new zip codes
        }}
        placeholder="Enter Zip Codes"
        sx={{ width: 300 }}
        className="bg-white shadow-md rounded-md border"
      />
      {/* Age Range Filter */}
      <div className="flex gap-4">
        <Input
          type="number"
          value={filters.ageMin}
          onChange={(e) => {
            const newMinAge = e.target.value;
            updateFilters({ ageMin: newMinAge }); // Update filters with min age
          }}
          placeholder="Min Age"
          sx={{ width: 130 }}
          className="bg-white shadow-md rounded-md border"
        />
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
          sx={{ width: 130 }}
          className="bg-white shadow-md rounded-md border"
        />
      </div>
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
  );
};
