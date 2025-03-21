import {
  Card,
  CardOverflow,
  AspectRatio,
  CardContent,
  Typography,
  IconButton,
} from "@mui/joy";
import Delete from "@mui/icons-material/Delete";

export const RowCard = ({
  favorite,
  removeFavorite,
}: {
  favorite: any;
  removeFavorite: any;
}) => {
  return (
    <Card
      orientation="horizontal"
      variant="outlined"
      className="flex items-center"
    >
      <CardOverflow>
        <AspectRatio ratio="1" sx={{ width: 90 }}>
          <img src={favorite.img} loading="lazy" alt="" />
        </AspectRatio>
      </CardOverflow>
      <CardContent>
        <Typography sx={{ fontWeight: "md" }}>{favorite.name}</Typography>
        <Typography level="body-sm">{favorite.breed}</Typography>
      </CardContent>
      <CardOverflow
        variant="soft"
        sx={{
          px: 0.5,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <IconButton
          onClick={() => removeFavorite(favorite.id)}
          variant="plain"
          color="danger"
        >
          <Delete />
        </IconButton>
      </CardOverflow>
    </Card>
  );
};
