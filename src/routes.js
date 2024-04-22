import React from "react";
import UserDashboard from "layouts/dashboard/patient";
import doctorDashboard from "layouts/dashboard/doctor";
import chemistDashboard from "layouts/dashboard/chemist";
import labtechDashboard from "layouts/dashboard/labtech";
import adminDashboard from "layouts/dashboard/admin";
import Profile from "layouts/profile";
import userAppointments from "layouts/dashboard/patient/appointment";
import userMedicineOrders from "layouts/dashboard/patient/medicineOrders";
import userLabtests from "layouts/dashboard/patient/labtest";
import confirmedAppointment from "layouts/dashboard/doctor/confirmedAppointment";
import pendingAppointment from "layouts/dashboard/doctor/pendingAppointment";
import cancelledAppointment from "layouts/dashboard/doctor/cancelledAppointment";
import rejectedAppointment from "layouts/dashboard/doctor/rejectedAppointment";
import completedAppointment from "layouts/dashboard/doctor/completedAppointment";
import confirmedOrders from "layouts/dashboard/chemist/confirmedOrders";
import pendingOrders from "layouts/dashboard/chemist/pendingOrders";
import rejectedOrders from "layouts/dashboard/chemist/rejectedOrders";
import cancelledOrders from "layouts/dashboard/chemist/cancelledOrders";
import completedOrders from "layouts/dashboard/chemist/completedOrders";
import confirmedLabtest from "layouts/dashboard/labtech/confirmedLabtest";
import pendingLabtest from "layouts/dashboard/labtech/pendingLabtest";
import cancelledLabtest from "layouts/dashboard/labtech/cancelledLabtest";
import rejectedLabtest from "layouts/dashboard/labtech/rejectedLabtest";
import completedLabtest from "layouts/dashboard/labtech/completedLabtest";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import SignUpsp from "layouts/authentication/sign-up/sp";
import SignOut from "layouts/authentication/sign-out";
import Homepage from "layouts/Homepage";
import Chat from "./layouts/dashboard/chat";
import Appointment from "layouts/service/Appointment";
import Medicine from "layouts/service/Medicine";
import Labtest from "layouts/service/Labtest";
import doctorlist from "layouts/dashboard/admin/doctorlist";
import chemistlist from "layouts/dashboard/admin/chemistlist";
import labtechlist from "layouts/dashboard/admin/labtechlist";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarCheck,
  faChartLine,
  faCheckCircle,
  faHourglass,
  faSignOutAlt,
  faTimesCircle,
  faStore,
  faIdBadge,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import ChatIcon from "@mui/icons-material/Chat";
import HomeIcon from "@mui/icons-material/Home";

