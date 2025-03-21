import { useAuth } from "@/context/auth-context";
import { Button, Container, Sheet } from "@mui/joy";
import logo from "@/assets/fetch.svg";

export const Navbar = () => {
  const { logout } = useAuth();

  return (
    <Sheet
      variant="solid"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 2,
        backgroundColor: "white",
      }}
    >
      <Container sx={{ display: "flex" }}>
        <img src={logo} alt="Logo" style={{ width: "70px", height: "auto" }} />
      </Container>

      <Button onClick={() => logout()} variant="outlined">
        Logout
      </Button>
    </Sheet>
  );
};
