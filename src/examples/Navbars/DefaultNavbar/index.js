import { useState, useEffect } from "react";

// react-router components
import { Link } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

import React from "react"; // @mui material components

import Container from "@mui/material/Container";
import Icon from "@mui/material/Icon";

//React components

import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

//  //React example components
import DefaultNavbarLink from "examples/Navbars/DefaultNavbar/DefaultNavbarLink";
import DefaultNavbarMobile from "examples/Navbars/DefaultNavbar/DefaultNavbarMobile";

//
import breakpoints from "assets/theme/base/breakpoints";

// Custom styles for DashboardNavbar
import styles from "examples/Navbars/DefaultNavbar/styles/defaultNavbar";
import { useAuth } from "auth-context/auth.context";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import HomeIcon from "@mui/icons-material/Home";
import Cookies from "universal-cookie";

function DefaultNavbar({ transparent, light, action }) {
  const classes = styles({ transparent, light });
  const [mobileNavbar, setMobileNavbar] = useState(false);
  const [mobileView, setMobileView] = useState(false);
  const [show, setShow] = useState(false);
  const cookie = new Cookies();

  let { cUser } = useAuth();

  const openMobileNavbar = ({ currentTarget }) =>
    setMobileNavbar(currentTarget.parentNode);
  const closeMobileNavbar = () => setMobileNavbar(false);

  useEffect(() => {
    // A function that sets the display state for the DefaultNavbarMobile.
    function displayMobileNavbar() {
      if (window.innerWidth < breakpoints.values.lg) {
        setMobileView(true);
        setMobileNavbar(false);
      } else {
        setMobileView(false);
        setMobileNavbar(false);
      }
    }

    if (cUser) {
      setShow(true);
    }
    /** 
     The event listener that's calling the displayMobileNavbar function when 
     resizing the window.
    */
    window.addEventListener("resize", displayMobileNavbar);

    // Call the displayMobileNavbar function to set the state with the initial value.
    displayMobileNavbar();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", displayMobileNavbar);
  }, []);

  return (
    <Container>
      <SuiBox
        customClass={classes.defaultNavbar}
        py={1}
        px={{
          xs: transparent ? 4 : 5,
          sm: transparent ? 2 : 5,
          lg: transparent ? 0 : 3,
        }}
        style={{ borderRadius: "0.7rem", position: "fixed" }}
      >
        <SuiBox component={Link} to="/" py={transparent ? 1.5 : 0.75}>
          <SuiTypography
            variant="button"
            fontWeight="bold"
            textColor={light ? "white" : "dark"}
          >
            MEDAID
          </SuiTypography>
        </SuiBox>
        <SuiBox
          color="inherit"
          display={{ xs: "none", lg: "flex" }}
          m={0}
          p={0}
        >
          <DefaultNavbarLink
            icon={<HomeIcon />}
            name="home"
            route="/"
            light={light}
          />
          {!cookie.get("user") ? (
            <>
              <DefaultNavbarLink
                icon="account_circle"
                name="sign up"
                route="/authentication/sign-up"
                light={light}
              />
              <DefaultNavbarLink
                icon="key"
                name="sign in"
                route="/authentication/sign-in"
                light={light}
              />
            </>
          ) : (
            <>
              <DefaultNavbarLink
                icon={<MedicalServicesIcon />}
                name="Appointment"
                route="/service/appointment"
                light={light}
              />
              <DefaultNavbarLink
                icon="medication"
                name="Medicine"
                route="/service/medicine"
                light={light}
              />
              <DefaultNavbarLink
                icon="science"
                name="Labtest"
                route="/service/labtest"
                light={light}
              />
              <DefaultNavbarLink
                icon="donut_large"
                name="Dashboard"
                route="/dashboard/patient"
                light={light}
              />
              <DefaultNavbarLink
                icon="account_circle"
                name="sign out"
                route="/authentication/sign-out"
                light={light}
              />
            </>
          )}
        </SuiBox>
        <SuiBox
          display={{ xs: "inline-block", lg: "none" }}
          lineHeight={0}
          py={1.5}
          pl={1.5}
          color="inherit"
          customClass="cursor-pointer"
          onClick={openMobileNavbar}
        >
          <Icon fontSize="medium">{mobileNavbar ? "close" : "menu"}</Icon>
        </SuiBox>
      </SuiBox>
      {mobileView && (
        <DefaultNavbarMobile
          open={mobileNavbar}
          close={closeMobileNavbar}
          style={{ borderRadius: "0.7rem" }}
        >
          Hello
        </DefaultNavbarMobile>
      )}
    </Container>
  );
}

// Setting default values for the props of DefaultNavbar
DefaultNavbar.defaultProps = {
  transparent: false,
  light: false,
  action: false,
};

// Typechecking props for the DefaultNavbar
DefaultNavbar.propTypes = {
  transparent: PropTypes.bool,
  light: PropTypes.bool,
  action: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      type: PropTypes.oneOf(["external", "internal"]).isRequired,
      route: PropTypes.string.isRequired,
      color: PropTypes.oneOf([
        "primary",
        "secondary",
        "info",
        "success",
        "warning",
        "error",
        "dark",
        "light",
        "white",
      ]),
      label: PropTypes.string.isRequired,
    }),
  ]),
};

export default DefaultNavbar;
