import * as React from "react";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import Stack from "@mui/joy/Stack";
import { useState } from "react";
import useApi from "@/hooks/useApi";
import { Card } from "../simple/card/card";
export const CreateMatchModal = ({
  open,
  callback,
  favorites,
  children,
}: {
  open: boolean;
  callback: any;
  favorites: any;
  children: React.ReactNode;
}) => {
  const { getDogsById } = useApi();
  const [loading, setLoading] = useState(false);
  const [match, setMatch] = useState<any>(null);
  const getMatch = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/dogs/match`,
        {
          method: "POST",
          body: JSON.stringify(favorites.map((dog: any) => dog.id)),
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await res.json();
      console.log(data);

      const dog = await getDogsById(Object.values(data));
      console.log(dog);
      setMatch(dog[0]);
    } catch (e) {
      alert("Error retrieving match");
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={() => callback(false)}>
      {match ? (
        <ModalDialog>
          <DialogTitle>Here's your match!</DialogTitle>
          <Stack spacing={1}>
            <Card key={match.id} {...match} />
            <Button
              onClick={() => {
                setMatch(null);
                callback(false);
              }}
              variant="outlined"
              type="button"
            >
              Close
            </Button>
          </Stack>
        </ModalDialog>
      ) : (
        <ModalDialog>
          <DialogTitle>Create a match</DialogTitle>
          <DialogContent>
            Would you like to create a match with these dogs?
          </DialogContent>
          <form
            onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              callback(false);
            }}
          >
            <Stack spacing={1}>
              <Stack spacing={2} sx={{ maxHeight: "50vh", overflow: "auto" }}>
                {children}
              </Stack>
              <Button
                type="button"
                loading={loading}
                onClick={() => getMatch()}
              >
                Submit
              </Button>
              <Button
                onClick={() => callback(false)}
                variant="outlined"
                type="button"
              >
                Close
              </Button>
            </Stack>
          </form>
        </ModalDialog>
      )}
    </Modal>
  );
};
