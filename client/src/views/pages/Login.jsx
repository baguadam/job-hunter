import { Button, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../../state/apiSlice";
import { useNavigate } from "react-router-dom";
import { login } from "../../state/authSlice";
import "./styles/LoginAndRegister.css";
import { buttonStyles } from "../../utils/styles";

const Login = () => {
  const emailRef = useRef();
  const dispatch = useDispatch();
  const [sendLogin] = useLoginMutation();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const { email, password } = credentials;
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const handleInput = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
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
    setErrors(newErrors);

    if (Object.values(newErrors).length > 0) {
      return;
    }

    // bejelentkezés: először elküldjük az endpointra a megadott adatokat
    await sendLogin(credentials)
      .unwrap()
      .then((payload) => {
        // eltároljuk a user adatait: maga a user, illetva a token
        dispatch(
          login({
            user: payload.user,
            token: payload.accessToken,
          })
        );

        // visszanavigálunk a főoldalra
        navigate("/", { replace: true });
      })
      .catch(() => {
        // ha sikertelen volt a bejelentkezés, eltároljuk a hibát
        const newErrors = {};
        newErrors.auth = "Failed to login: wrong email or password";
        setErrors(newErrors);
      });
  };

  // focus on load
  useEffect(() => {
    emailRef.current.focus();
  }, []);

  return (
    <div className="wrapper">
      <div className="header-wrapper">
        <h1>Bejelentkezés</h1>
      </div>
      <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
          <div>
            <TextField
              onInput={handleInput}
              inputRef={emailRef}
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
              Bejelentkezés
            </Button>
          </div>
        </form>
      </div>
      {errors.auth && <div className="error-wrapper">{errors.auth}</div>}
    </div>
  );
};

export default Login;
