import { useState } from "react";
import { Link } from "react-router-dom";
import * as React from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import { Box, Button, InputBase } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiInput from "components/SuiInput";
import SuiButton from "components/SuiButton";
import BasicLayout from "layouts/authentication/components/BasicLayout";
import curved6 from "assets/images/curved-images/curved14.jpg";
import AuthApi from "../../../api/auth";
import { useHistory } from "react-router-dom";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { auth } from "api/firebase";
import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import { styled } from "@mui/styles";
import { useAuth } from "auth-context/auth.context";
import { city } from "helper/constant/array";
import Cookies from "universal-cookie";

import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";

import { useTheme } from "@mui/material/styles";
// import MobileStepper from "@mui/material/MobileStepper";
// import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
// import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

//time slot
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import { Container, Divider, Modal, Slide } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const steps = [
  "Service provider details",
  "Education details",
  "Workplace details",
];

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function SignUpsp() {
  const history = useHistory();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const [value, setValue] = useState(null);
  var [user, setuserinfo] = useState({
    name: "",
    gender: "",
    dob: "",
    city: "",
    mobileNo: "",
    type: "",
    otp: "",
  });

  var [workplace, setWorkplaceinfo] = useState({
    name: "",
    address: "",
    city: "",
    mobileNo: "",
    type: "",
    fees: "",
    holiday: "",
    openTime: "",
    closeTime: "",
    time: "",
    timeSlots: [],
  });

  var [timeSlots, settimeslotsinfo] = useState({
    openTime: "",
    closeTime: "",
    time: "",
  });

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

  const [final, setfinal] = useState("");
  const [finalNumber, setfinalNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [buttonText, setButtonText] = useState("Sign up");
  const [otpButtonText, setOtpButtonText] = useState("Send otp");
  const [error, setError] = useState(undefined);
  const [success, setSuccess] = useState(undefined);
  const [visible, setVisible] = useState(false);
  const [otpVisible, setOtpVisible] = useState(false);
  const { setUser, userJ, cUser } = useAuth();
  const [showw, setShoww] = useState(false);
  const toggleModalw = () => {
    setLeft(
      getTiemSloats(timeSlots.openTime, timeSlots.closeTime, timeSlots.time)
    );
    setShoww(!showw);
  };

  const setTimeSlots = (right) => {
    setWorkplaceinfo((preValue) => {
      return {
        ...preValue,
        ["timeSlots"]: right,
      };
    });
  };

  const theme = useTheme();
  const maxSteps = steps.length;
  const [activeStep2, setActiveStep2] = React.useState(0);

  const handleNextopen = () => {
    setActiveStep2((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBackclose = () => {
    setActiveStep2((prevActiveStep) => prevActiveStep - 1);
  };

  const cookies = new Cookies();

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const validation = async () => {
    if (!/^([^0-9,]*)$/.test(user.name)) {
      return setError("Name can't contain numbers or symbols.");
    } else setError(null);

    if (!/^(((\+?\(91\))|0|((00|\+)?91))-?)?[0-9]\d{9}$/.test(user.mobileNo)) {
      return setError("Enter valid mobile number.");
    } else setError(null);

    if (!/^([^0-9,]*)$/.test(workplace.name)) {
      return setError("Name can't contain numbers or symbols.");
    } else setError(null);

    if (!/^[/0-9a-zA-Z\s,-]+$/.test(user.registrationNumber)) {
      return setError("Enter valid Registration Number.");
    } else setError(null);

    if (!/^[a-zA-Z &]*$/.test(user.specialization)) {
      return setError("Specialization can't contain numbers or symbols.");
    } else setError(null);

    if (!/^[a-zA-Z &.]*$/.test(user.ugEducation)) {
      return setError(
        "Under graduation details can't contain numbers or symbols."
      );
    } else setError(null);

    if (!/^[a-zA-Z &.]*$/.test(user.pgEducation)) {
      return setError(
        "Post graduation details can't contain numbers or symbols."
      );
    } else setError(null);

    if (!/^[a-zA-Z &]*$/.test(user.registrationCouncil)) {
      return setError("Registration Council can't contain numbers or symbols.");
    } else setError(null);

    if (!/^([^0-9,]*)$/.test(workplace.name)) {
      return setError("Name can't contain numbers or symbols.");
    } else setError(null);

    if (
      !/^(((\+?\(91\))|0|((00|\+)?91))-?)?[0-9]\d{9}$/.test(workplace.mobileNo)
    ) {
      return setError("Enter valid mobile number.");
    } else setError(null);

    if (!/^[.0-9a-zA-Z\s,-/]+$/.test(workplace.address)) {
      return setError("Enter valid Address.");
    } else setError(null);
  };

  const register = async (event) => {
    console.log("called");
    if (event) {
      event.preventDefault();
    }
    if (
      !(
        user.type == "DOCTOR" ||
        user.type == "CHEMIST" ||
        user.type == "LABTECH"
      )
    ) {
      return setError("Enter Valid User type.");
    } else setError(null);

    if (user.type == "DOCTOR" || user.type == "LABTECH") {
      if (
        !(
          !!user.name &&
          !!user.dob &&
          !!user.gender &&
          !!user.mobileNo &&
          !!user.type &&
          !!user.city &&
          !!user.specialization &&
          !!user.ugEducation &&
          !!user.pgEducation &&
          !!user.registrationCouncil &&
          !!user.registrationNumber &&
          !!user.registrationYear &&
          !!workplace.name &&
          !!workplace.mobileNo &&
          !!workplace.address &&
          !!workplace.city &&
          !!workplace.holiday &&
          !!workplace.openTime &&
          !!workplace.closeTime &&
          !!workplace.time
        )
      ) {
        return setError("Please fill every field.");
      } else setError(null);

      validation();
    }

    if (user.type == "CHEMIST") {
      if (
        !(
          !!user.name &&
          !!user.dob &&
          !!user.gender &&
          !!user.mobileNo &&
          !!user.city &&
          !!user.type &&
          !!workplace.name &&
          !!workplace.mobileNo &&
          !!workplace.address &&
          !!workplace.city &&
          !!workplace.holiday &&
          !!workplace.openTime &&
          !!workplace.closeTime
        )
      ) {
        return setError("Please fill every field.");
      } else setError(null);
      validation();
    }

    if (user.mobileNo == finalNumber) {
      validateOtp();
    } else {
      setSuccess(null);
      setError("Invalid OTP.");
    }
  };

  const generate = async () => {
    if (!(!!workplace.openTime && !!workplace.closeTime && !!workplace.time)) {
      return setError("Please fill every field to generate time slots.");
    } else setError(null);
    toggleModalw();
  };

  function validateOtp() {
    console.log("press");
    if (user.otp === null || final === null) return;
    final
      .confirm(user.otp)
      .then((result) => {
        console.log(result);
        signup();
      })
      .catch((err) => {
        setSuccess(null);
        setError("Wrong OTP");
      });
  }

  const signup = async () => {
    try {
      setButtonText("Signing up");
      let response = await AuthApi.signup({
        user: user,
        workplace: workplace,
      });
      console.log(response);
      if (response.data && response.data.statusCode !== 200) {
        setButtonText("Sign up");
        return setError(response.data.message);
      }
      console.log("before push");
      return history.push("/authentication/sign-in");
    } catch (err) {
      console.log(err);
      setButtonText("Sign up");
      if (err.response) {
        return setError(err.response.data.msg);
      }
      return setError("There has been an error.");
    }
  };

  const userInputEvent = (e) => {
    const { name, value } = e.target;
    setuserinfo((preValue) => {
      console.log(preValue);
      if (name == "mobileNo") {
        return {
          ...preValue,
          [name]: "+91" + value.toUpperCase(),
        };
      }
      if (name == "time") {
        return {
          ...preValue,
          [name]: value,
        };
      }
      return {
        ...preValue,
        [name]: value.toUpperCase(),
      };
    });
  };

  const workplaceInputEvent = (e) => {
    const { name, value } = e.target;
    setWorkplaceinfo((preValue) => {
      console.log(preValue);
      console.log(e.target.value);
      if (name == "mobileNo") {
        return {
          ...preValue,
          [name]: "+91" + value.toUpperCase(),
        };
      }
      return {
        ...preValue,
        [name]: value.toUpperCase(),
      };
    });
  };

  const timesloatInputEvent = (e) => {
    const { name, value } = e.target;
    settimeslotsinfo((preValue) => {
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

  const sendOtp = async () => {
    if (
      !(
        user.type == "DOCTOR" ||
        user.type == "CHEMIST" ||
        user.type == "LABTECH"
      )
    ) {
      return setError("Enter Valid User type.");
    }

    if (user.type == "DOCTOR" || user.type == "LABTECH") {
      if (
        !(
          !!user.name &&
          !!user.dob &&
          !!user.gender &&
          !!user.mobileNo &&
          !!user.type &&
          !!user.city &&
          !!user.specialization &&
          !!user.ugEducation &&
          !!user.pgEducation &&
          !!user.registrationCouncil &&
          !!user.registrationNumber &&
          !!user.registrationYear &&
          !!workplace.name &&
          !!workplace.mobileNo &&
          !!workplace.address &&
          !!workplace.city &&
          !!workplace.holiday &&
          !!workplace.openTime &&
          !!workplace.closeTime &&
          !!workplace.time
        )
      ) {
        return setError("Please fill every field.");
      } else setError(null);

      validation();
    }

    if (user.type == "CHEMIST") {
      if (
        !(
          !!user.name &&
          !!user.dob &&
          !!user.gender &&
          !!user.mobileNo &&
          !!user.city &&
          !!user.type &&
          !!workplace.name &&
          !!workplace.mobileNo &&
          !!workplace.address &&
          !!workplace.city &&
          !!workplace.holiday &&
          !!workplace.openTime &&
          !!workplace.closeTime
        )
      ) {
        return setError("Please fill every field.");
      } else setError(null);

      validation();
    }

    setOtpButtonText("Resend OTP");

    if (!/^(((\+?\(91\))|0|((00|\+)?91))-?)?[0-9]\d{9}$/.test(user.mobileNo)) {
      return setError("Invalid Mobile Number");
    } else {
      var response = await AuthApi.isUserAvailable(user.mobileNo);
      console.log("response", response);
      if (response.data.statusCode != 200) {
        return setError("User already exist");
      }

      let verify = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            console.log("capcha verify");
          },
        },
        auth
      );
      signInWithPhoneNumber(auth, user.mobileNo, verify)
        .then((result) => {
          setfinal(result);
          setError(null);
          setSuccess("OTP sent successfully.");
          setShow(true);
          setfinalNumber(user.mobileNo);
        })
        .catch((err) => {
          setSuccess(null);
          // setError("Something went wrong!Please try again.");
        });
    }
  };

  const year = () => {
    var yearArr = [];
    for (var i = 1970; i < 2023; i++) {
      yearArr = [...yearArr, <option value={i}>{i}</option>];
    }
    return yearArr;
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
    "& .MuiInputBase-root.Mui-disabled": {
      color: "rgba(0, 0, 0, 0.38)",
    },
  }));

  var signIn = async () => {
    console.log("cUser", cUser);
    if (cUser && cUser.accessToken) {
      setProfile(await cUser.getIdToken());
    }
  };
  let { authuser } = useAuth();
  const setProfile = async (accessToken) => {
    var response = await AuthApi.getUser(accessToken);
    if (response.data.statusCode != 200) {
      console.log(response);
      return;
    }
    let userJ = { ...response.data.data };
    var userString = JSON.stringify(userJ);
    setUser(userString);
    localStorage.setItem("userString", userString);
    return history.push(`/dashboard/${userJ.type.toLowerCase()}`);
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
  const [left, setLeft] = React.useState([]);
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

  return (
    <BasicLayout
      widthxs={visible ? 11 : 10}
      widthsm={visible ? 11 : 10}
      widthmd={visible ? 11 : 10}
      widthlg={visible ? 11 : 10}
      title="Welcome!"
      image={curved6}
    >
      {cookies.get("user") ? (
        cookies.get("user").type == "PATIENT" ? (
          history.push("/")
        ) : (
          history.push("/dashboard/" + cookies.get("user").type.toLowerCase())
        )
      ) : (
        <>
          <Card
          // style={{ backgroundColor: visible ? "white" : "rgba(0,0,0,0.0)" }}
          >
            <Grid
              xs={12}
              container
              alignContent="center"
              justifyContent="space-around"
            >
              <SuiBox sx={{ width: "100%" }}>
                <Grid item lg={12} style={{ padding: "1rem" }}>
                  <Stepper activeStep={activeStep}>
                    {steps.map((label, index) => {
                      const stepProps = {};
                      const labelProps = {};
                      if (isStepSkipped(index)) {
                        stepProps.completed = false;
                      }
                      return (
                        <Step key={label} {...stepProps}>
                          <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                      );
                    })}
                  </Stepper>
                </Grid>
                <Grid
                  xs={12}
                  container
                  alignContent="center"
                  justifyContent="space-around"
                >
                  <Typography sx={{ mt: 2, mb: 1 }}>
                    {/* Step {activeStep + 1} */}
                    <Grid
                      item
                      md={6}
                      lg={4}
                      style={{
                        display: activeStep == 0 ? "block" : "none",
                        minWidth: "400px",
                      }}
                    >
                      <SuiBox
                        px={3}
                        mt={3}
                        style={{
                          backgroundColor: "white",
                          borderRadius: "0.7rem",
                        }}
                      >
                        <SuiBox component="form" role="form">
                          <SuiBox mb={2}>
                            <SuiInput
                              onChange={userInputEvent}
                              placeholder="Name"
                              name="name"
                            />
                          </SuiBox>
                          <SuiBox mb={2}>
                            <Grid
                              container
                              justifyContent="space-between"
                              direction="row"
                            >
                              <Grid item>
                                <SuiTypography
                                  variant="button"
                                  fontWeight="regular"
                                  customClass="cursor-pointer user-select-none"
                                >
                                  &nbsp;&nbsp;Gender&nbsp;
                                </SuiTypography>
                              </Grid>
                              <Grid
                                item
                                justifyContent="space-between"
                                xs={7.5}
                                direction="row"
                              >
                                <RadioGroup
                                  aria-labelledby="demo-radio-buttons-group-label"
                                  name="gender"
                                  onChange={userInputEvent}
                                  row
                                >
                                  <Grid
                                    container
                                    justifyContent="space-between"
                                    direction="row"
                                  >
                                    <Grid item>
                                      <FormControlLabel
                                        value="male"
                                        control={<Radio />}
                                        label="Male"
                                      />
                                    </Grid>
                                    <Grid item>
                                      <FormControlLabel
                                        value="female"
                                        control={<Radio />}
                                        label="Female"
                                        fontWeight="normal"
                                      />
                                    </Grid>
                                  </Grid>
                                </RadioGroup>
                              </Grid>
                            </Grid>
                          </SuiBox>
                          <SuiBox mb={2}>
                            <SuiInput
                              onChange={userInputEvent}
                              type="date"
                              name="dob"
                              placeholder="hello"
                            />
                          </SuiBox>
                          <SuiBox mb={2}>
                            <SuiInput
                              onChange={userInputEvent}
                              type="text"
                              name="mobileNo"
                              placeholder="Mobile No."
                            />
                          </SuiBox>
                          <SuiBox mb={2}>
                            <FormControl
                              variant="standard"
                              style={{ width: "100%" }}
                            >
                              <NativeSelect
                                id="demo-customized-select-native"
                                value={user.city}
                                name="city"
                                onChange={userInputEvent}
                                input={<BootstrapInput />}
                              >
                                <option selected value="City">
                                  City
                                </option>
                                {city.map((e) => (
                                  <option value={e}>{e}</option>
                                ))}
                              </NativeSelect>
                            </FormControl>
                          </SuiBox>

                          <SuiBox fullWidth>
                            <FormControl
                              variant="standard"
                              style={{ width: "100%" }}
                            >
                              <NativeSelect
                                id="demo-customized-select-native"
                                value={user.type}
                                name="type"
                                onChange={userInputEvent}
                                input={<BootstrapInput />}
                              >
                                <option selected value="User">
                                  User Type
                                </option>
                                <option value="DOCTOR">DOCTOR</option>
                                <option value="CHEMIST">CHEMIST</option>
                                <option value="LABTECH">LABTECH</option>
                              </NativeSelect>
                            </FormControl>
                          </SuiBox>
                        </SuiBox>
                      </SuiBox>
                    </Grid>
                    <Grid
                      item
                      md={6}
                      lg={4}
                      style={{
                        display: activeStep == 1 ? "block" : "none",
                        minWidth: "400px",
                      }}
                    >
                      <SuiBox
                        px={3}
                        mt={3}
                        style={{
                          backgroundColor: "white",
                          borderRadius: "0.7rem",
                        }}
                      >
                        <SuiBox component="form" role="form">
                          <SuiBox mb={2}>
                            <SuiInput
                              onChange={userInputEvent}
                              type="text"
                              name="specialization"
                              placeholder="Specialization"
                            />
                          </SuiBox>

                          <SuiBox mb={2}>
                            <SuiInput
                              onChange={userInputEvent}
                              type="text"
                              name="ugEducation"
                              placeholder="UnderGraduation Details"
                            />
                          </SuiBox>

                          <SuiBox mb={2}>
                            <SuiInput
                              onChange={userInputEvent}
                              type="text"
                              name="pgEducation"
                              placeholder="PostGraduation Details"
                            />
                          </SuiBox>

                          <SuiBox mb={2}>
                            <SuiInput
                              onChange={userInputEvent}
                              type="text"
                              name="registrationCouncil"
                              placeholder="Registration Council"
                            />
                          </SuiBox>

                          <SuiBox mb={2}>
                            <SuiInput
                              onChange={userInputEvent}
                              type="text"
                              placeholder="Registration Number"
                              name="registrationNumber"
                            />
                          </SuiBox>

                          <SuiBox fullWidth mb={2}>
                            <FormControl
                              variant="standard"
                              style={{ width: "100%" }}
                            >
                              <NativeSelect
                                id="demo-customized-select-native"
                                value={user.registrationYear}
                                name="registrationYear"
                                onChange={userInputEvent}
                                input={<BootstrapInput />}
                              >
                                <option selected value="registrationYear">
                                  Registration Year
                                </option>
                                {year()}
                              </NativeSelect>
                            </FormControl>
                          </SuiBox>
                        </SuiBox>
                      </SuiBox>
                      <SuiBox mt={2} mb={2} textAlign="center">
                        <h4
                          style={{
                            fontSize: ".6em",
                            color: "black",
                            textAlign: "center",
                            fontWeight: 400,
                            transition: ".2s all",
                          }}
                        >
                          *This Section is optional for Chemist only.*
                        </h4>
                      </SuiBox>
                    </Grid>

                    <Grid
                      item
                      md={6}
                      lg={4}
                      ml={11}
                      mr={9}
                      style={{
                        display: activeStep == 2 ? "block" : "none",
                        minWidth: "400px",
                      }}
                    >
                      <SuiBox
                        px={3}
                        mt={3}
                        style={{
                          backgroundColor: "white",
                          borderRadius: "0.7rem",
                        }}
                      >
                        <SuiBox component="form" role="form">
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
                            container
                            justifyContent="space-between"
                          >
                            <Grid xs={12} lg={5.8} mb={2}>
                              <FormControl
                                variant="standard"
                                style={{ width: "100%" }}
                              >
                                <NativeSelect
                                  id="demo-customized-select-native"
                                  value={workplace.city}
                                  name="city"
                                  onChange={workplaceInputEvent}
                                  input={<BootstrapInput />}
                                >
                                  <option value="none">City</option>
                                  {city.map((e) => (
                                    <option value={e}>{e}</option>
                                  ))}
                                </NativeSelect>
                              </FormControl>
                            </Grid>
                            <Grid xs={12} lg={5.8} mb={2}>
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
                                <option selected value="holiday">
                                  Holiday
                                </option>
                                <option value="SATURDAY">Saturday</option>
                                <option value="SUNDAY">Sunday</option>
                                <option value="SATANDSUN">
                                  Saturday and Sunday
                                </option>
                              </NativeSelect>
                            </FormControl>
                          </SuiBox>
                          {/* <SuiBox
                            mx={0}
                            mt={4}
                            style={{
                              backgroundColor: "white",
                              borderRadius: "0.7rem",
                            }}
                            fullWidth
                          > */}
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
                          <Grid item xs={10} md={6} ml={22} mr={0}>
                            <SuiBox mb={2} mr={3}>
                              <SuiButton
                                variant="gradient"
                                buttonColor="dark"
                                onClick={generate}
                              >
                                Generate Slots
                              </SuiButton>
                            </SuiBox>
                          </Grid>

                          {show ? (
                            <SuiBox mb={2} mt={2}>
                              <SuiInput
                                md={6}
                                lg={4}
                                ml={18}
                                onChange={userInputEvent}
                                type="text"
                                placeholder="OTP"
                                name="otp"
                              />
                            </SuiBox>
                          ) : (
                            <></>
                          )}

                          <SuiBox id="recaptcha-container"></SuiBox>
                          {show ? (
                            <Grid item xs={10} md={6} ml={22} mr={0}>
                              <SuiBox mb={2} mr={3}>
                                <SuiButton
                                  md={6}
                                  lg={4}
                                  ml={18}
                                  onClick={register}
                                  variant="gradient"
                                  buttonColor="dark"
                                  fullWidth
                                >
                                  {buttonText}
                                </SuiButton>
                              </SuiBox>
                            </Grid>
                          ) : (
                            <></>
                          )}

                          <SuiBox mt={2} mb={2} textAlign="center">
                            <h6
                              style={{
                                fontSize: ".6em",
                                color: "green",
                                textAlign: "center",
                                fontWeight: 400,
                                transition: ".2s all",
                              }}
                            >
                              {success}
                            </h6>
                          </SuiBox>

                          <SuiBox mt={2} textAlign="center">
                            <h6
                              style={{
                                fontSize: ".6em",
                                color: "red",
                                textAlign: "center",
                                fontWeight: 400,
                                transition: ".2s all",
                              }}
                            >
                              {error}
                            </h6>
                          </SuiBox>
                        </SuiBox>
                      </SuiBox>
                      <Grid
                        container
                        md={12}
                        lg={12}
                        alignItems="center"
                        justifyContent="space-around"
                      ></Grid>
                    </Grid>
                  </Typography>
                </Grid>

                <Grid item>
                  <SuiBox sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                    <Grid item xs={3} md={2}>
                      <SuiBox mb={4} ml={3}>
                        <SuiButton
                          variant="outlined"
                          buttonColor="dark"
                          fullWidth
                          disabled={activeStep === 0}
                          onClick={handleBack}
                          sx={{ ml: 1 }}
                        >
                          Back
                        </SuiButton>
                      </SuiBox>
                    </Grid>

                    <SuiBox sx={{ flex: "1 1 auto" }} />
                    <Grid
                      item
                      xs={3}
                      md={2}
                      style={{
                        display:
                          activeStep == 0 || activeStep == 1 ? "block" : "none",
                      }}
                    >
                      <SuiBox mb={4} mr={3}>
                        <SuiButton
                          variant="gradient"
                          buttonColor="dark"
                          fullWidth
                          onClick={handleNext}
                          sx={{ mr: 1 }}
                        >
                          Next
                        </SuiButton>
                      </SuiBox>
                    </Grid>

                    <Grid
                      item
                      xs={3}
                      xl={2}
                      md={3}
                      lg={2}
                      style={{
                        display: activeStep == 2 ? "block" : "none",
                      }}
                    >
                      <SuiBox mb={4} mr={3}>
                        <SuiButton
                          onClick={sendOtp}
                          variant="gradient"
                          buttonColor="dark"
                          fullWidth
                        >
                          {otpButtonText}
                        </SuiButton>
                      </SuiBox>
                    </Grid>
                  </SuiBox>
                </Grid>
              </SuiBox>
            </Grid>
          </Card>
          <SuiBox mt={3} textAlign="center">
            <SuiTypography
              variant="button"
              textColor="text"
              fontWeight="regular"
            >
              Already have an account?&nbsp;
              <SuiTypography
                component={Link}
                to="/authentication/sign-in"
                variant="button"
                textColor="dark"
                fontWeight="bold"
                textGradient
              >
                Sign in
              </SuiTypography>
            </SuiTypography>
          </SuiBox>
          <SuiBox mt={1} textAlign="center">
            <SuiTypography
              variant="button"
              textColor="text"
              fontWeight="regular"
            >
              Want to Sign up as User?&nbsp;
              <SuiTypography
                component={Link}
                to="/authentication/sign-up"
                variant="button"
                textColor="dark"
                fontWeight="bold"
                textGradient
              >
                Sign up
              </SuiTypography>
            </SuiTypography>
          </SuiBox>
        </>
      )}
      <Grid container xs={11} lg={6}>
        <Modal
          open={showw}
          onClose={toggleModalw}
          sx={{ display: "grid", placeItems: "center" }}
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
                                  ></h4>
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
                                    toggleModalw();
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
    </BasicLayout>
  );
}

export default SignUpsp;
