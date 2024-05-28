"use client";
import React from "react";

import { FoodList } from "./components/FoodList";

import { QueryClient } from "@tanstack/query-core";
import { QueryClientProvider } from "@tanstack/react-query";
import { Box, Typography } from "@mui/material";

const queryClient = new QueryClient();

export default function Home() {
  return (
    <Box className="flex flex-col min-h-screen relative">
      <Typography variant="h4" className="text-center py-8 font-bold">Food Items</Typography>
      <QueryClientProvider client={queryClient}>
        <Box className="flex-grow pb-20">
          <FoodList />
        </Box>
      </QueryClientProvider>
    </Box>
  );
}
