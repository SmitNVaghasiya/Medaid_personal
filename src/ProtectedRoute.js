import React from "react";
import { Route } from "react-router-dom";
import { useAuth } from "auth-context/auth.context";
import AuthApi from "api/auth";

export const ProtectedRoute = ({ ...rest }) => {
  // const history = useHistory();
  // let { user, cUser } = useAuth();

  // if (cUser == null) {
  //   console.log("cUser", cUser);
  //   return (
  //     <SweetAlert
  //       title="You must be signed in!"
  //       onCancel={() => history.push("/authentication/sign-in")}
  //       onConfirm={() => history.push("/authentication/sign-in")}
  //       confirmBtnCssClass={"px-5"}
  //       style={{ borderRadius: "0.7rem" }}
  //     />
  //   );
  // } else if (cUser !== null && !user) {
  //   var asyncFunction = async () => {
  //     var response = await AuthApi.getUser();
  //     if (response.data.statusCode != 200) {
  //       return;
  //     }
  //     // return history.push(`/dashboard/${user.type.toLowerCase()}`);
  //   };
  //   asyncFunction();

  //   rest.path = "/authentication/sign-in";
  //   return <Route {...rest} />;
  // }

  return <Route {...rest} />;
};
