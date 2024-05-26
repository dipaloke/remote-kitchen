"use client"
import { FoodItemCard } from "./FoodItemCard";
import { Data } from "@/data/data";

import Grid from "@mui/material/Unstable_Grid2";
import { Button, Container } from "@mui/material";
import { AddCircleOutline } from "@mui/icons-material";

export const FoodList = () => {

  const handleClick = () => {

  }

  return (
    <div>
      <Container>
        <div className="mb-5 justify-end flex">
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<AddCircleOutline />}
            onClick={handleClick}
          >
            Add Items
          </Button>
        </div>
        <Grid container spacing={5}>
          {Data.map((item) => (
            <FoodItemCard
              key={item.id}
              id={item.id}
              description={item.description}
              name={item.name}
              price={item.price}
              src={item.src}
            />
          ))}
        </Grid>
      </Container>
    </div>
  );
};
