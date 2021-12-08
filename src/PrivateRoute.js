import { Navigate } from "react-router";

const PrivateRoute = ({ children, ...rest }) => {
  if (Boolean(window.localStorage.getItem("auth"))) {
    return children;
  }
  return <Navigate to="/login" />;
};

export default PrivateRoute;
