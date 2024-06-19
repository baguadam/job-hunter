import {
  Button,
  Stack,
  Switch,
  TextField,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import "./styles/LoginAndRegister.css";
import { buttonStyles } from "../../utils/styles";
import { parseInput } from "../../utils/parseData";
import {
  useLoginMutation,
  useRegisterMutation,
  useSubmitExperienceMutation,
} from "../../state/apiSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../state/authSlice";

export const Register = () => {
  const fullnameRef = useRef();
  const [userData, setUserData] = useState({
    fullname: "",
    email: "",
    password: "",
    isJobSicker: true,
  });
  const [experiences, setExeperiences] = useState("");
  const { email, password, fullname, isJobSicker } = userData;
  const [sendRegister] = useRegisterMutation();
  const [sendLogin] = useLoginMutation();
  const [submitExperiences] = useSubmitExperienceMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [errors, setErrors] = useState({});

  const handleExperiencesChange = (e) => {
    setExeperiences(e.target.value);
  };

  const handleInput = (e) => {
    const { name, value, type, checked } = e.target;
    setUserData({
      ...userData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (email === "") {
      newErrors.email = "Email is required";
    }
    if (password === "") {
      newErrors.password = "Password is required";
    }
    if (fullname === "") {
      newErrors.fullname = "Full name is required";
    }

    // tapasztalatok eltárolása
    let parseData = [];
    if (isJobSicker) {
      try {
        parseData = parseInput(experiences);
      } catch (e) {
        newErrors.experiences = "Wrong format for experiences!";
      }
    }

    setErrors(newErrors);
    if (Object.values(newErrors).length > 0) {
      return;
    }

    // előállítjük a regisztrációs szükséges formátumban az adatokat
    const credentials = {
      email,
      password,
      fullname,
      role: isJobSicker ? "jobseeker" : "company",
    };

    // regisztráció
    try {
      await sendRegister(credentials).unwrap();

      try {
        // sikeres regisztráció után megpróbálunk bejelentkezni
        const payload = await sendLogin({
          email: credentials.email,
          password: credentials.password,
          strategy: "local",
        }).unwrap();

        // eltároljuk az alkalmazás állapotterében is a bejelentkezett adatokat
        dispatch(
          login({
            user: payload.user,
            token: payload.accessToken,
          })
        );

        // ha sikeres volt a bejelentkezés is, eltároljuk a felhasználó tapasztalatait,
        // ha szükséges
        if (isJobSicker && parseData.length > 0) {
          try {
            await submitExperiences({
              experience: parseData,
              token: payload.accessToken,
            }).unwrap();
          } catch (error) {
            const newErrors = {};
            newErrors.auth =
              "Something went wrong, failed to store experiences";
            setErrors(newErrors);
          }
        }

        // sikeres bejelentkezés után a kezdőlapra navigálunk
        navigate("/", {
          replace: true,
          state: { message: "Registration and login successful!" },
        });
      } catch (loginError) {
        // login error
        const newErrors = {};
        newErrors.auth =
          "Something went wrong, registration was successful, but failed to login!";
        setErrors(newErrors);
      }
    } catch (registerError) {
      // regisztráció error
      const newErrors = {};
      newErrors.auth = "Something went wrong, failed to register!";
      setErrors(newErrors);
    }
  };

  // focus on load
  useEffect(() => {
    fullnameRef.current.focus();
  }, []);

  return (
    <div className="wrapper">
      <div className="header-wrapper">
        <h1>Regisztráció</h1>
      </div>
      <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
          <div>
            <TextField
              onInput={handleInput}
              inputRef={fullnameRef}
              type="text"
              id="fullname"
              name="fullname"
              value={fullname}
              label="Teljes név"
              variant="outlined"
              size="small"
              error={!!errors.fullname}
              helperText={errors.fullname}
              style={{ marginBottom: "25px", width: "100%" }} // Adds margin-bottom
            />
          </div>
          <div>
            <TextField
              onInput={handleInput}
              type="text"
              id="email"
              name="email"
              value={email}
              label="Email-cím"
              variant="outlined"
              size="small"
              error={!!errors.email}
              helperText={errors.email}
              style={{ marginBottom: "25px", width: "100%" }} // Adds margin-bottom
            />
          </div>
          <div>
            <TextField
              onInput={handleInput}
              type="password"
              id="password"
              name="password"
              value={password}
              label="Jelszó"
              variant="outlined"
              size="small"
              error={!!errors.password}
              helperText={errors.password}
              style={{ marginBottom: "25px", width: "100%" }} // Adds margin-bottom
            />
          </div>
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            style={{ marginBottom: "15px" }}
          >
            <Typography>Munkáltató</Typography>
            <Switch
              inputProps={{ "aria-label": "ant design" }}
              onChange={handleInput}
              name="isJobSicker"
              checked={isJobSicker}
            />
            <Typography>Munkavállaló</Typography>
          </Stack>
          {isJobSicker && (
            <div>
              <TextareaAutosize
                value={experiences}
                onInput={handleExperiencesChange}
                aria-label="minimum height"
                minRows={3}
                placeholder="Munkatapasztalat"
                style={{
                  resize: "none",
                  width: "100%",
                  background: "white",
                  color: "black",
                  marginBottom: "25px",
                }}
              />
            </div>
          )}
          <div>
            <Button
              variant="outlined"
              className="nav-button"
              type="submit"
              sx={{
                ...buttonStyles,
                "&:hover": {
                  borderColor: "#fff",
                  backgroundColor: "#6b6d6e",
                },
              }}
            >
              Regisztráció
            </Button>
          </div>
        </form>
      </div>
      {errors.experiences && (
        <div className="error-wrapper">{errors.experiences}</div>
      )}
      {errors.auth && <div className="error-wrapper">{errors.auth}</div>}
    </div>
  );
};
