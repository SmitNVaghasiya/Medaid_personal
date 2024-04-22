// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

import React from "react";

// @mui material components
import Menu from "@mui/material/Menu";

//React components
import SuiBox from "components/SuiBox";

//React example components
import DefaultNavbarLink from "examples/Navbars/DefaultNavbar/DefaultNavbarLink";

import { useState, useEffect } from "react";
import { useAuth } from "auth-context/auth.context";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import HomeIcon from "@mui/icons-material/Home";
import Cookies from "universal-cookie";

function DefaultNavbarMobile({ open, close }) {
  const { width } = open && open.getBoundingClientRect();
  const [show, setShow] = useState(false);
  const cookies = new Cookies();

  return (
    <Menu
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      anchorEl={open}
      open={Boolean(open)}
      onClose={close}
      MenuListProps={{ style: { width: `calc(${width}px - 4rem)` } }}
    >
      <SuiBox px={0.5}>
        <DefaultNavbarLink
          icon={<HomeIcon />}
          name="home"
          route="/"
          light={false}
        />
        {!cookies.get("user") ? (
          <>
            <DefaultNavbarLink
              icon="account_circle"
              name="sign up"
              route="/authentication/sign-up"
              light={false}
            />
            <DefaultNavbarLink
              icon="key"
              name="sign in"
              route="/authentication/sign-in"
              light={false}
            />
          </>
        ) : (
          <>
            <DefaultNavbarLink
              icon={<MedicalServicesIcon />}
              name="Appointment"
              route="/service/appointment"
              light={false}
            />
            <DefaultNavbarLink
              icon="medication"
              name="Medicine"
              route="/service/medicine"
              light={false}
            />
            <DefaultNavbarLink
              icon="science"
              name="Labtest"
              route="/service/labtest"
              light={false}
            />
            <DefaultNavbarLink
              icon="donut_large"
              name="dashboard"
              route="/dashboard/patient"
              light={false}
            />
            <DefaultNavbarLink
              icon="account_circle"
              name="sign out"
              route="/authentication/sign-out"
              light={false}
            />
          </>
        )}
      </SuiBox>
    </Menu>
  );
}

// Typechecking props for the DefaultNavbarMenu
DefaultNavbarMobile.propTypes = {
  open: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
  close: PropTypes.oneOfType([PropTypes.func, PropTypes.bool, PropTypes.object])
    .isRequired,
};

export default DefaultNavbarMobile;
