import "./styles/Layout.css";
import { Stack } from "@mui/material";
import { Link, Outlet } from "react-router-dom";
import { AuthStatus } from "../auth/AuthStatus";

export const Layout = () => {
  return (
    <>
      <div className="menu-wrapper">
        <Stack direction="row" spacing={3} alignItems="center">
          <h1 style={{ color: "#fff" }}>
            <Link to="/" style={{ textDecoration: "none", color: "#fff" }}>
              JobHunter
            </Link>
          </h1>
          <AuthStatus />
        </Stack>
      </div>
      <Outlet />
    </>
  );
};
