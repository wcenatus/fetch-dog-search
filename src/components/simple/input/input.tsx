"use client";

export interface InputProps {
  name: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = ({ name, placeholder, value, onChange }: InputProps) => {
  return (
    <>
      <label className="block mb-2 text-sm font-medium text-gray-900 text-left capitalize">
        {name}
      </label>
      <input
        type={name.toLowerCase() === "email" ? "email" : "text"}
        className="block w-full rounded-lg border border-gray-300 text-md bg-gray-50 p-3 text-gray-900 antialiased focus:border-purple-500 focus:outline-none focus:ring-purple-500"
        name={name}
        value={value ? value : ""}
        placeholder={placeholder}
        onChange={onChange ? onChange : () => {}}
      />
    </>
  );
};
