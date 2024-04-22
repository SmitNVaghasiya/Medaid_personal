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
// import { Container, Divider, Modal, Slide } from "@mui/material";
// import SuiTypography from "components/SuiTypography";
// import SuiInput from "components/SuiInput";
// import CloseIcon from "@mui/icons-material/Close";
// import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
// import { auth } from "api/firebase";

// var columns = [
//   {
//     field: "patientName",
//     headerName: "Patient Name",
//     width: "160",
//   },
//   {
//     field: "age",
//     headerName: "Age",
//     width: "60",
//   },
//   {
//     field: "description",
//     headerName: "Description",
//     width: "170",
//   },
//   {
//     field: "date",
//     headerName: "Date",
//     width: "180",
//   },
//   {
//     field: "timeSlots",
//     headerName: "Time Slot",
//     width: "180",
//   },
//   // {
//   //   field: "mobileNo",
//   //   headerName: "Mobile No",
//   //   width: "180",
//   // },
//   {
//     field: "address",
//     headerName: "Address",
//     width: "350",
//   },
//   {
//     field: "status",
//     headerName: "Status",
//     width: "130",
//   },
//   {
//     field: "attachment",
//     headerName: "Attachement",
//     width: "185",
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
//   // const [otp, setOtp] = useState("");
//   const [final, setfinal] = useState("");
//   const [success, setSuccess] = useState(undefined);

//   // const [users, setUsers] = useState({
//   //   otp: "",
//   // });

//   // const otpInputEvent = (e) => {
//   //   const { name, value } = e.target;
//   //   setUsers((preValue) => {
//   //     console.log(preValue);
//   //     console.log(e.target.value);
//   //     return {
//   //       ...preValue,
//   //       [name]: value,
//   //     };
//   //   });
//   // };

//   // useEffect(() => {
//   //   getAppointmentList();
//   //   return () => {
//   //     verifyer.clear();
//   //   };
//   // }, []);

//   // const verifyer = async (event) => {
//   //   if (event) {
//   //     event.preventDefault();
//   //   }
//   //   validateOtp();
//   // };

//   // function validateOtp() {
//   //   console.log("validate otp");
//   //   if (users.otp === null || final === null) return;
//   //   final
//   //     .confirm(users.otp)
//   //     .then(async (result) => {
//   //       console.log(result);
//   //       updateAppointmentList("COMPLETED");
//   //     })
//   //     .catch((err) => {
//   //       setSuccess(null);
//   //       setError("Wrong OTP");
//   //     });
//   // }

//   // const sendOtp = async (mobileNo) => {
//   //   console.log("hello");
//   //   console.log(mobileNo);
//   //   // var response = await AuthApi.isUserAvailable(mobileNo);
//   //   // console.log("response", response);
//   //   let verify = new RecaptchaVerifier(
//   //     "recaptcha-container",
//   //     {
//   //       size: "invisible",
//   //       callback: (response) => {
//   //         console.log("capcha verify");
//   //       },
//   //     },
//   //     auth
//   //   );
//   //   signInWithPhoneNumber(auth, mobileNo, verify)
//   //     .then((result) => {
//   //       setError(null);
//   //       setSuccess("OTP sent successfully.");
//   //       setShow(false);
//   //       // setfinal(result);
//   //       toggleModal();
//   //     })
//   //     .catch((err) => {
//   //       setSuccess(null);
//   //       console.log(err);
//   //       // setError("Something went wrong!Please try again.");
//   //     });
//   // };

//   const getAppointmentList = () => {
//     AuthApi.getServicesList("APPOINTMENT").then((data) => {
//       if (data.data.statusCode == 200) {
//         console.log(data.data.data);
//         setTableRows(
//           data.data.data.map((e) => {
//             var dt = {
//               id: e._id,
//               patientName: e.name,
//               age: e.age,
//               description: e.description,
//               date:
//                 e.date == undefined
//                   ? ""
//                   : new Date(Date.parse(e.date)).toLocaleDateString("en-US"),
//               timeSlots: e.timeSlots,
//               address: e.address.toUpperCase(),
//               status: e.status,
//               attachment: e.attachments,
//               // mobileNo: e.user[0].mobileNo,
//             };
//             return dt;
//           })
//         );
//       } else {
//         console.log("response data ", data);
//       }
//     });
//   };

