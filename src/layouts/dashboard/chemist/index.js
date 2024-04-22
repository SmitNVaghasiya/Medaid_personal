// import React from "react";
// import Grid from "@mui/material/Grid";
// import SuiBox from "components/SuiBox";
// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import { useState, useEffect } from "react";
// import AuthApi from "api/auth";
// import { Card } from "@mui/material";
// import { GridToolbar, DataGrid } from "@mui/x-data-grid";
// import SuiButton from "components/SuiButton";
// import Cookies from "universal-cookie";
// import { useHistory } from "react-router-dom";
// import { saveAs } from "file-saver";

// import { city } from "helper/constant/array";
// import {
//   Container,
//   Divider,
//   FormControl,
//   InputBase,
//   Modal,
//   NativeSelect,
//   Slide,
// } from "@mui/material";
// import SuiTypography from "components/SuiTypography";
// import SuiInput from "components/SuiInput";
// import Slider from "@mui/material/Slider";
// import CloseIcon from "@mui/icons-material/Close";
// import userEvent from "@testing-library/user-event";
// import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
// import { auth } from "api/firebase";

// var columns = [
//   {
//     field: "patientName",
//     headerName: "Buyer Name",
//     width: "200",
//   },
//   {
//     field: "description",
//     headerName: "Description",
//     width: "200",
//   },
//   {
//     field: "address",
//     headerName: "Address",
//     width: "190",
//   },
//   {
//     field: "status",
//     headerName: "Status",
//     width: "200",
//   },
//   {
//     field: "attachment",
//     headerName: "Attachement",
//     width: "200",
//     renderCell: (params) => (
//       <>
//         {params.row.attachment ? (
//           <strong>
//             <SuiButton
//               variant="gradient"
//               buttonColor="dark"
//               size="small"
//               style={{ marginLeft: 16 }}
//               onClick={() => {
//                 console.log(params.row.attachments);
//                 saveAs(
//                   "https://medaidserver.herokuapp.com" + params.row.attachment,
//                   params.row.id
//                 );
//               }}
//             >
//               Download
//             </SuiButton>
//           </strong>
//         ) : (
//           <></>
//         )}
//       </>
//     ),
//   },
// ];

// function Dashboard() {
//   const cookies = new Cookies();
//   const [user, setUser] = useState(cookies.get("user"));
//   const [tableRows, setTableRows] = useState(null);
//   const [reject, setReject] = useState(false);
//   const [confirm, setConfirm] = useState(false);
//   const [complete, setComplete] = useState(false);
//   const [tableColumn, setTableColumn] = useState(columns);
//   const [select, setSelection] = React.useState([]);
//   const history = useHistory();
//   const [selectionModel, setSelectionModel] = React.useState([]);
//   const [show, setShow] = useState(false);
//   const toggleModal = () => setShow(!show);
//   const [error, setError] = useState(false);
//   const [otp, setOtp] = useState("");
//   const [final, setfinal] = useState("");
//   const [success, setSuccess] = useState(undefined);

//   useEffect(() => {
//     getAppointmentList();
//     return () => {
//       verifyer.clear();
//     };
//   }, []);

//   const verify = async (event) => {
//     if (event) {
//       event.preventDefault();
//     }
//     validateOtp();
//   };

//   function validateOtp() {
//     if (otp === null || final === null) return;
//     final
//       .confirm(otp)
//       .then(async (result) => {
//         setProfile();
//       })
//       .catch((err) => {
//         setSuccess(null);
//         setError("Wrong OTP");
//       });
//   }

//   const getAppointmentList = () => {
//     AuthApi.getServicesList("APPOINTMENT").then((data) => {
//       if (data.data.statusCode == 200) {
//         console.log(data.data.data);
//         setTableRows(
//           data.data.data.map((e) => {
//             var dt = {
//               id: e._id,
//               patientName: e.name,
//               description: e.description,
//               address: e.address.toUpperCase(),
//               status: e.status,
//               attachment: e.attachments,
//             };
//             return dt;
//           })
//         );
//       } else {
//         console.log("response data ", data);
//       }
//     });
//   };

//   const sendOtp = async (mobileNo) => {
//     console.log(mobileNo);
//     console.log("hi");
//     var response = await AuthApi.isUserAvailable(mobileNo);
//     console.log("response", response);

//     let verifyer = new RecaptchaVerifier(
//       "recaptcha-container",
//       {
//         size: "invisible",
//         callback: (response) => {
//           console.log("capcha verify");
//         },
//       },
//       auth
//     );

//     signInWithPhoneNumber(auth, mobileNo, verify)
//       .then((result) => {
//         setError(null);
//         setSuccess("OTP sent successfully.");
//         setShow(false);
//         setfinal(result);
//       })
//       .catch((err) => {
//         setSuccess(null);
//         console.log(err);
//         // setError("Something went wrong!Please try again.");
//       });
//   };

