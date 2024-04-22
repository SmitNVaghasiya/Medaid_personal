import { useEffect } from "react";
import AuthApi from "../../../api/auth";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../../auth-context/auth.context";
import { firebase } from "api/firebase";
import { auth } from "api/firebase";
import Cookies from "universal-cookie";

function SignOut() {
  const history = useHistory();
  const { setUser } = useAuth();
  let { user } = useAuth();

  const handleLogout = async () => {
    localStorage.removeItem("user");
    const cookies = new Cookies();
    cookies.remove("user", { path: "/" });
    return history.push("/authentication/sign-in");
  };

  useEffect(() => {
    handleLogout();
  }, []);

  return null;
}

export default SignOut;
