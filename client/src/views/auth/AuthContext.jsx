import { createContext, useContext, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectAuthToken, selectLoggedInUser } from "../../state/authSlice";
import { RequiredRole } from "../../utils/enums";

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthenticatedAsJobseeker, setIsAuthenticatedAsJobSeeker] =
    useState(false);
  const [isAuthenticatedAsCompany, setIsAuthenticatedAsCompany] =
    useState(false);
  const token = useSelector(selectAuthToken);
  const user = useSelector(selectLoggedInUser);

  useEffect(() => {
    if (token) {
      setIsAuthenticated(true);
      if (user.role === RequiredRole.JOBSEEKER) {
        setIsAuthenticatedAsJobSeeker(true);
      } else if (user.role === RequiredRole.COMPANY) {
        setIsAuthenticatedAsCompany(true);
      }
    } else {
      setIsAuthenticated(false);
      setIsAuthenticatedAsCompany(false);
      setIsAuthenticatedAsJobSeeker(false);
    }
  }, [token, user]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        user,
        isAuthenticatedAsCompany,
        isAuthenticatedAsJobseeker,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
