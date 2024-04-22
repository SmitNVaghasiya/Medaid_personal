import { useState } from "react";
import { Link } from "react-router-dom";
import React from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import { InputBase } from "@mui/material";
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

function SignUp() {
  const history = useHistory();

  const [value, setValue] = useState(null);
  var [user, setuserinfo] = useState({
    name: "",
    gender: "",
    dob: "",
    city: "",
    mobileNo: "",
    type: "PATIENT",
    otp: "",
  });

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

  const cookies = new Cookies();

  const register = async (event) => {
    console.log("called");
    if (event) {
      event.preventDefault();
    }

    if (user.type == "PATIENT") {
      if (
        !(
          !!user.name &&
          !!user.dob &&
          !!user.gender &&
          !!user.mobileNo &&
          !!user.type &&
          !!user.city
        )
      ) {
        return setError("Please fill every field.");
      } else setError(null);
      if (!/^([^0-9,]*)$/.test(user.name)) {
        return setError("Name can't contain numbers or symbols.");
      } else setError(null);

      if (
        !/^(((\+?\(91\))|0|((00|\+)?91))-?)?[0-9]\d{9}$/.test(user.mobileNo)
      ) {
        return setError("Enter valid mobile number.");
      } else setError(null);
    }

    if (user.mobileNo == finalNumber) {
      validateOtp();
    } else {
      setSuccess(null);
      setError("Invalid OTP.");
    }
  };

  function validateOtp() {
    console.log("press");
    if (user.otp === null || final === null) return;
    console.log("ghochu");
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
      return {
        ...preValue,
        [name]: value.toUpperCase(),
      };
    });
  };

  const sendOtp = async () => {
    if (user.type == "PATIENT") {
      if (
        !(
          !!user.name &&
          !!user.dob &&
          !!user.gender &&
          !!user.mobileNo &&
          !!user.type &&
          !!user.city
        )
      ) {
        return setError("Please fill every field.");
      } else setError(null);

      if (!/^([^0-9,]*)$/.test(user.name)) {
        return setError("Name can't contain numbers or symbols.");
      } else setError(null);

      if (
        !/^(((\+?\(91\))|0|((00|\+)?91))-?)?[0-9]\d{9}$/.test(user.mobileNo)
      ) {
        return setError("Invalid Mobile Number");
      } else setError(null);
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

  return (
    <BasicLayout
      widthxs={visible ? 12 : 11}
      widthsm={visible ? 12 : 7.5}
      widthmd={visible ? 12 : 5.5}
      widthlg={visible ? 12 : 3.5}
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
            style={{ backgroundColor: visible ? "white" : "rgba(0,0,0,0.0)" }}
          >
            <Grid
              xs={12}
              container
              item
              direction={visible ? "row" : "column"}
              alignContent="center"
              justifyContent="space-around"
            >
              <Grid item md={6} lg={4}>
                <SuiBox
                  pt={3}
                  pb={3}
                  px={3}
                  style={{
                    backgroundColor: "white",
                    borderRadius: "0.7rem",
                    minWidth: "470px",
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
                      <FormControl variant="standard" style={{ width: "100%" }}>
                        <NativeSelect
                          id="demo-customized-select-native"
                          value={user.city}
                          name="city"
                          onChange={userInputEvent}
                          input={<BootstrapInput />}
                        >
                          <option value="City">City</option>
                          {city.map((e) => (
                            <option value={e}>{e}</option>
                          ))}
                        </NativeSelect>
                      </FormControl>
                    </SuiBox>
                    {show ? (
                      <SuiBox mb={2} mt={2} fullWidth>
                        <SuiInput
                          onChange={userInputEvent}
                          type="text"
                          placeholder="OTP"
                          name="otp"
                        />
                      </SuiBox>
                    ) : (
                      <></>
                    )}
                  </SuiBox>
                </SuiBox>
              </Grid>
            </Grid>
          </Card>
          <Grid
            container
            item
            md={12}
            lg={12}
            alignItems="center"
            justifyContent="space-around"
          >
            <Grid
              item
              xs={visible ? 11 : 12}
              sm={visible ? 7.5 : 12}
              md={visible ? 5.5 : 12}
              lg={visible ? 3.5 : 12}
            >
              <SuiBox>
                <SuiBox mt={2} mb={2} textAlign="center">
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
                <SuiBox id="recaptcha-container"></SuiBox>
                <SuiBox mt={2}>
                  <SuiButton
                    onClick={sendOtp}
                    variant="gradient"
                    buttonColor="dark"
                    fullWidth
                  >
                    {otpButtonText}
                  </SuiButton>
                </SuiBox>
                <SuiBox mt={2}>
                  {show ? (
                    <SuiButton
                      onClick={register}
                      variant="gradient"
                      buttonColor="dark"
                      fullWidth
                    >
                      {buttonText}
                    </SuiButton>
                  ) : (
                    <></>
                  )}
                </SuiBox>
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
                    Want to Sign up as Service Provider?&nbsp;
                    <SuiTypography
                      component={Link}
                      to="/authentication/sign-up-sp"
                      variant="button"
                      textColor="dark"
                      fontWeight="bold"
                      textGradient
                    >
                      Sign up
                    </SuiTypography>
                  </SuiTypography>
                </SuiBox>
              </SuiBox>
            </Grid>
          </Grid>
        </>
      )}
    </BasicLayout>
  );
}

export default SignUp;
