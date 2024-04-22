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
      <DefaultNavbar routes={routes} action={{}} transparent light />
      <SuiBox customClass={classes.basicLayout}>
        <Grid
          container
          spacing={3}
          justifyContent="center"
          className="text-center"
        >
          <Grid item xs={10} lg={4}>
            <SuiBox mt={6} mb={1}>
              <SuiTypography variant="h1" textColor="white" fontWeight="bold">
                {title}
              </SuiTypography>
            </SuiBox>
          </Grid>
        </Grid>
      </SuiBox>
      <SuiBox
        mt={{ xs: -26, lg: -26 }}
        mb={3}
        px={1}
        width="calc(100% - 2rem)"
        mx="auto"
      >
        <Grid container spacing={1} justifyContent="center">
          <Grid
            item
            xs={widthxs}
            sm={widthsm}
            md={widthmd}
            lg={widthlg}
            style={{ minWidth: "470px" }}
          >
            {children}
          </Grid>
        </Grid>
      </SuiBox>
    </PageLayout>
  );
}
BasicLayout.defaultProps = {
  title: "",
  description: "",
};
BasicLayout.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default BasicLayout;
