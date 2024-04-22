import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CenteredBlogCard from "layouts/service/Medicine/listCard";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import { styled } from "@mui/styles";
import { Button, InputBase, Menu, TextField } from "@mui/material";
import BasicLayout from "layouts/service/components/BasicLayout";
import { useEffect, useState } from "react";
import AuthApi from "api/auth";
import { city } from "helper/constant/array";
import Cookies from "universal-cookie";
import { useHistory } from "react-router-dom";

function Appointment() {
  const [mainDetail, setMainDetail] = useState([]);
  const [detail, setDetail] = useState([]);
  const [show, setShow] = useState(false);
  const [workplace, setWorkplaceinfo] = useState({});
  const cookies = new Cookies();
  const history = useHistory();
  var [city, setCity] = useState([]);

  useEffect(() => {
    AuthApi.getWorkplace("MEDICAL").then((data) => {
      console.log(data);
      if (data.data.statusCode == 200) {
        setMainDetail(data.data.data.workplaces);
        setDetail(data.data.data.workplaces);
        setCity(data.data.data.city);
        console.log(data.data.data.workplaces);
        console.log(data.data.data.city);
      } else {
        console.log("response data ", data);
      }
    });
  }, []);

  const toggleModal = () => setShow(!show);

  const filterCity = (e) => {
    const { name, value } = e.target;
    setWorkplaceinfo((preValue) => {
      console.log(preValue);
      return {
        ...preValue,
        [name]: value,
      };
    });
    if (e.target.value == "none") {
      setDetail(mainDetail);
    } else {
      setDetail(mainDetail.filter((x) => x.city == e.target.value));
    }
  };

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

  return (
    <BasicLayout>
      {!cookies.get("user") ? (
        history.push("/authentication/sign-in")
      ) : cookies.get("user").type != "PATIENT" &&
        cookies.get("user").type != "ADMIN" ? (
        history.push("/dashboard/" + cookies.get("user").type.toLowerCase())
      ) : (
        <Grid container justifyContent="center">
          <Grid item xs={11} lg={11}>
            <Card
              sx={{
                p: 2,
                mx: { xs: 2, lg: 3 },
                mt: 0,
                mb: 0,
                backgroundColor: ({
                  palette: { white },
                  functions: { rgba },
                }) => rgba(white.main, 0.8),
                backdropFilter: "saturate(200%) blur(30px)",
                boxShadow: ({ boxShadows: { xxl } }) => xxl,
              }}
            >
              <Grid container xs={12} direction="column">
                <Grid
                  item
                  container
                  xs={12}
                  direction="row"
                  justifyContent="flex-end"
                  spacing={2}
                >
                  <Grid item xs={3} lg={2}>
                    <FormControl variant="standard" style={{ width: "100%" }}>
                      <NativeSelect
                        id="demo-customized-select-native"
                        value={workplace.city}
                        name="city"
                        onChange={filterCity}
                        input={<BootstrapInput />}
                      >
                        <option value="none">City</option>
                        {city.map((e) => (
                          <option value={e._id}>{e._id}</option>
                        ))}
                      </NativeSelect>
                    </FormControl>
                    {/* <SuiButton variant="gradient" color="info" onClick={toggleModal}>
                    close
                  </SuiButton> */}
                  </Grid>
                </Grid>
                {detail.map((e) => (
                  <Grid item xs={12}>
                    <CenteredBlogCard
                      color="dark"
                      label="Order Now"
                      // onClick={() => { bookClick(e) }}
                      workplace={e}
                    />
                  </Grid>
                ))}
              </Grid>
            </Card>
          </Grid>
        </Grid>
      )}
    </BasicLayout>
  );
}

export default Appointment;
