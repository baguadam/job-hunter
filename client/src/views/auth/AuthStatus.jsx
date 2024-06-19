import { useDispatch, useSelector } from "react-redux";
import { logout, selectLoggedInUser } from "../../state/authSlice";
import { Button, Stack } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { buttonStyles } from "../../utils/styles";

export const AuthStatus = () => {
  const user = useSelector(selectLoggedInUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogoutClick = () => {
    dispatch(logout());
    navigate("/", { replace: true });
  };

  // bejelentkezett felhasználóhoz tartozó gombok információi
  const loggedInButtons = [
    { text: "Álláshirdetések", link: "/" },
    { text: "Profilom", link: "/profile" },
    {
      text: "Álláshirdetés hozzáadása",
      link: "/add-job",
      condition: user?.role === "company",
    },
    { text: "Kijelentkezés", onClick: handleLogoutClick },
  ];

  // kijelentkezett felhasználóhoz tartozó gombok információi
  const loggedOutButtons = [
    { text: "Regisztráció", link: "/register" },
    { text: "Belépés", link: "/login" },
  ];

  return (
    <Stack direction="row" spacing={3}>
      {user
        ? loggedInButtons.map(
            ({ text, link, onClick, condition = true }) =>
              condition && (
                <Button
                  key={text}
                  variant="outlined"
                  className="nav-button"
                  sx={buttonStyles}
                  onClick={onClick}
                >
                  {link ? (
                    <Link
                      to={link}
                      style={{ textDecoration: "none", color: "#fff" }}
                    >
                      {text}
                    </Link>
                  ) : (
                    text
                  )}
                </Button>
              )
          )
        : loggedOutButtons.map(({ text, link }) => (
            <Button
              key={text}
              variant="outlined"
              className="nav-button"
              sx={buttonStyles}
            >
              <Link to={link} style={{ textDecoration: "none", color: "#fff" }}>
                {text}
              </Link>
            </Button>
          ))}
    </Stack>
  );
};
