import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { RequiredRole } from "../../utils/enums";

// eslint-disable-next-line react/prop-types
const AuthRoute = ({ element, requiredRole }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated && requiredRole === RequiredRole.NONE) {
    return element;
  }

  if (isAuthenticated) {
    return element;
  }

  return <Navigate to="/" replace />;
};

export default AuthRoute;
