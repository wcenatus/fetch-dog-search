import { Button, Container, Typography, Sheet } from "@mui/joy";

export const Navbar = () => {
  const handleLogout = () => {
    // Add your logout logic here, e.g., clearing session or redirecting
    console.log("Logged out");
  };

  return (
    <Sheet
      variant="solid"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 2,
        backgroundColor: "white", // Customize the background color as you wish
      }}
    >
      <Container sx={{ display: "flex" }}>
        <Typography sx={{ fontWeight: 700 }}>LOGO</Typography>
      </Container>

      <Button onClick={handleLogout} variant="outlined">
        Logout
      </Button>
    </Sheet>
  );
};
