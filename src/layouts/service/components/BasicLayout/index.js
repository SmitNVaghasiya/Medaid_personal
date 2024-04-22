import PropTypes from "prop-types";
import React from "react";
import Grid from "@mui/material/Grid";
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import PageLayout from "examples/LayoutContainers/PageLayout";
import styles from "layouts/authentication/components/BasicLayout/styles";
import routes from "routes";

function BasicLayout({
  widthxs,
  widthsm,
  widthmd,
  widthlg,
  title,
  description,
  image,
  children,
}) {
  const classes = styles({ image });

  return (
    <PageLayout>
      <DefaultNavbar routes={routes} dark />
      <SuiBox customClass={classes.basicLayout}>
        <Grid
          container
          spacing={3}
          justifyContent="center"
          className="text-center"
        ></Grid>
      </SuiBox>
      <SuiBox
        mt={{ xs: -26, lg: -26 }}
        mb={3}
        px={1}
        width="calc(100% - 2rem)"
        mx="auto"
      >
        <Grid container spacing={1} justifyContent="center">
          <Grid item xs={12}>
            {children}
          </Grid>
        </Grid>
      </SuiBox>
    </PageLayout>
  );
}

// Setting default values for the props of BasicLayout
BasicLayout.defaultProps = {
  title: "",
  description: "",
};

// Typechecking props for the BasicLayout
BasicLayout.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default BasicLayout;