const routes = [
  {
    type: "collapse",
    usertype: ["ADMIN"],
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard/admin",
    icon: (
      <FontAwesomeIcon
        style={{ color: "rgb(58, 65, 111)" }}
        size="xs"
        icon={faChartLine}
      />
    ),
    component: adminDashboard,
    noCollapse: true,
    protected: true,
  },
  // {
  //   type: "collapse",
  //   usertype: ["ADMIN"],
  //   name: "Doctorlist",
  //   key: "doctorlist",
  //   route: "/dashboard/admin/doctorlist",
  //   icon: (
  //     <FontAwesomeIcon
  //       style={{ color: "rgb(58, 65, 111)" }}
  //       size="xs"
  //       icon={faStore}
  //     />
  //   ),
  //   component: doctorlist,
  //   noCollapse: true,
  //   protected: true,
  // },
  {
    type: "collapse",
    usertype: ["PATIENT"],
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard/patient",
    icon: (
      <FontAwesomeIcon
        style={{ color: "rgb(58, 65, 111)" }}
        size="xs"
        icon={faChartLine}
      />
    ),
    component: UserDashboard,
    noCollapse: true,
    protected: true,
  },
  {
    type: "collapse",
    usertype: ["DOCTOR"],
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard/doctor",
    icon: (
      <FontAwesomeIcon
        style={{ color: "rgb(58, 65, 111)" }}
        size="xs"
        icon={faChartLine}
      />
    ),
    component: doctorDashboard,
    noCollapse: true,
    protected: true,
  },
  {
    type: "collapse",
    usertype: ["CHEMIST"],
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard/chemist",
    icon: (
      <FontAwesomeIcon
        style={{ color: "rgb(58, 65, 111)" }}
        size="xs"
        icon={faChartLine}
      />
    ),
    component: chemistDashboard,
    noCollapse: true,
    protected: true,
  },
  {
    type: "collapse",
    usertype: ["LABTECH"],
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard/labtech",
    icon: (
      <FontAwesomeIcon
        style={{ color: "rgb(58, 65, 111)" }}
        size="xs"
        icon={faChartLine}
      />
    ),
    component: labtechDashboard,
    noCollapse: true,
    protected: true,
  },

  {
    type: "title",
    title: "Services",
    key: "services",
    usertype: ["PATIENT", "DOCTOR", "CHEMIST", "LABTECH"],
  },
  {
    type: "collapse",
    usertype: ["PATIENT"],
    name: "Appointments",
    key: "appointmentlist",
    route: "/services/appointmentlist",
    icon: (
      <FontAwesomeIcon
        style={{ color: "rgb(58, 65, 111)" }}
        size="xs"
        icon={faStore}
      />
    ),
    component: userAppointments,
    noCollapse: true,
    protected: true,
  },
  {
    type: "collapse",
    usertype: ["PATIENT"],
    name: "Medicine Orders",
    key: "medicineorderlist",
    route: "/services/medicineorderlist",
    icon: (
      <FontAwesomeIcon
        style={{ color: "rgb(58, 65, 111)" }}
        size="xs"
        icon={faStore}
      />
    ),
    component: userMedicineOrders,
    noCollapse: true,
    protected: true,
  },
  {
    type: "collapse",
    usertype: ["PATIENT"],
    name: "Labtests",
    key: "labtestlist",
    route: "/services/labtestlist",
    icon: (
      <FontAwesomeIcon
        style={{ color: "rgb(58, 65, 111)" }}
        size="xs"
        icon={faStore}
      />
    ),
    component: userLabtests,
    noCollapse: true,
    protected: true,
  },
  // {
  //   type: "collapse",
  //   usertype: ["DOCTOR"],
  //   name: "Pending Appointments",
  //   key: "pendingappointmentlist",
  //   route: "/services/pendingappointmentlist",
  //   icon: (
  //     <FontAwesomeIcon
  //       style={{ color: "rgb(58, 65, 111)" }}
  //       icon={faHourglass}
  //       size="xs"
  //     />
  //   ),
  //   component: pendingAppointment,
  //   noCollapse: true,
  //   protected: true,
  // },
  {
    type: "collapse",
    usertype: ["DOCTOR"],
    name: "Rejected Appointments",
    key: "rejectedappointmentlist",
    route: "/services/rejectedappointmentlist",
    icon: (
      <FontAwesomeIcon
        style={{ color: "rgb(58, 65, 111)" }}
        icon={faTimesCircle}
        size="xs"
      />
    ),
    component: rejectedAppointment,
    noCollapse: true,
    protected: true,
  },
  {
    type: "collapse",
    usertype: ["DOCTOR"],
    name: "Cancelled Appointments",
    key: "cancelledappointmentlist",
    route: "/services/cancelledappointmentlist",
    icon: (
      <FontAwesomeIcon
        style={{ color: "rgb(58, 65, 111)" }}
        icon={faTimesCircle}
        size="xs"
      />
    ),
    component: cancelledAppointment,
    noCollapse: true,
    protected: true,
  },
  {
    type: "collapse",
    usertype: ["DOCTOR"],
    name: "Confirmed Appointments",
    key: "confirmedappointmentlist",
    route: "/services/confirmedappointmentlist",
    icon: (
      <FontAwesomeIcon
        style={{ color: "rgb(58, 65, 111)" }}
        size="xs"
        icon={faCalendarCheck}
      />
    ),
    component: confirmedAppointment,
    noCollapse: true,
    protected: true,
  },
  {
    type: "collapse",
    usertype: ["DOCTOR"],
    name: "Completed Appointments",
    key: "completedappointmentlist",
    route: "/services/completedappointmentlist",
    icon: (
      <FontAwesomeIcon
        style={{ color: "rgb(58, 65, 111)" }}
        icon={faCheckCircle}
        size="xs"
      />
    ),
    component: completedAppointment,
    noCollapse: true,
    protected: true,
  },
  // {
  //   type: "collapse",
  //   usertype: ["CHEMIST"],
  //   name: "Pending Orders",
  //   key: "pendingOrderslist",
  //   route: "/services/pendingOrderslist",
  //   icon: (
  //     <FontAwesomeIcon
  //       style={{ color: "rgb(58, 65, 111)" }}
  //       icon={faHourglass}
  //       size="xs"
  //     />
  //   ),
  //   component: pendingOrders,
  //   noCollapse: true,
  //   protected: true,
  // },
  {
    type: "collapse",
    usertype: ["CHEMIST"],
    name: "Rejected Orders",
    key: "rejectedOrderslist",
    route: "/services/rejectedOrderslist",
    icon: (
      <FontAwesomeIcon
        style={{ color: "rgb(58, 65, 111)" }}
        icon={faTimesCircle}
        size="xs"
      />
    ),
    component: rejectedOrders,
    noCollapse: true,
    protected: true,
  },
  {
    type: "collapse",
    usertype: ["CHEMIST"],
    name: "Cancelled Orders",
    key: "cancelledOrderslist",
    route: "/services/cancelledOrderslist",
    icon: (
      <FontAwesomeIcon
        style={{ color: "rgb(58, 65, 111)" }}
        icon={faTimesCircle}
        size="xs"
      />
    ),
    component: cancelledOrders,
    noCollapse: true,
    protected: true,
  },
  {
    type: "collapse",
    usertype: ["CHEMIST"],
    name: "Confirmed Orders",
    key: "confirmedOrderslist",
    route: "/services/confirmedOrderslist",
    icon: (
      <FontAwesomeIcon
        style={{ color: "rgb(58, 65, 111)" }}
        size="xs"
        icon={faCalendarCheck}
      />
    ),
    component: confirmedOrders,
    noCollapse: true,
    protected: true,
  },
  {
    type: "collapse",
    usertype: ["CHEMIST"],
    name: "Completed Orders",
    key: "completedOrderslist",
    route: "/services/completedOrderslist",
    icon: (
      <FontAwesomeIcon
        style={{ color: "rgb(58, 65, 111)" }}
        icon={faCheckCircle}
        size="xs"
      />
    ),
    component: completedOrders,
    noCollapse: true,
    protected: true,
  },
  // {
  //   type: "collapse",
  //   usertype: ["LABTECH"],
  //   name: "Pending Labtest",
  //   key: "pendingLabtestlist",
  //   route: "/services/pendingLabtestlist",
  //   icon: (
  //     <FontAwesomeIcon
  //       style={{ color: "rgb(58, 65, 111)" }}
  //       icon={faHourglass}
  //       size="xs"
  //     />
  //   ),
  //   component: pendingLabtest,
  //   noCollapse: true,
  //   protected: true,
  // },
  {
    type: "collapse",
    usertype: ["LABTECH"],
    name: "Rejected Labtest",
    key: "rejectedLabtestlist",
    route: "/services/rejectedLabtestlist",
    icon: (
      <FontAwesomeIcon
        style={{ color: "rgb(58, 65, 111)" }}
        icon={faTimesCircle}
        size="xs"
      />
    ),
    component: rejectedLabtest,
    noCollapse: true,
    protected: true,
  },
  {
    type: "collapse",
    usertype: ["LABTECH"],
    name: "Cancelled Labtest",
    key: "cancelledLabtestlist",
    route: "/services/cancelledLabtestlist",
    icon: (
      <FontAwesomeIcon
        style={{ color: "rgb(58, 65, 111)" }}
        icon={faTimesCircle}
        size="xs"
      />
    ),
    component: cancelledLabtest,
    noCollapse: true,
    protected: true,
  },
  {
    type: "collapse",
    usertype: ["LABTECH"],
    name: "Confirmed Labtest",
    key: "confirmedLabtestlist",
    route: "/services/confirmedLabtestlist",
    icon: (
      <FontAwesomeIcon
        style={{ color: "rgb(58, 65, 111)" }}
        size="xs"
        icon={faCalendarCheck}
      />
    ),
    component: confirmedLabtest,
    noCollapse: true,
    protected: true,
  },
  {
    type: "collapse",
    usertype: ["LABTECH"],
    name: "Completed Labtest",
    key: "completedLabtestlist",
    route: "/services/completedLabtestlist",
    icon: (
      <FontAwesomeIcon
        style={{ color: "rgb(58, 65, 111)" }}
        icon={faCheckCircle}
        size="xs"
      />
    ),
    component: completedLabtest,
    noCollapse: true,
    protected: true,
  },
  {
    type: "title",
    title: "Account Pages",
    key: "account-pages",
    usertype: ["PATIENT", "DOCTOR", "CHEMIST", "LABTECH"],
  },
  {
    type: "collapse",
    usertype: ["PATIENT", "DOCTOR", "CHEMIST", "LABTECH"],
    name: "Profile",
    key: "profile",
    route: "/profile",
    icon: (
      <FontAwesomeIcon
        style={{ color: "rgb(58, 65, 111)" }}
        icon={faIdBadge}
        size="xs"
      />
    ),
    component: Profile,
    noCollapse: true,
    protected: true,
  },
  {
    type: "hide",
    usertype: [],
    name: "Sign In",
    key: "sign-in",
    route: "/authentication/sign-in",
    icon: <Document size="12px" />,
    component: SignIn,
    noCollapse: true,
  },
  {
    type: "hide",
    usertype: [],
    name: "Sign Up",
    key: "sign-up",
    route: "/authentication/sign-up",
    icon: (
      <FontAwesomeIcon
        style={{ color: "rgb(58, 65, 111)" }}
        icon={faUserPlus}
        size="xs"
      />
    ),
    component: SignUp,
    noCollapse: true,
  },
  {
    type: "hide",
    usertype: [],
    name: "Sign Up",
    key: "sign-up-sp",
    route: "/authentication/sign-up-sp",
    icon: (
      <FontAwesomeIcon
        style={{ color: "rgb(58, 65, 111)" }}
        icon={faUserPlus}
        size="xs"
      />
    ),
    component: SignUpsp,
    noCollapse: true,
  },
  {
    type: "collapse",
    usertype: ["PATIENT", "ADMIN"],
    name: "Homepage",
    key: "home",
    route: "/",
    icon: <HomeIcon sx={{ fontSize: 10 }} />,
    component: Homepage,
    noCollapse: true,
  },
  {
    type: "hide",
    usertype: ["PATIENT", "ADMIN"],
    name: "Appointment Service",
    key: "appointment-service",
    route: "/service/appointment",
    icon: (
      <FontAwesomeIcon
        style={{ color: "rgb(58, 65, 111)" }}
        icon={faUserPlus}
        size="xs"
      />
    ),
    component: Appointment,
    noCollapse: true,
  },
  {
    type: "hide",
    usertype: ["PATIENT", "ADMIN"],
    name: "Appointment Service",
    key: "medicine-service",
    route: "/service/medicine",
    icon: (
      <FontAwesomeIcon
        style={{ color: "rgb(58, 65, 111)" }}
        icon={faUserPlus}
        size="xs"
      />
    ),
    component: Medicine,
    noCollapse: true,
  },
  {
    type: "hide",
    usertype: ["PATIENT", "ADMIN"],
    name: "Labtest",
    key: "labtest-service",
    route: "/service/labtest",
    icon: (
      <FontAwesomeIcon
        style={{ color: "rgb(58, 65, 111)" }}
        icon={faUserPlus}
        size="xs"
      />
    ),
    component: Labtest,
    noCollapse: true,
  },
  {
    type: "collapse",
    usertype: ["PATIENT", "DOCTOR", "CHEMIST", "LABTECH", "ADMIN"],
    name: "chat",
    key: "chat",
    route: "/dashboard/chat",
    icon: <ChatIcon sx={{ fontSize: 5 }} />,
    component: Chat,
    noCollapse: true,
  },
  {
    type: "collapse",
    usertype: ["PATIENT", "DOCTOR", "CHEMIST", "LABTECH", "ADMIN"],
    name: "Logout",
    key: "sign-out",
    route: "/authentication/sign-out",
    icon: (
      <FontAwesomeIcon
        style={{ color: "rgb(58, 65, 111)" }}
        size="xs"
        icon={faSignOutAlt}
      />
    ),
    component: SignOut,
    noCollapse: true,
  },
];

export default routes;
