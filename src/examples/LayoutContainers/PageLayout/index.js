import React from "react";

import { useEffect } from "react";

// react-router-dom components
import { useLocation } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

//React components

import SuiBox from "components/SuiBox";

//  React context
import { useSoftUIController } from "context";

function PageLayout({ background, children }) {
  const [, dispatch] = useSoftUIController();
  const { pathname } = useLocation();

  useEffect(() => {
    dispatch({ type: "LAYOUT", value: "page" });
  }, [pathname]);

  return (
    <SuiBox
      width="100vw"
      height="100%"
      minHeight="100vh"
      backgroundColor={background}
      customClass="overflow-x-hidden"
    >
      {children}
    </SuiBox>
  );
}

// Setting default values for the props for PageLayout
PageLayout.defaultProps = {
  background: "default",
};

// Typechecking props for the PageLayout
PageLayout.propTypes = {
  background: PropTypes.oneOf(["white", "light", "default"]),
  children: PropTypes.node.isRequired,
};

export default PageLayout;