//   const updateAppointmentList = async (stauts) => {
//     var response = await AuthApi.appointmentStatusUpdate({
//       appointmentIds: selectionModel,
//       status: stauts,
//     });
//     console.log("update status response", response.data.statusCode);
//     if (response.data.statusCode == 200) {
//       setConfirm(false);
//       setComplete(false);
//       setReject(false);
//       getAppointmentList();
//     } else {
//       console.log("showError");
//     }
//   };

// const rowSelect = (newSelectionModel) => {
//   setSelectionModel(newSelectionModel);
//   if (newSelectionModel.length == 0) {
//     setReject(false);
//     setConfirm(false);
//     setComplete(false);
//   } else {
//     var selected = {};
//     tableRows.map((e) => {
//       if (newSelectionModel.includes(e.id)) {
//         console.log(e.status);
//         if (e.status == "PENDING") {
//           selected.PENDING = true;
//         }
//         if (e.status == "CONFIRMED" && newSelectionModel.length == 1) {
//           selected.CONFIRMED = true;
//         }
//       }
//     });

//     if (selected.PENDING) {
//       setReject(true);
//       setConfirm(true);
//     }
//     if (selected.CONFIRMED && newSelectionModel.length == 1) {
//       setReject(true);
//       setComplete(true);
//     } else {
//       setComplete(false);
//       setReject(false);
//     }
//   }
// };
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
//                   updateAppointmentList("COMPLETED");
//                 }}
//               >
//                 COMPLETED
//               </SuiButton>
//             ) : (
//               // <SuiButton
//               //   variant="gradient"
//               //   buttonColor="dark"
//               //   style={{ width: "150px", marginLeft: "1rem" }}
//               //   onClick={() => {
//               //     var temp;
//               //     for (let i = 0; i < tableRows.length; i++) {
//               //       if (tableRows[i].id == selectionModel[0]) {
//               //         console.log(tableRows[i].mobileNo);
//               //         temp = i;
//               //       }
//               //     }
//               //     sendOtp(tableRows[temp].mobileNo);
//               //   }}
//               // >
//               //   COMPLETED
//               //   <SuiBox id="recaptcha-container"></SuiBox>
//               // </SuiButton>
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

//               {/* <SuiBox component="section" py={{ xs: 0, lg: 0 }} px={0}>
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
//                                       onChange={otpInputEvent}
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
//                                   onClick={verifyer}
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
//               </SuiBox> */}
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
import Cookies from "universal-cookie";
import { useHistory } from "react-router-dom";
import { saveAs } from "file-saver";

var columns = [
  {
    field: "patientName",
    headerName: "Patient Name",
    width: "160",
  },
  {
    field: "age",
    headerName: "Age",
    width: "60",
  },
  {
    field: "description",
    headerName: "Description",
    width: "170",
  },
  {
    field: "date",
    headerName: "Date",
    width: "180",
  },
  {
    field: "timeSlots",
    headerName: "Time Slot",
    width: "180",
  },
  {
    field: "address",
    headerName: "Address",
    width: "350",
  },
  {
    field: "status",
    headerName: "Status",
    width: "130",
  },
  {
    field: "attachment",
    headerName: "Attachement",
    width: "185",
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
  const [tableColumn, setTableColumn] = useState(columns);
  const [select, setSelection] = React.useState([]);
  const cookies = new Cookies();
  const history = useHistory();
  const [selectionModel, setSelectionModel] = React.useState([]);

  useEffect(() => {
    getAppointmentList();
  }, []);

  const getAppointmentList = () => {
    AuthApi.getServicesList("APPOINTMENT").then((data) => {
      if (data.data.statusCode == 200) {
        console.log(data.data.data);
        setTableRows(
          data.data.data.map((e) => {
            var dt = {
              id: e._id,
              patientName: e.name,
              age: e.age,
              description: e.description,
              date:
                e.date == undefined
                  ? ""
                  : new Date(Date.parse(e.date)).toLocaleDateString("en-US"),
              timeSlots: e.timeSlots,
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
        setReject(false);
      }
    }
  };
  return (
    <DashboardLayout>
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
    </DashboardLayout>
  );
}

export default Dashboard;
