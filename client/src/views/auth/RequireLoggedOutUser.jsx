/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectLoggedInUser } from "../../state/authSlice";

const RequireLoggedOutUser = ({ element }) => {
  const user = useSelector(selectLoggedInUser);

  if (user) {
    return <Navigate to="/" replace />;
  }

  return element;
};

export default RequireLoggedOutUser;
