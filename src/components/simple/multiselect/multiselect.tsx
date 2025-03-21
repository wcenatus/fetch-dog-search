import { Autocomplete } from "@mui/joy";

export const MultiSelect = ({
  options,
  callback,
}: {
  options: any;
  callback: (value: any) => void;
}) => {
  return (
    <>
      <Autocomplete
        multiple
        placeholder="Select Multiple Breeds"
        options={options}
        getOptionLabel={(option: any) => option}
        sx={{ width: 300 }}
        onChange={(_, newValue) => callback(newValue)}
      />
    </>
  );
};
