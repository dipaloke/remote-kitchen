import * as React from "react";
import { Copyright } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

export const Footer = () => {
  return (
    <Box
      component="footer"
      className="flex justify-center w-full bg-gray-100 py-4 mt-5 fixed bottom-0"
    >
      <Box className="flex justify-between items-center w-full max-w-screen-xl px-4">
        <Typography variant="h6" className="font-semibold">
          Remote Kitchen
        </Typography>
        <Box className="flex items-center text-sm md:text-xl text-gray-600  ">
          <Copyright className="mr-2" />
          <Typography variant="body2">All rights reserved</Typography>
        </Box>
      </Box>
    </Box>
  );
};
