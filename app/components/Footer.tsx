import * as React from "react";
import { Copyright } from "@mui/icons-material";

export const Footer = () => {
  return (
    <div className="flex justify-center w-full bg-gray-100 py-4 my-5">
      <div className="flex justify-between items-center w-full max-w-screen-xl px-4">
        <div className="text-xl font-semibold">Remote Kitchen</div>
        <div className="flex items-center text-sm md:text-xl text-gray-600  ">
          <Copyright className="mr-2" />
          <span>All rights reserved</span>
        </div>
      </div>
    </div>
  );
};
