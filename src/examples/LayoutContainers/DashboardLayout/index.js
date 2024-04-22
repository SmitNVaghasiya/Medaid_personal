import React from "react";
import { useEffect } from "react";

// react-router-dom components
import { useLocation } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

//React components

import SuiBox from "components/SuiBox";

// Custom styles for the LayoutContainer
import styles from "examples/LayoutContainers/DashboardLayout/styles";

//  React context
import { useSoftUIController } from "context";

function LayoutContainer({ children }) {
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, direction } = controller;
  const { pathname } = useLocation();
  const classes = styles({ miniSidenav, direction });

  useEffect(() => {
    dispatch({ type: "LAYOUT", value: "dashboard" });
  }, [pathname]);

  return (
    <SuiBox customClass={classes.layoutContainer} style={{ height: "100vh" }}>
      {children}
    </SuiBox>
  );
}

// Typechecking props for the LayoutContainer
LayoutContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LayoutContainer;
