
import Image from "next/image";

import { Box, Button, Divider, Paper } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import { Edit } from "@mui/icons-material";

interface CardProps {
  id: number;
  name: string;
  description: string;
  price: string;
  src: string;
  onEdit: () => void;
  onDelete: () => void;
}

export const FoodItemCard = ({
  id,
  name,
  description,
  price,
  src,
  onEdit,
  onDelete,
}: CardProps) => {
  return (
    <Grid xs={12} sm={6} md={4} lg={3}>
      <Paper elevation={5} className="h-full flex flex-col">
        <Box className="relative w-full h-40">
          <Image
            src={src}
            alt={name}
            fill
            className="w-full h-full pb-2 object-cover"
          />
        </Box>
        <Box className="flex flex-col flex-1 p-2">
          <Typography variant="h6">{name}</Typography>
          <Typography
            component="h2"
            variant="body2"
            className="flex-1 truncate"
          >
            {description}
          </Typography>
          <Typography variant="h6" color="secondary" sx={{ margin: "10px 0" }}>
            ${price}
          </Typography>
          <Divider />
          <div className="flex justify-center gap-x-8 md:justify-around mt-4 mb-2">
            <Button
              variant="outlined"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={onDelete}
            >
              Delete
            </Button>
            <Button
              variant="contained"
              color="secondary"
              endIcon={<Edit />}
              onClick={onEdit}
            >
              Edit
            </Button>
          </div>
        </Box>
      </Paper>
    </Grid>
  );
};
