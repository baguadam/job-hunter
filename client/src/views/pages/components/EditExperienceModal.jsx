/* eslint-disable react/prop-types */
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { modalStyle } from "../../../utils/styles";
import { useEffect, useState } from "react";

export const EditExperienceModal = ({
  isOpen,
  onClose,
  onSubmit,
  experience,
  errors,
}) => {
  const [formState, setFormState] = useState({
    company: experience.company,
    title: experience.title,
    interval: experience.interval,
  });

  useEffect(() => {
    setFormState({
      company: experience.company,
      title: experience.title,
      interval: experience.interval,
    });
  }, [experience]);

  const handleFilterChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  if (!experience) {
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
            Munkatapasztalat módosítása
          </Typography>
          <div style={{ display: "flex" }}>
            <form
              style={{ width: "100%", padding: "0px" }}
              onSubmit={(e) => onSubmit(e, formState)}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <TextField
                  onInput={handleFilterChange}
                  type="text"
                  id="company"
                  name="company"
                  value={formState.company}
                  label="Cég"
                  variant="outlined"
                  size="small"
                  error={!!errors.company}
                  helperText={errors.company}
                  style={{ marginBottom: "25px", width: "100%" }} // Adds margin-bottom
                />
                <TextField
                  onInput={handleFilterChange}
                  type="text"
                  id="title"
                  name="title"
                  value={formState.title}
                  label="Pozíció"
                  variant="outlined"
                  size="small"
                  error={!!errors.title}
                  helperText={errors.title}
                  style={{ marginBottom: "25px", width: "100%" }} // Adds margin-bottom
                />
                <TextField
                  onInput={handleFilterChange}
                  type="text"
                  id="interval"
                  name="interval"
                  value={formState.interval}
                  label="Intervallum"
                  variant="outlined"
                  size="small"
                  error={!!errors.interval}
                  helperText={errors.interval}
                  style={{ marginBottom: "25px", width: "100%" }} // Adds margin-bottom
                />
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
