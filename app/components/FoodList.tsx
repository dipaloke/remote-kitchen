"use client";
import { useEffect, useState } from "react";

import { FoodItemCard } from "./FoodItemCard";
import { CreateItemModal } from "./CreateItemModal";
import { UpdateItemModal } from "./UpdateItemModal";
import { FoodItem } from "../stores/useFoodStore";
import useFoodStore from "../stores/useFoodStore";

import Grid from "@mui/material/Unstable_Grid2";
import { Box, Button, Container, Typography } from "@mui/material";
import { AddCircleOutline } from "@mui/icons-material";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const FoodList = () => {
  const { items, deleteItem } = useFoodStore();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<FoodItem | null>(null);

  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.setQueryData("foodItems" as any, items);
  }, [items, queryClient]);

  const { data: foodItems } = useQuery({
    queryKey: ["foodItems"],
    queryFn: () => items,
    initialData: items,
  });

  const handleCreateClick = () => {
    setIsCreateModalOpen(true);
  };

  const handleEditClick = (item: FoodItem) => {
    setCurrentItem(item);
    setIsUpdateModalOpen(true);
  };

  const handleDeleteClick = (id: number) => {
    deleteItem(id);
    queryClient.invalidateQueries(["foodItems"] as any);
  };

  return (
    <>
      <Container>
        <div className="mb-5 justify-end flex">
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<AddCircleOutline />}
            onClick={handleCreateClick}
          >
            Add Items
          </Button>
        </div>

        <Grid container spacing={5}>
          {items.length ? (
            foodItems.map((item) => (
              <FoodItemCard
                key={item.id}
                id={item.id}
                description={item.description}
                name={item.name}
                price={item.price}
                src={item.src}
                onEdit={() => handleEditClick(item)}
                onDelete={() => handleDeleteClick(item.id)}
              />
            ))
          ) : (
            <Box component="desc">
              <Typography variant="h5">Please add an item</Typography>
            </Box>
          )}
        </Grid>

        <CreateItemModal
          open={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
        />
        {currentItem && (
          <UpdateItemModal
            open={isUpdateModalOpen}
            onClose={() => setIsUpdateModalOpen(false)}
            item={currentItem}
          />
        )}
      </Container>
    </>
  );
};
