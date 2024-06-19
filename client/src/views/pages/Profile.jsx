import { useSelector } from "react-redux";
import { CompanyDetailsCard } from "./components/CompanyDetailsCard";
import { UserDetailsCard } from "./components/UserDetailsCard";
import { selectLoggedInUser } from "../../state/authSlice";
import { RequiredRole } from "../../utils/enums";

export const Profile = () => {
  const { role } = useSelector(selectLoggedInUser);

  return (
    <div className="wrapper">
      <div className="header-wrapper">
        <h1>Profilom</h1>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {role === RequiredRole.JOBSEEKER ? (
          <UserDetailsCard />
        ) : (
          <CompanyDetailsCard />
        )}
      </div>
    </div>
  );
};
