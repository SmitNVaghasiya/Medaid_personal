import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import React from "react";
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiInput from "components/SuiInput";
import SuiButton from "components/SuiButton";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import curved9 from "assets/images/curved-images/curved-6.jpg";
import AuthApi from "../../../api/auth";
import { auth } from "api/firebase";
import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import { useHistory } from "react-router-dom";
import Cookies from "universal-cookie";

function SignIn() {
  const history = useHistory();
  const cookies = new Cookies();

  const [rememberMe, setRememberMe] = useState(true);
  const [mobileNo, setmobileNo] = useState("");
  const [otp, setOtp] = useState("");

  const [error, setError] = useState(undefined);
  const [success, setSuccess] = useState(undefined);
  const [buttonText, setButtonText] = useState("Sign In");
  const [otpButtonText, setOtpButtonText] = useState("Send OTP");
  const [show, setShow] = useState(true);
  const [final, setfinal] = useState("");
  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const login = async (event) => {
    if (event) {
      event.preventDefault();
    }
    validateOtp();
  };

  function validateOtp() {
    if (otp === null || final === null) return;
    final
      .confirm(otp)
      .then(async (result) => {
        setProfile();
      })
      .catch((err) => {
        setSuccess(null);
        setError("Wrong OTP");
      });
  }

  const sendOtp = async () => {
    var response = await AuthApi.isUserAvailable(mobileNo);
    console.log("response", response);
    if (response.data.statusCode != 401) {
      return setError("Please Sign Up First.");
    }

    let verify = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          console.log("capcha verify");
        },
        defaultCountry: "IN",
      },
      auth
    );
    signInWithPhoneNumber(auth, mobileNo, verify)
      .then((result) => {
        setError(null);
        setSuccess("OTP sent successfully.");
        setShow(false);
        setfinal(result);
        setOtpButtonText("Resend OTP");
      })
      .catch((err) => {
        setSuccess(null);
        // setError("Something went wrong!Please try again.");
      });
    // }
  };

  var signIn = async () => {
    var token = await auth.currentUser.getIdToken();
    if (token) {
      setProfile(token);
    }
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
    return history.push(`/dashboard/${user.type.toLowerCase()}`);
  };

  return (
    <CoverLayout title="WELCOME" description="" image={curved9}>
      {cookies.get("user") ? (
        cookies.get("user").type == "PATIENT" ? (
          history.push("/")
        ) : (
          history.push("/dashboard/" + cookies.get("user").type.toLowerCase())
        )
      ) : (
        <SuiBox component="form" role="form">
          <SuiBox mb={2}>
            <SuiBox mb={1} ml={0.5}>
              <SuiTypography
                component="label"
                variant="caption"
                fontWeight="bold"
              >
                Mobile No.
              </SuiTypography>
            </SuiBox>
            <SuiInput
              defaultValue={mobileNo}
              onChange={(event) => {
                setmobileNo("+91" + event.target.value);
                console.log(mobileNo);
                setError(undefined);
              }}
              type="tel"
              placeholder="__ __"
            />
          </SuiBox>
          <SuiBox mb={2}>
            <SuiBox mb={1} ml={0.5}>
              <SuiTypography
                component="label"
                variant="caption"
                fontWeight="bold"
              >
                OTP
              </SuiTypography>
            </SuiBox>
            <SuiInput
              defaultValue={otp}
              onChange={(event) => {
                setOtp(event.target.value);
                setError(undefined);
              }}
              type="text"
              placeholder="otp"
            />
          </SuiBox>
          <SuiBox mt={2} mb={2} textAlign="center">
            <h6
              style={{
                fontSize: ".8em",
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
          <SuiBox mt={2} mb={1}>
            {!show ? (
              <SuiButton
                onClick={login}
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
              Don&apos;t have an account?
              <SuiTypography
                component={Link}
                to="/authentication/sign-up"
                variant="button"
                textColor="info"
                fontWeight="medium"
                textGradient
              >
                Sign up
              </SuiTypography>
            </SuiTypography>
          </SuiBox>
        </SuiBox>
      )}
    </CoverLayout>
  );
}

export default SignIn;
