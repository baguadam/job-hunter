/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import { modalStyle } from "../../../utils/styles";
import { useEffect, useState } from "react";

export const EditJobModal = ({ isOpen, onClose, onSubmit, job, errors }) => {
  const [formState, setFormState] = useState({
    company: job.company,
    position: job.position,
    type: job.type,
    city: job.city,
    description: job.description,
    salaryFrom: job.salaryFrom,
    salaryTo: job.salaryTo,
    homeOffice: job.homeOffice === 1 ? true : false,
  });

  useEffect(() => {
    setFormState({
      company: job.company,
      position: job.position,
      type: job.type,
      city: job.city,
      description: job.description,
      salaryFrom: job.salaryFrom,
      salaryTo: job.salaryTo,
      homeOffice: job.homeOffice === 1 ? true : false,
    });
  }, [job]);

  const handleInput = async (e) => {
    const { name, value, type, checked } = e.target;
    setFormState({
      ...formState,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  if (!job) {
    return;
  }

  return (
    <>
      <Modal
        open={isOpen}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ mb: 3 }}
          >
            Álláshirdetés módosítása
          </Typography>
          <div style={{ display: "flex" }}>
            <form
              style={{ width: "100%", padding: "0px" }}
              onSubmit={(e) => onSubmit(e, formState)}
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
                        checked={formState.homeOffice}
                      />
                    }
                    label="Home Office lehetőség"
                  />
                </FormControl>
              </div>
              <div style={{ display: "flex", marginTop: "20px" }}>
                <Button variant="contained" type="submit">
                  Módosít
                </Button>
                <Button
                  variant="outlined"
                  onClick={onClose}
                  sx={{ marginLeft: "25px" }}
                >
                  Mégse
                </Button>
              </div>
            </form>
          </div>
        </Box>
      </Modal>
    </>
  );
};
