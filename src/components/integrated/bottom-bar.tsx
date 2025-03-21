import { CreateMatchModal } from "@/components/integrated/create-match";
import { Button } from "@mui/joy";
import { useState } from "react";
import { RowCard } from "@/components/simple/row-card";

export const BottomBar = ({
  favorites,
  removeFavorite,
}: {
  favorites: any;
  removeFavorite: (id: string) => void;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <CreateMatchModal open={open} callback={setOpen} favorites={favorites}>
        {favorites.length > 0 ? (
          favorites.map(
            (favorite: {
              img: string;
              breed: string;
              id: string;
              name: string;
              zip_code: string;
            }) => (
              <RowCard
                key={favorite.id}
                favorite={favorite}
                removeFavorite={removeFavorite}
              />
            )
          )
        ) : (
          <div>There are no favorites, Go add some!</div>
        )}
      </CreateMatchModal>

      <div
        className={`fixed bottom-0 left-0 w-full bg-white shadow-2xl p-4 flex justify-center ${
          favorites.length > 0 ? "" : "hidden"
        }`}
      >
        <Button
          onClick={() => setOpen(true)}
          variant="solid"
          color="primary"
          size="lg"
          className="px-6 py-3 rounded-full"
        >
          Create Match {`(${favorites.length})`}
        </Button>
      </div>
    </>
  );
};
