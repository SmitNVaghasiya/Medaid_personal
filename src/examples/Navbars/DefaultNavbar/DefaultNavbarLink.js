// react-router-dom components
import { Link } from "react-router-dom";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

import React from "react"; // @mui material components

import Icon from "@mui/material/Icon";

//React components

import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

function DefaultNavbarLink({ icon, name, route, light }) {
  return (
    <>
      <SuiBox
        component={Link}
        to={route}
        mx={1}
        p={1}
        display="flex"
        alignItems="center"
        className="cursor-pointer user-select-none"
      >
        <Icon
          className={`vertical-middle ${
            light ? "text-white" : "text-secondary"
          }`}
        >
          {icon}
        </Icon>
        <SuiTypography
          variant="button"
          fontWeight="regular"
          textColor={light ? "white" : "dark"}
          textTransform="capitalize"
          customClass="w-100 line-height-0"
        >
          &nbsp;{name}
        </SuiTypography>
      </SuiBox>
    </>
  );
}

// Typechecking props for the DefaultNavbarLink
DefaultNavbarLink.propTypes = {
  icon: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
  light: PropTypes.bool.isRequired,
};

export default DefaultNavbarLink;
