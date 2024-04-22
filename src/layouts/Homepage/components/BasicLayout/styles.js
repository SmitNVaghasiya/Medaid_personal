import React from "react";
import { makeStyles } from "@mui/styles";

export default makeStyles(({ palette, functions, borders }) => {
  const { gradients } = palette;
  const { linearGradient, rgba, pxToRem } = functions;
  const { borderRadius } = borders;

  return {
    basicLayout: {
      backgroundImage: ({ image }) => image && `url(${image})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      width: "calc(100% - 2rem)",
      minHeight: "100vh",
      backgroundColor: "#003333",
      borderRadius: borderRadius.lg,
      opacity: "0.5",
    },
  };
});
