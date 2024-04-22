import React from "react";
import BasicLayout from "layouts/Homepage/components/BasicLayout";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { styled } from "@mui/styles";
import { InputBase } from "@mui/material";
import homepage2 from "assets/homepage2.jpg";
import FilledInfoCard from "examples/Cards/InfoCards/FilledInfoCard";
import { faClinicMedical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";
import Cookies from "universal-cookie";

function Homepage() {
  const cookies = new Cookies();
  const history = useHistory();

  const BootstrapInput = styled(InputBase)(({ theme }) => ({
    "label + &": {
      marginTop: theme.spacing(3),
    },
    "& .MuiInputBase-input": {
      height: "1rem",
      borderRadius: 4,
      position: "relative",
      backgroundColor: theme.palette.background.paper,
      fontSize: 12,
      color: "currentColor",
      padding: "10px 26px 10px 12px",
      transition: theme.transitions.create(["border-color", "box-shadow"]),
    },
    "& .MuiInputBase-root.Mui-disabled": {
      color: "rgba(0, 0, 0, 0.38)", // (default alpha is 0.38)
    },
  }));

  return !cookies.get("user") ||
    (cookies.get("user").type != "PATIENT" &&
    cookies.get("user").type != "ADMIN"
      ? history.push("/dashboard/" + cookies.get("user").type.toLowerCase())
      : true) ? (
    <BasicLayout
      title="Looking For HealthCare?"
      description="Medaid is a single plateform to Book an Appointment , Oreder Medicine and Book labtest on your fingertips with allowing you to chat with Doctors, Chemist and Labtechs providing you service."
      image={homepage2}
      style={{ backgroundColor: "black" }}
    >
      <Card
        sx={{
          p: 2,
          mx: { xs: 1, lg: 3 },
          mt: 9,
          mb: 4,
          backgroundColor: ({ palette: { white }, functions: { rgba } }) =>
            rgba(white.main, 0.8),
          backdropFilter: "saturate(200%) blur(30px)",
          boxShadow: ({ boxShadows: { xxl } }) => xxl,
        }}
      >
        <Grid container lg={12} spacing={3}>
          <Grid item xs={12} lg={4}>
            <FilledInfoCard
              variant="gradient"
              color="info"
              icon={<FontAwesomeIcon size="xs" icon={faClinicMedical} />}
              title="Book Appointment"
              description="Book your appointment online with the top  hospital doctors and get best medical treatment . You can request an emergency appointment if you have any critical condition. Understand emergencies may come up to get reponse from doctor."
              action={{
                type: "internal",
                route: "/service/appointment",
                label: "Book Now",
              }}
            />
          </Grid>
          <Grid item lg={4}>
            <FilledInfoCard
              variant="gradient"
              color="info"
              icon="medication"
              title="Order medicine"
              description="You can also get medicine at your home. Simply add prescription given by the doctor, if you want to order medicine online. Also you can book your medicines to be picked up by own to avoid delivery charge. "
              action={{
                type: "internal",
                route: "/service/medicine",
                label: "Order Now",
              }}
            />
          </Grid>
          <Grid item lg={4}>
            <FilledInfoCard
              variant="gradient"
              color="info"
              icon="science"
              title="Book lab test"
              description="For any tests as prescribed by physician  enter your requirements properly with date and timings to get your test reports on time. 
              Please do wait until the lab technician allocate you a free slot according to your given requirements."
              action={{
                type: "internal",
                route: "/service/labtest",
                label: "Book Now",
              }}
            />
          </Grid>
        </Grid>
      </Card>
    </BasicLayout>
  ) : (
    false
  );
}

export default Homepage;
