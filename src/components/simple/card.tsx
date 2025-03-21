import { Button } from "@mui/joy";
import { Add } from "@mui/icons-material";
import { Dog } from "@/types/dog";

export const Card = ({
  data,
  disabled,
  callback,
}: {
  data: Dog;
  disabled?: boolean;
  callback?: (info: any) => void;
}) => {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm">
      {/* Image Section */}
      <div className="w-full h-48 overflow-hidden">
        <img
          className="w-full h-full object-cover rounded-t-lg"
          src={data.img}
          alt={data.name}
        />
      </div>

      {/* Card Content */}
      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
          {data.name}
        </h5>

        <p className="mb-1 text-gray-700">
          <span className="font-semibold">Breed:</span> {data.breed}
        </p>

        <p className="mb-1 text-gray-700">
          <span className="font-semibold">Age:</span> {data.age} years
        </p>

        <p className="mb-3 text-gray-700">
          <span className="font-semibold">Zip Code:</span> {data.zip_code}
        </p>

        {/* Action Button */}
        {callback && (
          <Button disabled={disabled} onClick={() => callback({ ...data })}>
            Add
            <Add />
          </Button>
        )}
      </div>
    </div>
  );
};
