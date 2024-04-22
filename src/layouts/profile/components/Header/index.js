import { useState, useEffect } from "react";
import React from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import breakpoints from "assets/theme/base/breakpoints";
import styles from "layouts/profile/components/Header/styles";
import Switch from "@mui/material/Switch";
import { FormControlLabel } from "@mui/material";
import AuthApi from "api/auth";
import Cookies from "universal-cookie";

function Header(props) {
  const cookies = new Cookies();
  const [user, setUser] = useState(cookies.get("user"));
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(0);
  const [visible, setvisible] = useState("false");
  const classes = styles();
  const [enable, setenable] = useState(true);
  const [switchEnable, setSwitchEnable] = useState(props.isVisible);

  useEffect(() => {
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }
    window.addEventListener("resize", handleTabsOrientation);
    handleTabsOrientation();
    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);

  async function onChange(e) {
    var value = !switchEnable;
    console.log(value);

    await AuthApi.updateUser("WORKPLACE", { isVisible: value }).then(
      async (data) => {
        if (data.data.statusCode == 200) {
          setSwitchEnable(value);
          var cookieUser = cookies.get("user");
          console.log("cookieUser  ", cookieUser);
          cookieUser.workplace.isVisible = value;
          cookies.set("user", cookieUser, { path: "/" });
        } else {
          setError("Details is not Edited");
        }
      }
    );
  }

  return (
    <>
      <SuiBox position="relative">
        <DashboardNavbar absolute light />
        <SuiBox customClass={classes.profileHeader_background} />
        <Card className={classes.profileHeader_profile}>
          <Grid
            container
            spacing={3}
            alignItems="center"
            justifyContent="space-between"
            style={{ paddingRight: "40px" }}
          >
            <Grid item>
              <SuiBox height="100%" mt={0.5} lineHeight={1}>
                <SuiTypography variant="h5" fontWeight="medium">
                  {props.name}
                </SuiTypography>
                <SuiTypography
                  variant="button"
                  textColor="text"
                  fontWeight="medium"
                >
                  {props.type}
                </SuiTypography>
              </SuiBox>
            </Grid>
            {user.type == "PATIENT" ? (
              ""
            ) : (
              <Grid
                item
                container
                xs={12}
                md={6}
                lg={4}
                sx={{ ml: "auto" }}
                justifyContent="flex-end"
              >
                <FormControlLabel
                  control={<Switch checked={switchEnable} onClick={onChange} />}
                  label={switchEnable ? "Enable" : "Disable"}
                />
              </Grid>
            )}
          </Grid>
        </Card>
      </SuiBox>
    </>
  );
}

export default Header;
