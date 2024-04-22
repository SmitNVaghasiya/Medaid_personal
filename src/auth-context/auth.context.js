import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { auth } from "api/firebase";

const AuthContext = React.createContext(null);

export const AuthProvider = ({ userData, children, curretnUser }) => {
  const [userJ, setUser] = React.useState(userData);
  const [cUser, setCurrentUser] = React.useState("undefindUser");
  const [loading, setLoading] = React.useState(true);
  let user = typeof userJ === "string" ? JSON.parse(userJ) : userJ;
  useEffect(() => {
    auth.onAuthStateChanged(async function (firebaseAuthUser) {
      setLoading(false);
    });
  }, []);

  return !loading ? (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  ) : (
    <></>
  );
};

AuthProvider.propTypes = {
  userData: PropTypes.any,
  children: PropTypes.any,
  curretnUser: PropTypes.any,
};

export const useAuth = () => React.useContext(AuthContext);
