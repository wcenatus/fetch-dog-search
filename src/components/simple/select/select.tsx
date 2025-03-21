import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";

export const SelectInput = ({
  items,
  value,
  callback,
}: {
  items: { label: string; value: string }[];
  value: any;
  callback: any;
}) => {
  return (
    <div>
      <Select
        value={value}
        onChange={(_, newValue) => callback(newValue)}
        placeholder="Sort by"
        sx={{ width: 300 }}
      >
        <Option value={""}>Sort by</Option>
        {items.map((item) => (
          <Option value={item.value}>{item.label}</Option>
        ))}
      </Select>
    </div>
  );
};
