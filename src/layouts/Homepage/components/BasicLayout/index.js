import PropTypes from "prop-types";
import React from "react";
import Grid from "@mui/material/Grid";
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import PageLayout from "examples/LayoutContainers/PageLayout";
import styles from "layouts/authentication/components/BasicLayout/styles";
import FilledInfoCard from "examples/Cards/InfoCards/FilledInfoCard";
import { Card } from "@mui/material";

function BasicLayout({ title, description, image, children }) {
  const classes = styles({ image });

  return (
    <PageLayout style={{ backgroundColor: "black" }}>
      <DefaultNavbar dark />
      <SuiBox
        width="100vw"
        minHeight="75vh"
        pt={6}
        pb={28}
        sx={{
          backgroundImage: ({
            functions: { linearGradient, rgba },
            palette: { gradients },
          }) => image && `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          filter: "drop-shadow(10px 10px 10px rgba(0,0,0,0.9))",
        }}
      >
        <Grid
          container
          spacing={3}
          justifyContent="center"
          sx={{ textAlign: "center" }}
        >
          <Grid
            item
            xs={10}
            lg={8}
            style={{ height: "40vh" }}
            justifyContent="center"
          >
            <Card
              sx={{
                p: 2,
                mx: { xs: 1, lg: 3 },
                mt: 9,
                mb: 4,
                backgroundColor: ({
                  palette: { white },
                  functions: { rgba },
                }) => rgba(white.main, 0.8),
                backdropFilter: "saturate(200%) blur(30px)",
                boxShadow: ({ boxShadows: { xxl } }) => xxl,
              }}
            >
              <FilledInfoCard
                variant="gradient"
                color="info"
                title={title}
                description={description}
              />
            </Card>
          </Grid>
        </Grid>
      </SuiBox>
      <SuiBox
        mt={{ xs: -26, lg: -24 }}
        px={1}
        width="calc(100% - 2rem)"
        mx="auto"
      >
        <Grid container spacing={1} justifyContent="center">
          <Grid item xs={11}>
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
