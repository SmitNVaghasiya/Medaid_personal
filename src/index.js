import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "App";
import "index.css";
import { SoftUIControllerProvider } from "context";
import { AuthProvider } from "auth-context/auth.context";

let user = localStorage.getItem("user");
user = JSON.parse(user);

ReactDOM.render(
  <BrowserRouter>
    <SoftUIControllerProvider>
      <AuthProvider userData={user}>
        <App />
      </AuthProvider>
    </SoftUIControllerProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