//   const updateAppointmentList = async (stauts) => {
//     var response = await AuthApi.appointmentStatusUpdate({
//       appointmentIds: selectionModel,
//       status: stauts,
//     });
//     console.log("update status response", response.data.statusCode);
//     if (response.data.statusCode == 200) {
//       setReject(false);
//       setConfirm(false);
//       setComplete(false);
//       getAppointmentList();
//     } else {
//       console.log("showError");
//     }
//   };

//   const rowSelect = (newSelectionModel) => {
//     setSelectionModel(newSelectionModel);
//     if (newSelectionModel.length == 0) {
//       setReject(false);
//       setConfirm(false);
//       setComplete(false);
//     } else {
//       var selected = {};
//       tableRows.map((e) => {
//         if (newSelectionModel.includes(e.id)) {
//           console.log(e.status);
//           if (e.status == "PENDING") {
//             selected.PENDING = true;
//           }
//           if (e.status == "CONFIRMED" && newSelectionModel.length == 1) {
//             selected.CONFIRMED = true;
//           }
//         }
//       });

//       if (selected.PENDING) {
//         setReject(true);
//         setConfirm(true);
//       }
//       if (selected.CONFIRMED && newSelectionModel.length == 1) {
//         setReject(true);
//         setComplete(true);
//       } else {
//         setComplete(false);
//       }
//     }
//   };
//   return (
//     <DashboardLayout>
//       <DashboardNavbar />
//       <SuiBox>
//         <div style={{ height: 450, width: "100%" }}>
//           <Grid xs={12} item container justifyContent="flex-end">
//             {confirm ? (
//               <>
//                 <SuiButton
//                   variant="gradient"
//                   buttonColor="dark"
//                   style={{ width: "150px", marginLeft: "1rem" }}
//                   onClick={() => {
//                     updateAppointmentList("CONFIRMED");
//                   }}
//                 >
//                   Accept
//                 </SuiButton>
//               </>
//             ) : (
//               <></>
//             )}
//             {reject ? (
//               <SuiButton
//                 variant="gradient"
//                 buttonColor="light"
//                 style={{ width: "150px", marginLeft: "1rem" }}
//                 onClick={() => {
//                   updateAppointmentList("REJECTED");
//                 }}
//               >
//                 Reject
//               </SuiButton>
//             ) : (
//               <></>
//             )}
//             {complete ? (
//               <SuiButton
//                 variant="gradient"
//                 buttonColor="dark"
//                 style={{ width: "150px", marginLeft: "1rem" }}
//                 onClick={() => {
//                   toggleModal();
//                   for (let i = 0; i < tableRows.length; i++) {
//                     if (tableRows[i].id == selectionModel[0]) {
//                       console.log(tableRows[i].mobileNo);
//                     }
//                     sendOtp(tableRows[i].mobileNo);
//                   }
//                 }}
//               >
//                 COMPLETED
//               </SuiButton>
//             ) : (
//               <></>
//             )}
//             {/* <SuiInput
//               placeholder="Name"
//               name="name"
//               type="file"
//               onChange={uploadschange}
//             /> */}
//           </Grid>

