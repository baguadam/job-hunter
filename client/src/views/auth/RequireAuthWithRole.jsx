import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { RequiredRole } from "../../utils/enums";

// eslint-disable-next-line react/prop-types
const RequireAuthWithRole = ({ element, requiredRole }) => {
  const { isAuthenticated, user } = useAuth();

  if (
    !isAuthenticated ||
    !user ||
    (requiredRole !== RequiredRole.EITHER && user.role !== requiredRole)
  ) {
    return <Navigate to="/" replace />;
  }

  return element;
};

export default RequireAuthWithRole;
