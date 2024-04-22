import React from "react";
import { makeStyles } from "@mui/styles";
export default makeStyles(({ palette, functions, borders }) => {
  const { gradients } = palette;
  const { linearGradient, rgba, pxToRem } = functions;
  const { borderRadius } = borders;

  return {
    basicLayout: {
      width: "calc(100% - 2rem)",
      minHeight: "10vh",
      margin: pxToRem(16),
      padding: `${pxToRem(48)} 0 ${pxToRem(224)}`,
      borderRadius: borderRadius.lg,
    },
  };
});
