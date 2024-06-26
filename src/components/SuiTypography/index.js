import { forwardRef } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// clsx is a utility for constructing className strings conditionally
import clsx from "clsx";

import React from "react"; // @mui material components

import Typography from "@mui/material/Typography";

// Custom styles for SuiTypography
import styles from "components/SuiTypography/styles";

const SuiTypography = forwardRef(
  (
    {
      textColor,
      fontWeight,
      textTransform,
      verticalAlign,
      textGradient,
      opacity,
      customClass,
      children,
      ...rest
    },
    ref
  ) => {
    const classes = styles({
      textColor,
      textTransform,
      verticalAlign,
      opacity,
    });

    return (
      <Typography
        {...rest}
        ref={ref}
        className={clsx(classes.suiTypography, customClass, {
          [classes[`suiTypography_${fontWeight}`]]: fontWeight,
          [classes.suiTypography_textTransform]: textTransform,
          [classes.suiTypography_verticalAlign]: verticalAlign,
          [classes.suiTypography_textGradient]: textGradient,
        })}
      >
        {children}
      </Typography>
    );
  }
);

// Setting default values for the props of SuiTypography
SuiTypography.defaultProps = {
  textColor: "dark",
  fontWeight: false,
  textTransform: "none",
  verticalAlign: "unset",
  textGradient: false,
  opacity: 1,
  customClass: "",
};

// Typechecking props for the SuiTypography
SuiTypography.propTypes = {
  textColor: PropTypes.oneOf([
    "inherit",
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
    "text",
    "white",
  ]),
  fontWeight: PropTypes.oneOf([false, "light", "regular", "medium", "bold"]),
  textTransform: PropTypes.oneOf([
    "none",
    "capitalize",
    "uppercase",
    "lowercase",
  ]),
  verticalAlign: PropTypes.oneOf([
    "unset",
    "baseline",
    "sub",
    "super",
    "text-top",
    "text-bottom",
    "middle",
    "top",
    "bottom",
  ]),
  textGradient: PropTypes.bool,
  children: PropTypes.node.isRequired,
  opacity: PropTypes.number,
  customClass: PropTypes.string,
};

export default SuiTypography;
