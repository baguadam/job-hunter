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
  Typography,
} from "@mui/material";
import { modalStyle } from "../../../utils/styles";
import { defaultFilters } from "../../../utils/defaults";
import { useState } from "react";

export const FilterModal = ({ isOpen, onClose, onSubmit }) => {
  const [formState, setFormState] = useState(defaultFilters);

  const handleFilterChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    });
  };

  return (
    <>
      <Modal
        open={isOpen}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Szűrök kiválasztása
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2, mb: 2 }}>
            Válasszon a lehetséges szűrők közül
          </Typography>
          <div style={{ display: "flex" }}>
            <form
              style={{ width: "100%", padding: "0px" }}
              onSubmit={(e) => onSubmit(e, formState)}
            >
              <div style={{ display: "flex" }}>
                <TextField
                  onInput={handleFilterChange}
                  type="number"
                  id="salary-from"
                  name="salaryFrom"
                  value={formState.salaryFrom}
                  label="Fizetés sáv alja"
                  variant="outlined"
                  size="small"
                  style={{ marginRight: "25px", width: "100%" }} // Adds margin-bottom
                />
                <TextField
                  onInput={handleFilterChange}
                  type="number"
                  id="salary-to"
                  name="salaryTo"
                  value={formState.salaryTo}
                  label="Fizetés sáv teteje"
                  variant="outlined"
                  size="small"
                  style={{ marginBottom: "25px", width: "100%" }} // Adds margin-bottom
                />
              </div>
              <div style={{ marginBottom: "20px" }}>
                <FormControl fullWidth>
                  <InputLabel id="type">Foglalkozás típusa</InputLabel>
                  <Select
                    labelId="type"
                    id="type"
                    name="type"
                    value={formState.type}
                    label="Foglalkozás típusa"
                    onChange={handleFilterChange}
                    size="small"
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
                    type="text"
                    id="city"
                    name="city"
                    value={formState.city}
                    onChange={handleFilterChange}
                    label="Település"
                    variant="outlined"
                    size="small"
                    style={{ width: "100%" }} // Adds margin-bottom
                  />
                </FormControl>
              </div>
              <div>
                <FormControl fullWidth>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="homeOffice"
                        value={formState.homeOffice}
                        onChange={handleFilterChange}
                      />
                    }
                    label="Home Office lehetőség"
                  />
                </FormControl>
              </div>
              <div style={{ display: "flex", marginTop: "20px" }}>
                <Button variant="contained" type="submit">
                  Alkalmaz
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
