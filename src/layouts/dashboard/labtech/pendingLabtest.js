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
    AuthApi.getServicesList("LABTEST").then((data) => {
      if (data.data.statusCode == 200) {
        console.log(data.data.data);
        setTableRows(
          data.data.data
            .map((e) => {
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
            .filter((x) => {
              return x.status == "PENDING";
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
          if (e.status == "CONFIRMED") {
            selected.CONFIRMED = true;
          }
        }
      });

      if (selected.PENDING) {
        setReject(true);
        setConfirm(true);
      }
      if (selected.CONFIRMED) {
        setComplete(true);
      }
    }
  };
  return (
    <DashboardLayout>
      {!cookies.get("user") ? (
        history.push("/authentication/sign-in")
      ) : cookies.get("user").type != "LABTECH" ? (
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