//           <Card style={{ height: 800, width: "98%", marginTop: "1.5rem" }}>
//             <h6>{select.map((val) => val.Start)}</h6>
//             <DataGrid
//               rows={tableRows}
//               columns={tableColumn}
//               disableColumnSelector="true"
//               components={{
//                 Toolbar: GridToolbar,
//                 // NoRowsOverlay: CustomNoRowsOverlay,
//               }}
//               rowsPerPageOptions={[25]}
//               checkboxSelection
//               isRowSelectable={(params) =>
//                 params.row.status != "COMPLETED" &&
//                 params.row.status != "CANCELLED" &&
//                 params.row.status != "REJECTED"
//               }
//               disableSelectionOnClick
//               onSelectionModelChange={(newSelectionModel) => {
//                 rowSelect(newSelectionModel);
//               }}
//             />
//           </Card>
//         </div>
//       </SuiBox>
//       <Grid container xs={12} lg={11}>
//         <Modal
//           open={show}
//           onClose={toggleModal}
//           sx={{ display: "grid", placeItems: "center" }}
//         >
//           <Slide direction="down" in={show} timeout={400}>
//             <SuiBox
//               position="relative"
//               fullWidth
//               display="flex"
//               flexDirection="column"
//               borderRadius="xl"
//               style={{ backgroundColor: "white" }}
//               shadow="xl"
//               m={0}
//             >
//               <SuiBox
//                 display="flex"
//                 alginItems="center"
//                 justifyContent="space-between"
//                 p={2}
//                 pb={0}
//               >
//                 <CloseIcon
//                   fontSize="medium"
//                   sx={{ cursor: "pointer" }}
//                   onClick={toggleModal}
//                 />
//               </SuiBox>
//               <Divider sx={{ my: 0 }} />
//               <SuiBox component="section" py={{ xs: 0, lg: 0 }} px={0}>
//                 <Container>
//                   <Grid container item>
//                     <SuiBox
//                       width="100%"
//                       bgColor="white"
//                       borderRadius="xl"
//                       shadow="xl"
//                       mb={2}
//                       m={0}
//                       sx={{ overflow: "hidden" }}
//                     >
//                       <Grid container spacing={2} justifyContent="center">
//                         <Grid item xs={12} lg={12} alignItems="center">
//                           <SuiBox component="form" p={1} method="post">
//                             <SuiBox px={0} py={{ xs: 2, sm: 2 }}>
//                               <SuiTypography variant="h3" mb={2}>
//                                 Edit Details
//                               </SuiTypography>
//                               <Grid container>
//                                 <Grid item xs={12} pr={1} mb={2}>
//                                   <SuiBox mb={2}>
//                                     <SuiBox mb={1} ml={0.5}>
//                                       <SuiTypography
//                                         component="label"
//                                         variant="caption"
//                                         fontWeight="bold"
//                                       >
//                                         OTP
//                                       </SuiTypography>
//                                     </SuiBox>
//                                     <SuiInput
//                                       // defaultValue={otp}
//                                       // onChange={(event) => {
//                                       //   setOtp(event.target.value);
//                                       //   setError(undefined);
//                                       // }}
//                                       type="text"
//                                       placeholder="otp"
//                                     />
//                                   </SuiBox>
//                                 </Grid>
//                               </Grid>

//                               <Grid item xs={12} pr={1} mb={2}>
//                                 <SuiBox mt={2} mb={2} textAlign="center">
//                                   <h4
//                                     style={{
//                                       fontSize: ".6em",
//                                       color: "red",
//                                       textAlign: "center",
//                                       fontWeight: 400,
//                                       transition: ".2s all",
//                                     }}
//                                   >
//                                     {error}
//                                   </h4>
//                                 </SuiBox>
//                                 <SuiBox mt={2} mb={2} textAlign="center">
//                                   <h6
//                                     style={{
//                                       fontSize: ".6em",
//                                       color: "green",
//                                       textAlign: "center",
//                                       fontWeight: 400,
//                                       transition: ".2s all",
//                                     }}
//                                   >
//                                     {success}
//                                   </h6>
//                                 </SuiBox>
//                               </Grid>

//                               <Divider sx={{ my: 0 }} />
//                               <Grid
//                                 container
//                                 item
//                                 xs={12}
//                                 pr={1}
//                                 mb={2}
//                                 justifyContent="flex-end"
//                               >
//                                 <SuiButton
//                                   variant="gradient"
//                                   buttonColor="dark"
//                                   onClick={() => {
//                                     updateAppointmentList("COMPLETED");
//                                     toggleModal();
//                                   }}
//                                 >
//                                   Submit
//                                 </SuiButton>
//                               </Grid>
//                             </SuiBox>
//                           </SuiBox>
//                         </Grid>
//                       </Grid>
//                     </SuiBox>
//                   </Grid>
//                 </Container>
//               </SuiBox>
//             </SuiBox>
//           </Slide>
//         </Modal>
//       </Grid>
//     </DashboardLayout>
//   );
// }

// export default Dashboard;


import React from "react";
import Grid from "@mui/material/Grid";
import SuiBox from "components/SuiBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useState, useEffect } from "react";
import AuthApi from "api/auth";
import { Card } from "@mui/material";
import { GridToolbar, DataGrid } from "@mui/x-data-grid";
import SuiButton from "components/SuiButton";
import { useHistory } from "react-router-dom";
import Cookies from "universal-cookie";
import { saveAs } from "file-saver";

var columns = [
  {
    field: "patientName",
    headerName: "Buyer Name",
    width: "200",
  },
  {
    field: "description",
    headerName: "Description",
    width: "200",
  },
  {
    field: "address",
    headerName: "Address",
    width: "200",
  },
  {
    field: "status",
    headerName: "Status",
    width: "190",
  },
  {
    field: "attachment",
    headerName: "Attachement",
    width: "200",
    renderCell: (params) => (
      <>
        {params.row.attachment ? (
          <strong>
            <SuiButton
              variant="gradient"
              buttonColor="dark"
              size="small"
              style={{ marginLeft: 16 }}
              onClick={() => {
                console.log(params.row.attachments);
                saveAs(
                  "https://medaidserver.herokuapp.com" + params.row.attachment,
                  params.row.id
                );
              }}
            >
              Download
            </SuiButton>
          </strong>
        ) : (
          <></>
        )}
      </>
    ),
  },
];

