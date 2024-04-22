import * as React from "react";
import Grid from "@mui/material/Grid";
import { Card } from "@mui/material";
import SuiBox from "components/SuiBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Modal from "@mui/material/Modal";
import Slide from "@mui/material/Slide";
import CloseIcon from "@mui/icons-material/Close";
import Divider from "@mui/material/Divider";
import Container from "@mui/material/Container";
import { useState, createContext, useEffect } from "react";
import AuthApi from "../../../api/auth";
import { DataGrid, GridToolbar, GridOverlay } from "@mui/x-data-grid";
import SuiButton from "components/SuiButton";

function doctorlist() {
  var columns = [
    {
      field: "name",
      headerName: "User Name",
      width: "200",
    },
    {
      field: "mobileNo",
      headerName: "Mobile No",
      width: "200",
    },
    {
      field: "gender",
      headerName: "Gender",
      width: "200",
    },
    {
      field: "type",
      headerName: "Type",
      width: "200",
    },
    {
      field: "workplacename",
      headerName: "Workplace Name",
      width: "200",
    },
    {
      field: "workplaceaddress",
      headerName: "Workplace Address",
      width: "200",
    },
    {
      field: "workplacetype",
      headerName: "Workplace Type",
      width: "200",
    },
  ];
  const [tableData, setTableData] = useState(null);

  const [tableRows, setTableRows] = useState(null);
  const [reject, setReject] = useState(false);
  const [remove, setRemove] = useState(false);
  const [complete, setComplete] = useState(false);
  const [tableColumn, setTableColumn] = useState(columns);
  const [select, setSelection] = React.useState([]);

  const [selectionModel, setSelectionModel] = React.useState([]);

  const [show, setShow] = useState(false);
  const toggleModal = () => setShow(!show);

  useEffect(() => {
    getUserList();
  }, []);

  const getUserList = () => {
    AuthApi.allUsers("DOCTOR").then((data) => {
      if (data.data.statusCode == 200) {
        console.log(data.data.data);
        setTableRows(
          data.data.data.map((e) => {
            var dt = {
              id: e._id,
              name: e.name,
              mobileNo: e.mobileNo,
              gender: e.gender,
              type: e.type,
              workplacename: e.workplace?.name ?? "",
              workplaceaddress: e.workplace?.address ?? "",
              workplacetype: e.workplace?.type ?? "",
              workplace: e.workplace ?? "",
            };
            return dt;
          })
        );
      } else {
        console.log("response data ", data);
      }
    });
  };

  const deleteUser = async () => {
    var response = await AuthApi.deleteUser({ userId: selectionModel });
    console.log("update status response", response.data.statusCode);
    if (response.data.statusCode == 200) {
      setRemove(false);
      getUserList();
    } else {
      console.log("showError");
    }
  };

  const rowSelect = (newSelectionModel) => {
    setSelectionModel(newSelectionModel);
    if (newSelectionModel.length == 0) {
      setRemove(false);
    } else {
      setRemove(true);
    }
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox>
        <div style={{ height: 550, width: "100%" }}>
          <Grid xs={12} item container justifyContent="flex-end">
            {remove ? (
              <SuiButton
                variant="gradient"
                buttonColor="dark"
                style={{ width: "150px", marginLeft: "1rem" }}
                onClick={() => {
                  deleteUser();
                }}
              >
                Remove
              </SuiButton>
            ) : (
              <></>
            )}
          </Grid>
          <Card style={{ height: 800, width: "98%", marginTop: "1.5rem" }}>
            <h6>{select.map((val) => val.Start)}</h6>
            <DataGrid
              rows={tableRows}
              columns={tableColumn}
              disableColumnSelector="true"
              components={{
                Toolbar: GridToolbar,
              }}
              rowsPerPageOptions={[25]}
              checkboxSelection
              disableSelectionOnClick
              onSelectionModelChange={(newSelectionModel) => {
                rowSelect(newSelectionModel);
              }}
            />
          </Card>
        </div>
      </SuiBox>
      <Modal
        open={show}
        onClose={toggleModal}
        sx={{ display: "grid", placeItems: "center" }}
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
              <CloseIcon
                fontSize="medium"
                sx={{ cursor: "pointer" }}
                onClick={toggleModal}
              />
            </SuiBox>
            <Divider sx={{ my: 0 }} />
            <SuiBox component="section" py={{ xs: 0, lg: 6 }}>
              <Container></Container>
            </SuiBox>

            <Divider sx={{ my: 0 }} />
            <SuiBox display="flex" justifyContent="space-between" p={1.5}>
              <SuiButton
                variant="gradient"
                buttonColor="dark"
                onClick={() => {
                  toggleModal();
                }}
              >
                Close
              </SuiButton>
            </SuiBox>
          </SuiBox>
        </Slide>
      </Modal>
    </DashboardLayout>
  );
}

export default doctorlist;
