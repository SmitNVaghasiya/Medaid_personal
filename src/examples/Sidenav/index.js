import { useEffect } from "react";
import { useLocation, NavLink, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import clsx from "clsx";
import React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";
import Link from "@mui/material/Link";
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SidenavCollapse from "examples/Sidenav/SidenavCollapse";
import styles from "examples/Sidenav/styles/sidenav";
import { useSoftUIController } from "context";
import { useAuth } from "auth-context/auth.context";
import Cookies from "universal-cookie";

function Sidenav({ routes, ...rest }) {
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, transparentSidenav } = controller;
  const classes = styles({ miniSidenav, transparentSidenav });
  const location = useLocation();
  const { pathname } = location;
  const collapseName = pathname.split("/").slice(1)[0];
  const cookies = new Cookies();
  const history = useHistory();

  const closeSizenav = () => dispatch({ type: "MINI_SIDENAV", value: true });

  useEffect(() => {
    // A function that sets the mini state of the sidenav.
    function handleMiniSidenav() {
      dispatch({
        type: "MINI_SIDENAV",
        value: window.innerWidth < 1200,
      });
    }

    /** 
     The event listener that's calling the handleMiniSidenav function when resizing the window.
    */
    window.addEventListener("resize", handleMiniSidenav);

    // Call the handleMiniSidenav function to set the state with the initial value.
    handleMiniSidenav();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleMiniSidenav);
  }, [dispatch, location]);

  let { user } = useAuth();
  var temptype;
  // Render all the routes from the routes.js (All the visible items on the Sidenav)
  const RenderRoutes = routes.map(
    ({ type, usertype, name, icon, title, noCollapse, key, route, href }) => {
      if (
        !cookies.get("user") ||
        !usertype.includes(cookies.get("user").type)
      ) {
        return <></>;
      }
      let returnValue;
      if (type === "collapse") {
        returnValue = href ? (
          <Link
            href={href}
            key={key}
            target="_blank"
            rel="noreferrer"
            className={classes.sidenav_navlink}
          >
            <SidenavCollapse
              name={name}
              icon={icon}
              active={key === collapseName}
              noCollapse={noCollapse}
            />
          </Link>
        ) : (
          <NavLink to={route} key={key} className={classes.sidenav_navlink}>
            <SidenavCollapse
              name={name}
              icon={icon}
              active={key === collapseName}
              noCollapse={noCollapse}
            />
          </NavLink>
        );
      } else if (type === "title") {
        returnValue = (
          <SuiTypography
            key={key}
            variant="caption"
            fontWeight="bold"
            textTransform="uppercase"
            customClass={classes.sidenav_title}
          >
            {title}
          </SuiTypography>
        );
      } else if (type === "divider") {
        returnValue = <Divider key={key} />;
      } else if (type === "hidden") {
        returnValue = <></>;
      }

      return returnValue;
    }
  );

  return (
    <Drawer
      {...rest}
      variant="permanent"
      classes={{
        paper: clsx(classes.sidenav, {
          [classes.sidenav_open]: !miniSidenav,
          [classes.sidenav_close]: miniSidenav,
        }),
      }}
    >
      <SuiBox customClass={classes.sidenav_header}>
        <SuiBox
          display={{ xs: "block", xl: "none" }}
          position="absolute"
          top={0}
          right={0}
          p={1.625}
          customClass="cursor-pointer"
          onClick={closeSizenav}
        >
          <SuiTypography variant="h6" textColor="secondary">
            <Icon className="font-bold">close</Icon>
          </SuiTypography>
        </SuiBox>
        <NavLink to="/">
          <SuiBox customClass={classes.sidenav_logoLabel}>
            <SuiTypography component="h6" variant="button" fontWeight="medium">
              MEDAID
            </SuiTypography>
          </SuiBox>
        </NavLink>
      </SuiBox>
      <Divider />
      <List>{RenderRoutes}</List>
    </Drawer>
  );
}

// Typechecking props for the Sidenav
Sidenav.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Sidenav;
