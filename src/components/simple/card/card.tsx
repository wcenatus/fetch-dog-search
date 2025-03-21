import { Button } from "@mui/joy";

export const Card = ({
  img,
  breed,
  id,
  name,
  zip_code,
  disabled,
  callback,
}: {
  img: string;
  breed: string;
  id: string;
  name: string;
  zip_code: string;
  disabled?: boolean;
  callback?: (info: any) => void;
}) => {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm ">
      <div className="w-full h-48 overflow-hidden">
        <img
          className="w-full h-full object-cover rounded-t-lg"
          src={img}
          alt=""
        />
      </div>

      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
          {name}
        </h5>

        <p className="mb-3 font-normal text-gray-700">{breed}</p>

        {callback && (
          <Button
            disabled={disabled}
            onClick={() => callback({ img, breed, id, name, zip_code })}
          >
            Add
            <svg
              className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </Button>
        )}
      </div>
    </div>
  );
};
