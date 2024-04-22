import React from "react";
import Grid from "@mui/material/Grid";
import SuiBox from "components/SuiBox";
import AuthApi from "../../api/auth";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import Header from "layouts/profile/components/Header";
import { useState } from "react";
import Cookies from "universal-cookie";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/styles";
import { city } from "helper/constant/array";
import {
  Button,
  Container,
  Divider,
  FormControl,
  InputBase,
  Modal,
  NativeSelect,
  Slide,
} from "@mui/material";
import SuiTypography from "components/SuiTypography";
import SuiButton from "components/SuiButton";
import SuiInput from "components/SuiInput";
import Slider from "@mui/material/Slider";

//time slot
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";

function profile() {
  const cookies = new Cookies();
  const [user, setUser] = useState(cookies.get("user"));
  user.dob = new Date(Date.parse(user.dob));
  user.dob = user.dob.toLocaleDateString("en-US");
  const [userinfo, setUserinfo] = useState({});
  var [workplace, setWorkplaceinfo] = useState({});
  const [show, setShow] = useState(false);
  const [showw, setShoww] = useState(false);
  const [showww, setShowww] = useState(false);
  const toggleModal = () => setShow(!show);
  const toggleModalw = () => setShoww(!showw);
  const [error, setError] = useState(false);

  const toggleModalww = () => {
    setLeft(
      getTiemSloats(timeSlots.openTime, timeSlots.closeTime, timeSlots.time)
    );
    setShowww(!showww);
  };

  const setTimeSlots = (right) => {
    setWorkplaceinfo((preValue) => {
      return {
        ...preValue,
        ["timeSlots"]: right,
      };
    });
  };

  var [timeSlots, settimeSlotsinfo] = useState({
    openTime: "",
    closeTime: "",
    time: "",
  });

  function not(a, b) {
    return a.filter((value) => b.indexOf(value) === -1);
  }

  function intersection(a, b) {
    return a.filter((value) => b.indexOf(value) !== -1);
  }

  const timesloatInputEvent = (e) => {
    const { name, value } = e.target;
    settimeSlotsinfo((preValue) => {
      console.log(preValue);

      return {
        ...preValue,
        [name]: value.toUpperCase(),
      };
    });
    setWorkplaceinfo((preValue) => {
      console.log(preValue);
      console.log(e.target.value);
      if (name == "mobileNo") {
        return {
          ...preValue,
          [name]: value.toUpperCase(),
        };
      }
      return {
        ...preValue,
        [name]: value.toUpperCase(),
      };
    });
  };

  const userInputEvent = (e) => {
    const { name, value } = e.target;
    setUserinfo((preValue) => {
      console.log(userinfo);
      return {
        ...preValue,
        [name]: value,
      };
    });
  };

  const stime = [
    {
      value: 15,
      label: "15",
    },
    {
      value: 30,
      label: "30",
    },
    {
      value: 45,
      label: "45",
    },
    {
      value: 60,
      label: "60",
    },
  ];

  const workplaceInputEvent = (e) => {
    const { name, value } = e.target;
    setWorkplaceinfo((preValue) => {
      console.log(preValue);
      return {
        ...preValue,
        [name]: value,
      };
    });
  };

  const times = (e) => {
    const { name, value } = e.target;
    setWorkplaceinfo((preValue) => {
      console.log(preValue);
      return {
        ...preValue,
        [name]: value,
      };
    });
  };

  const time = () => {
    var timeArr = [];
    for (var i = 0; i < 25; i++) {
      timeArr = [...timeArr, <option value={i}>{i}</option>];
    }
    return timeArr;
  };

  const BootstrapInput = styled(InputBase)(({ theme }) => ({
    "label + &": {
      marginTop: theme.spacing(3),
    },
    "& .MuiInputBase-input": {
      borderRadius: 4,
      position: "relative",
      backgroundColor: theme.palette.background.paper,
      fontSize: 14,
      color: "currentColor",
      padding: "10px 26px 10px 12px",
      transition: theme.transitions.create(["border-color", "box-shadow"]),
    },
    "& .MuiInputBase-root.Mui-user": {
      color: "rgba(0, 0, 0, 0.38)", // (default alpha is 0.38)
    },
  }));

  const editUser = async () => {
    if (user.type == "PATIENT") {
      if (!user.city) {
        return setError("Please Enter city.");
      } else setError(null);
    }
    await AuthApi.updateUser("USER", userinfo).then(async (data) => {
      //console.log(data.data.data);
      if (data.data.statusCode == 200) {
        toggleModal();
      } else {
        setError("Details is not Edited");
      }
    });
    setProfile();
  };

  const editWorkplace = async () => {

    console.log(workplace.mobileNo)
    if (!/^([^0-9,]*)$/.test(workplace.name)) {
      console.log("avyu to");
      return setError("Name can't contain numbers or symbols.");
    } else {
      setError(null);
    }

    if (
      !/^(((\+?\(91\))|0|((00|\+)?91))-?)?[0-9]\d{9}$/.test(
        workplace.mobileNo
      ) &&
      workplace.mobileNo != undefined
    ) {
      console.log("avyu to aya pan");
      return setError("Enter valid mobile number.");
    } else {
      setError(null);
    }

    if (!/^[.0-9a-zA-Z\s,-/]+$/.test(workplace.address) &&
    workplace.address != undefined) {
      return setError("Enter valid Address.");
    } else {
      setError(null);
    }

    if (!/^[0-9]+$/.test(workplace.fees) &&
    workplace.fees != undefined) {
      return setError("Fees should be only numerics.");
    } else {
      setError(null);
    }

    await AuthApi.updateUser("WORKPLACE", workplace).then(async (data) => {
      console.log(data.data.data);
      if (data.data.statusCode == 200) {
        toggleModalw();
      } else {
        setError("Details is not Edited");
      }
    });
    setProfile();
  };

  const generate = async () => {
    if (!(!!workplace.openTime && !!workplace.closeTime && !!workplace.time)) {
      return setError("Please fill every field.");
    } else setError(null);
    toggleModalww();
  };

  const setProfile = async () => {
    var response = await AuthApi.getUser();
    if (response.data.statusCode != 200) {
      console.log(response);
      return;
    }
    let user = { ...response.data.data };
    const cookies = new Cookies();
    cookies.set("user", user, { path: "/" });
    console.log("cookies" + cookies.get("user").userId);
    refreshPage();
  };

  const refreshPage = () => {
    window.location.reload();
  };

  const getTiemSloats = (opt, ctt, min) => {
    var times = [];
    var op = new Date();
    op.setHours(opt);
    op.setMinutes(0);
    op.setSeconds(0);

    var ct = new Date();
    ct.setHours(ctt);
    ct.setMinutes(0);
    ct.setSeconds(0);

    var sloatM = min;
    var st = op;

    console.log(ct);
    console.log(new Date(st.getTime() + 1 * 60000));
    while (st.getTime() < ct.getTime()) {
      var lato = new Date(st.getTime() + sloatM * 60000);
      times.push(
        (st.getHours() < 10 ? "0" + st.getHours() : st.getHours()) +
          ":" +
          (st.getMinutes() < 10 ? "0" + st.getMinutes() : st.getMinutes()) +
          " TO " +
          (lato.getHours() < 10 ? "0" + lato.getHours() : lato.getHours()) +
          ":" +
          (lato.getMinutes() < 10 ? "0" + lato.getMinutes() : lato.getMinutes())
      );
      st = lato;
    }

    return times;
  };

  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState([0, 1, 2, 3]);
  const [right, setRight] = React.useState([]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  const handleAllRight = () => {
    setRight(right.concat(left));
    setLeft([]);
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
  };

  const customList = (items) => (
    <Paper sx={{ width: 200, height: 230, overflow: "auto" }}>
      <List dense component="div" role="list">
        {items.map((value) => {
          const labelId = `transfer-list-item-${value}-label`;

          return (
            <ListItem
              key={value}
              role="listitem"
              button
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    "aria-labelledby": labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`${value}`} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Paper>
  );

  const handleSetTabValue = (event, newValue) => setTabValue(newValue);

  return (
    <DashboardLayout>
      {!cookies.get("user") ? (
        history.push("/authentication/sign-in")
      ) : (
        <>
          {user.type == "PATIENT" ? (
            <Header name={user.name} type={user.type} />
          ) : (
            <Header
              name={user.name}
              type={user.type}
              isVisible={user.workplace.isVisible}
            />
          )}
          <SuiBox mt={5}>
            <Grid container spacing={3} justifyContent="center">
              {user.type == "PATIENT" ? (
                <Grid item xs={12} md={11} lg={10}>
                  <ProfileInfoCard
                    title="profile information"
                    description=""
                    info={{
                      fullName: user.name,
                      mobile: user.mobileNo,
                      City: user.city,
                      gender: user.gender,
                      dob: user.dob,
                    }}
                    action={{ tooltip: "Edit Profile" }}
                    click={toggleModal}
                  />
                </Grid>
              ) : (
                <Grid item xs={12} md={5} lg={5}>
                  <ProfileInfoCard
                    title="profile information"
                    description=""
                    info={{
                      fullName: user.name,
                      mobile: user.mobileNo,
                      City: user.city,
                      gender: user.gender,
                      dob: user.dob,
                      registrationCouncil: user.registrationCouncil,
                      registrationNumber: user.registrationNumber,
                      registrationYear: user.registrationYear,
                      specialization: user.specialization,
                    }}
                    action={{ tooltip: "Edit Profile" }}
                    click={toggleModal}
                  />
                </Grid>
              )}
              {user.workplace ? (
                <Grid item xs={12} md={5} lg={5}>
                  <ProfileInfoCard
                    title="Workplace Detail"
                    description=""
                    info={{
                      Name: user.workplace.name,
                      Mobile: "+91" + user.workplace.mobileNo,
                      City: user.workplace.city,
                      Address: user.workplace.address,
                      Fees: user.workplace.fees,
                      Time:
                        user.workplace.openTime +
                        " To " +
                        user.workplace.closeTime,
                      Status: user.workplace.isVisible.toString(),
                    }}
                    action={{ tooltip: "Edit Workplace" }}
                    click={toggleModalw}
                  />
                </Grid>
              ) : (
                ""
              )}
            </Grid>
          </SuiBox>
        </>
      )}
      <Grid item container xs={11} lg={6}>
        <Modal
          open={show}
          onClose={toggleModal}
          sx={{ display: "grid", placeItems: "center" }}
        >
          <Slide direction="down" in={show} timeout={400}>
            <SuiBox
              position="relative"
              fullWidth
              display="flex"
              flexDirection="column"
              borderRadius="xl"
              style={{ backgroundColor: "white" }}
              shadow="xl"
              m={0}
            >
              <SuiBox
                display="flex"
                alginItems="center"
                justifyContent="space-between"
                p={2}
                pb={0}
              >
                <CloseIcon
                  fontSize="medium"
                  sx={{ cursor: "pointer" }}
                  onClick={toggleModal}
                />
              </SuiBox>
              <Divider sx={{ my: 0 }} />
              <SuiBox component="section" py={{ xs: 0, lg: 0 }} px={0}>
                <Container>
                  <Grid container item>
                    <SuiBox
                      width="100%"
                      bgColor="white"
                      borderRadius="xl"
                      shadow="xl"
                      mb={2}
                      m={0}
                      sx={{ overflow: "hidden" }}
                    >
                      <Grid container spacing={2} justifyContent="center">
                        <Grid item xs={12} lg={12} alignItems="center">
                          <SuiBox component="form" p={1} method="post">
                            <SuiBox px={0} py={{ xs: 2, sm: 2 }}>
                              <SuiTypography variant="h3" mb={2}>
                                Edit Details
                              </SuiTypography>
                              <Grid container>
                                <Grid item xs={12} pr={1} mb={2}>
                                  <FormControl
                                    variant="standard"
                                    style={{ width: "100%" }}
                                  >
                                    <NativeSelect
                                      id="demo-customized-select-native"
                                      value={userinfo.city}
                                      name="city"
                                      onChange={userInputEvent}
                                      input={<BootstrapInput />}
                                    >
                                      <option value="none">City</option>
                                      {city.map((e) => (
                                        <option value={e}>{e}</option>
                                      ))}
                                    </NativeSelect>
                                  </FormControl>
                                </Grid>
                              </Grid>

                              <Grid item xs={12} pr={1} mb={2}>
                                <SuiBox mt={2} mb={2} textAlign="center">
                                  <h4
                                    style={{
                                      fontSize: ".6em",
                                      color: "red",
                                      textAlign: "center",
                                      fontWeight: 400,
                                      transition: ".2s all",
                                    }}
                                  >
                                    {error}
                                  </h4>
                                </SuiBox>
                              </Grid>
                              <Divider sx={{ my: 0 }} />
                              <Grid
                                container
                                item
                                xs={12}
                                pr={1}
                                mb={2}
                                justifyContent="flex-end"
                              >
                                <SuiButton
                                  variant="gradient"
                                  buttonColor="dark"
                                  onClick={editUser}
                                >
                                  Submit
                                </SuiButton>
                              </Grid>
                            </SuiBox>
                          </SuiBox>
                        </Grid>
                      </Grid>
                    </SuiBox>
                  </Grid>
                </Container>
              </SuiBox>
            </SuiBox>
          </Slide>
        </Modal>
      </Grid>

      <Grid container item xs={11} lg={6}>
        <Modal
          open={showw}
          onClose={toggleModalw}
          sx={{ display: "grid", placeItems: "center" }}
          style={{
            overflow: "scroll",
          }}
        >
          <Slide direction="down" in={showw} timeout={400}>
            <SuiBox
              position="relative"
              fullWidth
              display="flex"
              flexDirection="column"
              borderRadius="xl"
              style={{ backgroundColor: "white" }}
              shadow="xl"
              m={0}
            >
              <SuiBox
                display="flex"
                alginItems="center"
                justifyContent="space-between"
                p={2}
                pb={0}
              >
                <CloseIcon
                  fontSize="medium"
                  sx={{ cursor: "pointer" }}
                  onClick={toggleModalw}
                />
              </SuiBox>
              <Divider sx={{ my: 0 }} />
              <SuiBox component="section" py={{ xs: 0, lg: 0 }} px={0}>
                <Container>
                  <Grid container item>
                    <SuiBox
                      width="100%"
                      bgColor="white"
                      borderRadius="xl"
                      shadow="xl"
                      mb={2}
                      m={0}
                      sx={{ overflow: "hidden" }}
                    >
                      <Grid container spacing={2} justifyContent="center">
                        <Grid item xs={12} lg={12} alignItems="center">
                          <SuiBox component="form" p={1} method="post">
                            <SuiBox px={0} py={{ xs: 2, sm: 2 }}>
                              <SuiTypography variant="h3" mb={2}>
                                Edit Details
                              </SuiTypography>

                              <Grid container>
                                <Grid item xs={12} pr={1} mb={2}>
                                  <SuiBox mb={2}>
                                    <SuiInput
                                      onChange={workplaceInputEvent}
                                      placeholder="Workplace Name"
                                      name="name"
                                    />
                                  </SuiBox>
                                  <SuiBox mb={2}>
                                    <SuiInput
                                      onChange={workplaceInputEvent}
                                      type="text"
                                      name="mobileNo"
                                      placeholder="Workplace Mobile No"
                                    />
                                  </SuiBox>
                                  <SuiBox mb={2}>
                                    <SuiInput
                                      onChange={workplaceInputEvent}
                                      type="text"
                                      placeholder="Workplace Address"
                                      name="address"
                                    />
                                  </SuiBox>

                                  <Grid
                                    xs={12}
                                    item
                                    container
                                    justifyContent="space-between"
                                  >
                                    <Grid item xs={6} lg={5.7}>
                                      <SuiBox fullWidth mb={2}>
                                        <FormControl
                                          variant="standard"
                                          style={{ width: "100%" }}
                                        >
                                          <NativeSelect
                                            id="demo-customized-select-native"
                                            name="city"
                                            value={workplace.city}
                                            onChange={workplaceInputEvent}
                                            input={<BootstrapInput />}
                                          >
                                            <option value="none">City</option>
                                            {city.map((e) => (
                                              <option value={e}>{e}</option>
                                            ))}
                                          </NativeSelect>
                                        </FormControl>
                                      </SuiBox>
                                    </Grid>
                                    <Grid item xs={6} lg={5.6}>
                                      <SuiInput
                                        onChange={workplaceInputEvent}
                                        type="text"
                                        placeholder="Fees"
                                        name="fees"
                                      />
                                    </Grid>
                                  </Grid>

                                  <SuiBox fullWidth mb={2}>
                                    <FormControl
                                      variant="standard"
                                      style={{ width: "100%" }}
                                    >
                                      <NativeSelect
                                        id="demo-customized-select-native"
                                        value={workplace.holiday}
                                        name="holiday"
                                        onChange={workplaceInputEvent}
                                        input={<BootstrapInput />}
                                      >
                                        <option selected value="none" user>
                                          Holiday
                                        </option>
                                        <option value="SATURDAY">
                                          Saturday
                                        </option>
                                        <option value="SUNDAY">Sunday</option>
                                        <option value="SATANDSUN">
                                          Saturday and Sunday
                                        </option>
                                      </NativeSelect>
                                    </FormControl>
                                  </SuiBox>

                                  <Grid
                                    xs={12}
                                    container
                                    justifyContent="space-between"
                                  >
                                    <Grid xs={6} lg={5.7}>
                                      <SuiBox fullWidth mb={2}>
                                        <FormControl
                                          variant="standard"
                                          style={{ width: "100%" }}
                                        >
                                          <NativeSelect
                                            id="demo-customized-select-native"
                                            value={timeSlots.openTime}
                                            name="openTime"
                                            onChange={timesloatInputEvent}
                                            input={<BootstrapInput />}
                                          >
                                            <option selected value="openTime">
                                              Open time
                                            </option>
                                            {time()}
                                          </NativeSelect>
                                        </FormControl>
                                      </SuiBox>
                                    </Grid>

                                    <Grid xs={6} lg={5.8}>
                                      <SuiBox fullWidth mb={2}>
                                        <FormControl
                                          variant="standard"
                                          style={{ width: "100%" }}
                                        >
                                          <NativeSelect
                                            id="demo-customized-select-native"
                                            value={timeSlots.closeTime}
                                            name="closeTime"
                                            onChange={timesloatInputEvent}
                                            input={<BootstrapInput />}
                                          >
                                            <option selected value="closeTime">
                                              Close time
                                            </option>
                                            {time()}
                                          </NativeSelect>
                                        </FormControl>
                                      </SuiBox>
                                    </Grid>
                                  </Grid>
                                  <SuiBox mb={2}>
                                    <SuiInput
                                      onChange={timesloatInputEvent}
                                      placeholder="Time"
                                      name="time"
                                    />
                                  </SuiBox>
                                </Grid>
                              </Grid>

                              <Grid item xs={10} md={6} ml={22} mr={0}>
                                <SuiBox mb={4} mr={3}>
                                  <SuiButton
                                    variant="gradient"
                                    buttonColor="dark"
                                    onClick={generate}
                                  >
                                    Generate Slots
                                  </SuiButton>
                                </SuiBox>
                              </Grid>

                              <Grid item xs={12} pr={1} mb={2}>
                                <SuiBox mt={2} mb={2} textAlign="center">
                                  <h4
                                    style={{
                                      fontSize: ".6em",
                                      color: "red",
                                      textAlign: "center",
                                      fontWeight: 400,
                                      transition: ".2s all",
                                    }}
                                  >
                                    {error}
                                  </h4>
                                </SuiBox>
                              </Grid>
                              <Divider sx={{ my: 0 }} />
                              <Grid
                                container
                                item
                                xs={12}
                                pr={1}
                                mb={2}
                                justifyContent="flex-end"
                              >
                                <SuiButton
                                  variant="gradient"
                                  buttonColor="dark"
                                  onClick={editWorkplace}
                                >
                                  Submit
                                </SuiButton>
                              </Grid>
                            </SuiBox>
                          </SuiBox>
                        </Grid>
                      </Grid>
                    </SuiBox>
                  </Grid>
                </Container>
              </SuiBox>
            </SuiBox>
          </Slide>
        </Modal>
      </Grid>
      <Grid container item xs={11} lg={6}>
        <Modal
          open={showww}
          onClose={toggleModalww}
          sx={{
            display: "grid",
            placeItems: "center",
          }}
        >
          <Slide direction="down" in={showww} timeout={400}>
            <SuiBox
              position="relative"
              fullWidth
              display="flex"
              flexDirection="column"
              borderRadius="xl"
              style={{ backgroundColor: "white" }}
              shadow="xl"
              m={0}
            >
              <SuiBox
                display="flex"
                alginItems="center"
                justifyContent="space-between"
                p={2}
                pb={0}
              >
                <CloseIcon
                  fontSize="medium"
                  sx={{ cursor: "pointer" }}
                  onClick={toggleModalww}
                />
              </SuiBox>
              <Divider sx={{ my: 0 }} />
              <SuiBox component="section" py={{ xs: 0, lg: 0 }} px={0}>
                <Container>
                  <Grid container item>
                    <SuiBox
                      width="100%"
                      bgColor="white"
                      borderRadius="xl"
                      shadow="xl"
                      mb={2}
                      m={0}
                      sx={{ overflow: "hidden" }}
                    >
                      <Grid container spacing={2} justifyContent="center">
                        <Grid item xs={12} lg={12} alignItems="center">
                          <SuiBox component="form" p={1} method="post">
                            <SuiBox px={0} py={{ xs: 2, sm: 2 }}>
                              <SuiTypography variant="h3" mb={2}>
                                Time SLots
                              </SuiTypography>

                              <Grid
                                container
                                spacing={2}
                                justifyContent="center"
                                alignItems="center"
                              >
                                <Grid item>{customList(left)}</Grid>
                                <Grid item>
                                  <Grid
                                    container
                                    direction="column"
                                    alignItems="center"
                                  >
                                    <Button
                                      sx={{ my: 0.5 }}
                                      variant="outlined"
                                      size="small"
                                      onClick={handleAllRight}
                                      disabled={left.length === 0}
                                      aria-label="move all right"
                                    >
                                      ≫
                                    </Button>
                                    <Button
                                      sx={{ my: 0.5 }}
                                      variant="outlined"
                                      size="small"
                                      onClick={handleCheckedRight}
                                      disabled={leftChecked.length === 0}
                                      aria-label="move selected right"
                                    >
                                      &gt;
                                    </Button>
                                    <Button
                                      sx={{ my: 0.5 }}
                                      variant="outlined"
                                      size="small"
                                      onClick={handleCheckedLeft}
                                      disabled={rightChecked.length === 0}
                                      aria-label="move selected left"
                                    >
                                      &lt;
                                    </Button>
                                    <Button
                                      sx={{ my: 0.5 }}
                                      variant="outlined"
                                      size="small"
                                      onClick={handleAllLeft}
                                      disabled={right.length === 0}
                                      aria-label="move all left"
                                    >
                                      ≪
                                    </Button>
                                  </Grid>
                                </Grid>
                                <Grid item>{customList(right)}</Grid>
                              </Grid>

                              <Grid item xs={12} pr={1} mb={2}>
                                <SuiBox mt={2} mb={2} textAlign="center">
                                  <h4
                                    style={{
                                      fontSize: ".6em",
                                      color: "red",
                                      textAlign: "center",
                                      fontWeight: 400,
                                      transition: ".2s all",
                                    }}
                                  >
                                    {error}
                                  </h4>
                                </SuiBox>
                              </Grid>
                              <Divider sx={{ my: 0 }} />
                              <Grid
                                container
                                item
                                xs={12}
                                pr={1}
                                mb={2}
                                justifyContent="flex-end"
                              >
                                <SuiButton
                                  variant="gradient"
                                  buttonColor="dark"
                                  onClick={() => {
                                    setTimeSlots(right);
                                    toggleModalww();
                                  }}
                                  name="timeSlots"
                                >
                                  Submit
                                </SuiButton>
                              </Grid>
                            </SuiBox>
                          </SuiBox>
                        </Grid>
                      </Grid>
                    </SuiBox>
                  </Grid>
                </Container>
              </SuiBox>
            </SuiBox>
          </Slide>
        </Modal>
      </Grid>
    </DashboardLayout>
  );
}

export default profile;
