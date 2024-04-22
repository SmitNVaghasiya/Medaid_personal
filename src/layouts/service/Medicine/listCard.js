import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import React from "react";
import Card from "@mui/material/Card";
import { FormControl, Grid, NativeSelect } from "@mui/material";
import Image from "assets/homepage3.jpg";
import SuiBox from "components/SuiBox";
import SuiButton from "components/SuiButton";
import { useState } from "react";
import Modal from "@mui/material/Modal";
import SuiTypography from "components/SuiTypography";
import Slide from "@mui/material/Slide";
import CloseIcon from "@mui/icons-material/Close";
import Divider from "@mui/material/Divider";
import Container from "@mui/material/Container";
import SuiInput from "components/SuiInput";
import { InputBase } from "@mui/material";
import Cookies from "universal-cookie";
import { StreamChat } from "stream-chat";
import styled from "@emotion/styled";
import AuthApi from "api/auth";
import axios from "api";
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
    color: "rgba(0, 0, 0, 0.38)", // (default alpha is 0.38)
  },
}));

function CenteredBlogCard({ workplace, color }) {
  const cookies = new Cookies();
  const [user, setUser] = useState(cookies.get("user"));
  const [show, setShow] = useState(false);
  const [btntitle, setBtntitle] = useState("Upload Document");
  const [showconfirm, setShowconfirm] = useState(false);
  const [error, setError] = useState(undefined);
  const toggleModal = () => setShow(!show);
  const toggleModal2 = () => setShowconfirm(!showconfirm);
  const [attach, setAttach] = useState();
  const history = useHistory();
  const apiKey = "48tbwy33e2sz";
  const authToken = cookies.get("user").token;
  const client = StreamChat.getInstance(apiKey);

  const hiddenFileInput = React.useRef(null);
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  console.log("auth token", authToken);
  if (authToken) {
    console.log("connected user");

    client.connectUser(
      {
        id: cookies.get("user").userId,
        name: cookies.get("user").name,
      },
      authToken
    );
  }

  const [service, setService] = useState({
    name: "",
    age: "",
    address: "",
    delivery: "",
    spId: workplace.spId._id,
  });

  const serviceInputEvent = (e) => {
    const { name, value } = e.target;
    setService((preValue) => {
      console.log(preValue);
      return {
        ...preValue,
        [name]: value,
      };
    });
  };

  const submit = async () => {
    var attachments = "";

    if (
      !(!!service.name && !!service.address && !!attach && service.delivery)
    ) {
      return setError("Please fill every field.");
    } else setError(null);

    if (!/^([^0-9,]*)$/.test(service.name)) {
      return setError("Name can't contain numbers or symbols.");
    } else setError(null);

    if (!/^[.0-9a-zA-Z\s,-/]+$/.test(service.address)) {
      return setError("Enter valid Address.");
    } else setError(null);

    if (attach) {
      const formData = new FormData();

      formData.append("attachment", attach, attach.name);
      var response = await AuthApi.upload(formData);
      console.log("update status response", response.data.data.path);
      console.log(response.data.data.path);
      if (response.data.statusCode == 200) {
        attachments = response.data.data.path;
      } else {
        console.log("showError");
      }
    }

    console.log(attachments);
    // displayRazorpay();

    if (service.delivery == "homedelivery") {
      const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );

      if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
      }

      // creating a new order
      const result = await axios.post(
        "https://medaidserver.herokuapp.com/api/orders"
      );

      if (!result) {
        alert("Server error. Are you online?");
        return;
      }

      // Getting the order details back
      console.log(result.data);
      const { amount, id: order_id, currency } = result.data;

      const options = {
        key: "rzp_test_a7dmLDnxSNZiPJ", // Enter the Key ID generated from the Dashboard
        amount: amount.toString(),
        currency: currency,
        name: "MedAid",
        description: "Test Transaction",
        order_id: order_id,
        handler: async function (response) {
          const data = {
            orderCreationId: order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          };

          const result = await axios.post(
            "https://medaidserver.herokuapp.com/api/success",
            data
          );

          if (result.data.msg == "success") {
            AuthApi.requestAppointment({
              ...service,
              attachments: attachments,
            }).then(async (data) => {
              if (data.data.statusCode == 200) {
                console.log("200", data.data);
                if (data.data.data.createChannel) {
                  console.log("create channel");
                  if (authToken) {
                    const channel = client.channel("messaging", {
                      members: data.data.data.members,
                    });
                    await channel.create();
                    await channel.watch();

                    var initialMessage = {
                      text: `${service.name}\n${service.age}\n${service.address}\n${service.description}\n${service.delivery}`,
                    };
                    console.log("service", service);
                    console.log(
                      "http://localhost+attachments,",
                      "http://localhost" + attachments
                    );

                    await channel.sendMessage(initialMessage, {
                      skip_push: true,
                    });

                    if (attachments != null && attachments != undefined) {
                      await channel.sendMessage(
                        {
                          attachments: [
                            {
                              type: "image",
                              asset_url: "http://localhost" + attachments,
                              thumb_url: "http://localhost" + attachments,
                            },
                          ],
                        },
                        { skip_push: true }
                      );
                    }

                    console.log("channel", channel);
                  }
                }
                return history.push("/dashboard/chat");
              } else {
                console.log("response data ", data);
              }
            });
          } else {
            setError(result.data.msg);
          }
        },
        prefill: {
          name: "Soumya Dey",
          email: "SoumyaDey@example.com",
          contact: "9999999999",
        },
        notes: {
          address: "Soumya Dey Corporate Office",
        },
        theme: {
          color: "#61dafb",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } else if (service.delivery == "takeaway") {
      AuthApi.requestAppointment({ ...service, attachments: attachments }).then(
        async (data) => {
          if (data.data.statusCode == 200) {
            console.log("200", data.data);
            if (data.data.data.createChannel) {
              console.log("create channel");
              if (authToken) {
                const channel = client.channel("messaging", {
                  members: data.data.data.members,
                });
                await channel.create();
                await channel.watch();

                var initialMessage = {
                  text: `${service.name}\n${service.age}\n${service.address}\n${service.description}\n${service.delivery}`,
                };
                console.log("service", service);
                console.log(
                  "http://localhost+attachments,",
                  "http://localhost" + attachments
                );

                await channel.sendMessage(initialMessage, { skip_push: true });

                if (attachments != null && attachments != undefined) {
                  await channel.sendMessage(
                    {
                      attachments: [
                        {
                          type: "image",
                          asset_url: "http://localhost" + attachments,
                          thumb_url: "http://localhost" + attachments,
                        },
                      ],
                    },
                    { skip_push: true }
                  );
                }

                console.log("channel", channel);
              }
            }
            return history.push("/dashboard/chat");
          } else {
            console.log("response data ", data);
          }
        }
      );
    }
  };

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  const uploadschange = (e) => {
    console.log("type", typeof e, e);
    setAttach(e.target.files[0]);
    setBtntitle(e.target.files[0].name);
  };

  return (
    <Card style={{ margin: "10px", padding: "1rem" }}>
      <Grid
        container
        xs={12}
        justifyContent="space-between"
        alignItems="flex-end"
      >
        <Grid item xs={8}>
          <SuiBox px={2} mt={-1} textAlign="left">
            <SuiTypography
              display="inline"
              varient="button"
              style={{ fontSize: "1rem" }}
              fontWeight="medium"
            >
              {workplace.name}
            </SuiTypography>
            {/* <Divider /> */}
            <SuiTypography
              display="block"
              variant="body2"
              fontWeight="regular"
              style={{ fontSize: "0.8rem" }}
            >
              {workplace.spId.name}
            </SuiTypography>
            <SuiTypography
              variant="body2"
              component="p"
              color="text"
              style={{ fontSize: "0.8rem" }}
            >
              {workplace.spId.specialization}
            </SuiTypography>
            <SuiTypography
              variant="body2"
              component="p"
              color="text"
              style={{ fontSize: "0.8rem" }}
            >
              {workplace.address}&nbsp;,{workplace.city}
            </SuiTypography>
          </SuiBox>
        </Grid>

        <Grid xs={3} item container justifyContent="flex-end" pr={1}>
          <SuiBox mt={1} mb={1} textAlign="center" style={{ width: "10vw" }}>
            <SuiButton
              variant="gradient"
              buttonColor={color ? color : "dark"}
              fullWidth
              onClick={toggleModal}
            >
              Order Now
            </SuiButton>
          </SuiBox>
        </Grid>
      </Grid>
      <Modal
        open={show}
        onClose={toggleModal}
        sx={{ display: "grid", placeItems: "center" }}
        style={{ overflow: "scroll" }}
      >
        <Slide direction="down" in={show} timeout={500}>
          <SuiBox
            position="relative"
            width="80vw"
            display="flex"
            flexDirection="column"
            borderRadius="xl"
            style={{ backgroundColor: "white" }}
            shadow="xl"
          >
            <SuiBox
              display="flex"
              alginItems="center"
              justifyContent="space-between"
              p={2}
            >
              <SuiTypography variant="h5">Order Medicine</SuiTypography>
              <CloseIcon
                fontSize="medium"
                sx={{ cursor: "pointer" }}
                onClick={toggleModal}
              />
            </SuiBox>
            <Divider sx={{ my: 0 }} />
            <SuiBox component="section" py={{ xs: 0, lg: 3 }}>
              <Container>
                <Grid container item>
                  <SuiBox
                    width="100%"
                    bgColor="white"
                    borderRadius="xl"
                    shadow="xl"
                    mb={6}
                    sx={{ overflow: "hidden" }}
                  >
                    <Grid container spacing={2}>
                      <Grid
                        item
                        xs={12}
                        lg={5}
                        position="relative"
                        px={0}
                        sx={{
                          backgroundImage: ({
                            palette: { gradients },
                            functions: { rgba, linearGradient },
                          }) =>
                            `${linearGradient(
                              rgba(gradients.dark.main, 0.5),
                              rgba(gradients.dark.state, 0.5)
                            )}, url(${Image})`,
                          backgroundSize: "cover",
                        }}
                      >
                        <SuiBox
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          width="100%"
                          height="100%"
                        >
                          <SuiBox
                            py={6}
                            pr={6}
                            pl={{ xs: 6, sm: 12 }}
                            my="auto"
                          >
                            <SuiTypography
                              variant="h3"
                              textColor="white"
                              mb={1}
                            >
                              {workplace.spId.name}
                            </SuiTypography>
                            <SuiTypography
                              variant="body2"
                              textColor="white"
                              opacity={0.8}
                              mb={1}
                            >
                              {workplace.spId.specialization}
                            </SuiTypography>
                            <SuiBox display="flex" textColor="white" mb={1}>
                              <SuiTypography variant="button" textColor="white">
                                <i className="fas fa-phone" />
                              </SuiTypography>
                              <SuiTypography
                                component="span"
                                variant="button"
                                textColor="white"
                                opacity={0.8}
                                ml={2}
                                fontWeight="regular"
                              >
                                +{workplace.mobileNo}
                              </SuiTypography>
                            </SuiBox>
                            <SuiBox display="flex" color="white">
                              <SuiTypography variant="button" textColor="white">
                                <i className="fas fa-map-marker-alt" />
                              </SuiTypography>
                              <SuiTypography
                                component="span"
                                variant="button"
                                textColor="white"
                                opacity={0.8}
                                ml={2}
                                fontWeight="regular"
                              >
                                {workplace.address}&nbsp;,{workplace.city}
                              </SuiTypography>
                            </SuiBox>
                          </SuiBox>
                        </SuiBox>
                      </Grid>
                      <Grid item xs={12} lg={7} alignItems="center">
                        <SuiBox component="form" p={2} method="post">
                          <SuiBox px={3} py={{ xs: 2, sm: 6 }}>
                            <SuiTypography variant="h3" mb={2}>
                              Buyer Details
                            </SuiTypography>
                            <Grid container>
                              <Grid item xs={12} pr={1} mb={2}>
                                <SuiInput
                                  type="text"
                                  name="name"
                                  placeholder="Buyer Name"
                                  onChange={serviceInputEvent}
                                  fullWidth
                                />
                              </Grid>
                              <Grid item xs={12} pr={1} mb={2}>
                                <SuiInput
                                  type="text"
                                  name="address"
                                  placeholder="Address"
                                  onChange={serviceInputEvent}
                                  fullWidth
                                />
                              </Grid>
                              <Grid item xs={12} pr={1} mb={2}>
                                <SuiInput
                                  type="text"
                                  name="description"
                                  placeholder="Description"
                                  onChange={serviceInputEvent}
                                  fullWidth
                                />
                              </Grid>
                              <Grid item xs={12} pr={1} mb={2}>
                                <SuiBox fullWidth mb={2}>
                                  <FormControl
                                    variant="standard"
                                    style={{ width: "100%" }}
                                  >
                                    <NativeSelect
                                      id="demo-customized-select-native"
                                      value={service.delivery}
                                      name="delivery"
                                      onChange={serviceInputEvent}
                                      input={<BootstrapInput />}
                                    >
                                      <option selected value="delivery">
                                        Delivery
                                      </option>
                                      <option value="takeaway">
                                        Take away
                                      </option>
                                      <option value="homedelivery">
                                        Home delivery
                                      </option>
                                    </NativeSelect>
                                  </FormControl>
                                </SuiBox>
                              </Grid>

                              <Grid
                                item
                                container
                                xs={12}
                                pr={1}
                                mb={2}
                                justifyContent="flex-end"
                              >
                                <input
                                  type="file"
                                  name="address"
                                  ref={hiddenFileInput}
                                  // style={{visibility: 'hidden', display: 'none' }}
                                  hidden
                                  onChange={uploadschange}
                                />

                                <SuiButton
                                  variant="gradient"
                                  buttonColor="dark"
                                  onClick={handleClick}
                                >
                                  {btntitle}
                                </SuiButton>
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
                            </Grid>
                          </SuiBox>
                        </SuiBox>
                      </Grid>
                    </Grid>
                  </SuiBox>
                </Grid>
              </Container>
            </SuiBox>

            <Divider sx={{ my: 0 }} />
            <SuiBox display="flex" justifyContent="flex-end" p={1.5}>
              <SuiButton variant="gradient" buttonColor="dark" onClick={submit}>
                Order Now
              </SuiButton>
            </SuiBox>
          </SuiBox>
        </Slide>
      </Modal>
    </Card>
  );
}

// Typechecking props for the CenteredBlogCard
CenteredBlogCard.propTypes = {
  image: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
    "light",
  ]).isRequired,
  label: PropTypes.string.isRequired,
};

export default CenteredBlogCard;