function Dashboard() {
  const [tableRows, setTableRows] = useState(null);
  const [reject, setReject] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [complete, setComplete] = useState(false);
  // const [attach, setAttach] = useState();
  const [tableColumn, setTableColumn] = useState(columns);
  const [select, setSelection] = React.useState([]);
  const cookies = new Cookies();
  const history = useHistory();
  const [selectionModel, setSelectionModel] = React.useState([]);

  useEffect(() => {
    getAppointmentList();
  }, []);

  const getAppointmentList = () => {
    AuthApi.getServicesList("MEDICINE").then((data) => {
      if (data.data.statusCode == 200) {
        console.log(data.data.data);
        setTableRows(
          data.data.data
            .map((e) => {
              var dt = {
                id: e._id,
                patientName: e.name,
                description: e.description,
                address: e.address.toUpperCase(),
                status: e.status,
                attachment: e.attachments,
              };
              return dt;
            })
        );
      } else {
        console.log("response data ", data);
      }
    });
  };

  const updateAppointmentList = async (stauts) => {
    var response = await AuthApi.appointmentStatusUpdate({
      appointmentIds: selectionModel,
      status: stauts,
    });
    console.log("update status response", response.data.statusCode);
    if (response.data.statusCode == 200) {
      setReject(false);
      setConfirm(false);
      setComplete(false);
      getAppointmentList();
    } else {
      console.log("showError");
    }
  };

  const rowSelect = (newSelectionModel) => {
        setSelectionModel(newSelectionModel);
        if (newSelectionModel.length == 0) {
          setReject(false);
          setConfirm(false);
          setComplete(false);
        } else {
          var selected = {};
          tableRows.map((e) => {
            if (newSelectionModel.includes(e.id)) {
              console.log(e.status);
              if (e.status == "PENDING") {
                selected.PENDING = true;
              }
              if (e.status == "CONFIRMED" && newSelectionModel.length == 1) {
                selected.CONFIRMED = true;
              }
            }
          });
    
          if (selected.PENDING) {
            setReject(true);
            setConfirm(true);
          }
          if (selected.CONFIRMED && newSelectionModel.length == 1) {
            setReject(true);
            setComplete(true);
          } else {
            setComplete(false);
          }
        }
      };
      
  return (
    <DashboardLayout>
      {!cookies.get("user") ? (
        history.push("/authentication/sign-in")
      ) : cookies.get("user").type != "CHEMIST" ? (
        history.push("/dashboard/" + cookies.get("user").type.toLowerCase())
      ) : (
        <>
          <DashboardNavbar />
          <SuiBox>
            <div style={{ height: 450, width: "100%" }}>
              <Grid xs={12} item container justifyContent="flex-end">
                {confirm ? (
                  <SuiButton
                    variant="gradient"
                    buttonColor="dark"
                    style={{ width: "150px", marginLeft: "1rem" }}
                    onClick={() => {
                      updateAppointmentList("CONFIRMED");
                    }}
                  >
                    Accept
                  </SuiButton>
                ) : (
                  <></>
                )}
                {reject ? (
                  <SuiButton
                    variant="gradient"
                    buttonColor="light"
                    style={{ width: "150px", marginLeft: "1rem" }}
                    onClick={() => {
                      updateAppointmentList("REJECTED");
                    }}
                  >
                    Reject
                  </SuiButton>
                ) : (
                  <></>
                )}
                {complete ? (
                  <SuiButton
                    variant="gradient"
                    buttonColor="dark"
                    style={{ width: "150px", marginLeft: "1rem" }}
                    onClick={() => {
                      updateAppointmentList("COMPLETED");
                    }}
                  >
                    COMPLETED
                  </SuiButton>
                ) : (
                  <></>
                )}
                {/* <SuiInput
              placeholder="Name"
              name="name"
              type="file"
              onChange={uploadschange}
            /> */}
              </Grid>
              <Card style={{ height: 800, width: "98%", marginTop: "1.5rem" }}>
                <h6>{select.map((val) => val.Start)}</h6>
                <DataGrid
                  rows={tableRows}
                  columns={tableColumn}
                  disableColumnSelector="true"
                  components={{
                    Toolbar: GridToolbar,
                    // NoRowsOverlay: CustomNoRowsOverlay,
                  }}
                  rowsPerPageOptions={[25]}
                  checkboxSelection
                  isRowSelectable={(params) =>
                    params.row.status != "COMPLETED" &&
                    params.row.status != "CANCELLED" &&
                    params.row.status != "REJECTED"
                  }
                  disableSelectionOnClick
                  onSelectionModelChange={(newSelectionModel) => {
                    rowSelect(newSelectionModel);
                  }}
                />
              </Card>
            </div>
          </SuiBox>
        </>
      )}
    </DashboardLayout>
  );
}

export default Dashboard;
