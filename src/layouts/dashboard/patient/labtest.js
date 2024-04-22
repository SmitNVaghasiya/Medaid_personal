import React from "react";
import Grid from "@mui/material/Grid";
import SuiBox from "components/SuiBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useState, useEffect } from "react";
import AuthApi from "api/auth";
import { Card } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Toolbar } from "@mui/material/Toolbar";
import SuiButton from "components/SuiButton";
import Cookies from "universal-cookie";
import { useHistory } from "react-router-dom";
import { saveAs } from "file-saver";

var columns = [
  {
    field: "labtechName",
    headerName: "Labtech Name",
    width: "180",
  },
  {
    field: "description",
    headerName: "Description",
    width: "180",
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

function Labtest() {
  const [tableRows, setTableRows] = useState(null);
  const [cancel, setCancel] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [complete, setComplete] = useState(false);
  // const [attach, setAttach] = useState();
  const [tableColumn, setTableColumn] = useState(columns);
  const [select, setSelection] = React.useState([]);

  const [selectionModel, setSelectionModel] = React.useState([]);

  const cookies = new Cookies();
  const history = useHistory();

  const [tableData, setTableData] = useState(null);
  useEffect(() => {
    getAppointmentList();
  }, []);

  const getAppointmentList = () => {
    AuthApi.getServicesList("LABTEST").then((data) => {
      if (data.data.statusCode == 200) {
        setTableRows(
          data.data.data.map((e) => {
            var dt = {
              id: e._id,
              labtechName: e.serviceProvider[0].name,
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
      setCancel(false);
      getAppointmentList();
    } else {
      console.log("showError");
    }
  };

  // const rowSelect = (newSelectionModel) => {
  //   setSelectionModel(newSelectionModel);
  //   if (newSelectionModel.length == 0) {
  //     setCancel(false);
  //   } else {
  //     var selected = {};
  //     tableRows.map((e) => {
  //       if (newSelectionModel.includes(e.id)) {
  //         console.log(e.status);
  //         if (e.status == "PENDING") {
  //           selected.PENDING = true;
  //         }
  //       }
  //     });

  //     if (selected.PENDING) {
  //       setCancel(true);
  //     }
  //   }
  // };
  const rowSelect = (newSelectionModel) => {
    setSelectionModel(newSelectionModel);
    if (newSelectionModel.length == 0) {
      setCancel(false);
    } else {
      var selected = {};
      tableRows.map((e) => {
        if (newSelectionModel.includes(e.id)) {
          console.log(e.status);
          if (e.status == "CONFIRMED" && newSelectionModel.length == 1) {
            selected.CONFIRMED = true;
          }
        }
      });
      if (selected.CONFIRMED && newSelectionModel.length == 1) {
        setCancel(true);
      } else {
        setCancel(false);
      }
    }
  };
  // };

  return (
    <DashboardLayout>
      {!cookies.get("user") ? (
        history.push("/authentication/sign-in")
      ) : cookies.get("user").type != "PATIENT" ? (
        history.push("/dashboard/" + cookies.get("user").type.toLowerCase())
      ) : (
        <>
          <DashboardNavbar />
          <SuiBox py={3}>
            {/* <SuiBox mb={3}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} xl={4}>
                  <MiniStatisticsCard
                    title={{ text: "Pending" }}
                    count="4"
                    percentage={{ color: "success", text: "labtests" }}
                    icon={{ color: "info", component: "paid" }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} xl={4}>
                  <MiniStatisticsCard
                    title={{ text: "Confirmed" }}
                    count="3"
                    percentage={{ color: "success", text: "labtests" }}
                    icon={{ color: "info", component: "public" }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} xl={4}>
                  <MiniStatisticsCard
                    title={{ text: "Completed" }}
                    count="2"
                    percentage={{ color: "success", text: "labtests" }}
                    icon={{ color: "info", component: "emoji_events" }}
                  />
                </Grid>
              </Grid>
            </SuiBox> */}
            <div style={{ height: 450, width: "100%" }}>
              <Grid xs={12} item container justifyContent="flex-end">
                {cancel ? (
                  <SuiButton
                    variant="gradient"
                    buttonColor="dark"
                    style={{ width: "150px", marginLeft: "1rem" }}
                    onClick={() => {
                      updateAppointmentList("CANCELLED");
                    }}
                  >
                    Cancel
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

export default Labtest;
