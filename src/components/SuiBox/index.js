import { forwardRef } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";
import clsx from "clsx";

import React from "react"; // @mui material components

import Box from "@mui/material/Box";

// Custom styles for SuiBox
import styles from "components/SuiBox/styles";

const SuiBox = forwardRef(
  (
    {
      backgroundColor,
      backgroundGradient,
      color,
      opacity,
      borderRadius,
      boxShadow,
      customClass,
      ...rest
    },
    ref
  ) => {
    const classes = styles({
      backgroundColor,
      color,
      opacity,
      borderRadius,
      boxShadow,
    });

    return (
      <Box
        ref={ref}
        className={clsx(classes.suiBox, customClass, {
          [classes.suiBox_backgroundGradient]: backgroundGradient,
        })}
        {...rest}
      />
    );
  }
);

// Setting default values for the props of SuiBox
SuiBox.defaultProps = {
  backgroundColor: "transparent",
  backgroundGradient: false,
  color: "dark",
  opacity: 1,
  borderRadius: "none",
  boxShadow: "none",
  customClass: "",
};

// Typechecking props for the SuiBox
SuiBox.propTypes = {
  backgroundColor: PropTypes.string,
  color: PropTypes.string,
  backgroundGradient: PropTypes.bool,
  opacity: PropTypes.number,
  borderRadius: PropTypes.string,
  boxShadow: PropTypes.string,
  customClass: PropTypes.string,
};

export default SuiBox;
