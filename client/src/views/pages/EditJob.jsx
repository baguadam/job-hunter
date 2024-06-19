/* eslint-disable react/prop-types */
import {
  Alert,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  TextField,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { defaultJobValues } from "../../utils/defaults";
import { useCreateJobMutation } from "../../state/apiSlice";
import { useSelector } from "react-redux";
import { selectAuthToken } from "../../state/authSlice";

export const EditJob = () => {
  const [formState, setFormState] = useState(defaultJobValues);
  const [errors, setErrors] = useState({});
  const [createJob] = useCreateJobMutation();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(null);
  const token = useSelector(selectAuthToken);

  // HANDLERS
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleInput = async (e) => {
    const { name, value, type, checked } = e.target;
    setFormState({
      ...formState,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (formState.company === "") {
      newErrors.company = "Company is required";
    }
    if (formState.position === "") {
      newErrors.position = "Position is required";
    }
    if (formState.type === "") {
      newErrors.type = "Type is required";
    }
    if (formState.city === "") {
      newErrors.city = "City is required";
    }

    if (formState.salaryFrom === "") {
      newErrors.salaryFrom = "Salary is required";
    } else if (isNaN(parseInt(formState.salaryFrom))) {
      newErrors.salaryFrom = "Salary must be a number";
    }

    if (formState.salaryTo === "") {
      newErrors.salaryTo = "Salary is required";
    } else if (isNaN(parseInt(formState.salaryTo))) {
      newErrors.salaryTo = "Salary must be a number";
    }

    setErrors(newErrors);
    if (Object.values(newErrors).length > 0) {
      return;
    }

    setSnackbarOpen(true);
    try {
      await createJob({ formState, token }).unwrap();

      setSnackbarMessage({
        type: "success",
        message: "Successfully created job!",
      });
    } catch (e) {
      setSnackbarMessage({
        type: "error",
        message: "Something went wrong, failed to create!",
      });
    }
  };

  return (
    <div className="wrapper">
      <div className="header-wrapper">
        <h1>Álláshirdetés hozzáadása</h1>
      </div>
      <div
        style={{ margin: "15px", display: "flex", justifyContent: "center" }}
      >
        <Paper sx={{ width: "60%", margin: "15px", padding: "15px" }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Álláshirdetés adatai
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2, mb: 2 }}>
            Töltse ki a mezőket az álláshirdetés adataival!
          </Typography>
          <div style={{ display: "flex" }}>
            <form
              style={{ width: "100%", padding: "0px" }}
              onSubmit={handleSubmit}
            >
              <div style={{ display: "flex" }}>
                <TextField
                  onChange={handleInput}
                  type="text"
                  id="company"
                  name="company"
                  value={formState.company}
                  label="Cégnév"
                  variant="outlined"
                  size="small"
                  style={{ marginRight: "25px", width: "100%" }} // Adds margin-bottom
                  error={!!errors.company}
                  helperText={errors.company}
                />
                <TextField
                  onChange={handleInput}
                  type="text"
                  id="position"
                  name="position"
                  value={formState.position}
                  label="Pozíció"
                  variant="outlined"
                  size="small"
                  style={{ marginBottom: "25px", width: "100%" }} // Adds margin-bottom
                  error={!!errors.position}
                  helperText={errors.position}
                />
              </div>
              <div style={{ marginBottom: "20px" }}>
                <FormControl fullWidth>
                  <InputLabel id="type">Foglalkozás típusa</InputLabel>
                  <Select
                    onChange={handleInput}
                    labelId="type"
                    id="type"
                    name="type"
                    value={formState.type}
                    label="Foglalkozás típusa"
                    size="small"
                    error={!!errors.type}
                    helperText={errors.type}
                  >
                    <MenuItem value="full-time">Teljes munkaidő</MenuItem>
                    <MenuItem value="part-time">Részmunkaidő</MenuItem>
                    <MenuItem value="internship">Gyakornok</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div style={{ marginBottom: "20px" }}>
                <FormControl fullWidth>
                  <TextField
                    onChange={handleInput}
                    type="text"
                    id="city"
                    name="city"
                    value={formState.city}
                    label="Település"
                    variant="outlined"
                    size="small"
                    style={{ width: "100%" }} // Adds margin-bottom
                    error={!!errors.city}
                    helperText={errors.city}
                  />
                </FormControl>
              </div>
              <div>
                <TextareaAutosize
                  onChange={handleInput}
                  value={formState.description}
                  aria-label="minimum height"
                  name="description"
                  minRows={3}
                  placeholder="Leírás"
                  style={{
                    resize: "none",
                    width: "99%",
                    background: "white",
                    color: "black",
                    marginBottom: "25px",
                  }}
                />
              </div>
              <div style={{ display: "flex" }}>
                <TextField
                  onChange={handleInput}
                  type="number"
                  id="salary-from"
                  name="salaryFrom"
                  value={formState.salaryFrom}
                  label="Fizetés sáv alja"
                  variant="outlined"
                  size="small"
                  style={{ marginRight: "25px", width: "100%" }} // Adds margin-bottom
                  error={!!errors.salaryFrom}
                  helperText={errors.salaryFrom}
                />
                <TextField
                  onChange={handleInput}
                  type="number"
                  id="salary-to"
                  name="salaryTo"
                  value={formState.salaryTo}
                  label="Fizetés sáv teteje"
                  variant="outlined"
                  size="small"
                  style={{ marginRight: "25px", width: "100%" }} // Adds margin-bottom
                  error={!!errors.salaryTo}
                  helperText={errors.salaryTo}
                />
                <FormControl fullWidth>
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={handleInput}
                        name="homeOffice"
                        value={formState.homeOffice}
                      />
                    }
                    label="Home Office lehetőség"
                  />
                </FormControl>
              </div>
              <div style={{ display: "flex", marginTop: "20px" }}>
                <Button variant="contained" type="submit">
                  Szerkesztés
                </Button>
              </div>
            </form>
          </div>
        </Paper>
      </div>

      {/* Snackbar a kérés sikerességének/sikertelenségének kijelzésére */}
      {snackbarMessage && (
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity={snackbarMessage.type}
            sx={{ width: "100%" }}
          >
            {snackbarMessage.message}
          </Alert>
        </Snackbar>
      )}
    </div>
  );
};
