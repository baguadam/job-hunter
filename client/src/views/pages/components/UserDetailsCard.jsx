import {
  Alert,
  Box,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { selectAuthToken, selectLoggedInUser } from "../../../state/authSlice";
import {
  useGetExperiencesQuery,
  useModifyExperienceMutation,
} from "../../../state/apiSlice";
import { useState } from "react";
import { EditExperienceModal } from "./EditExperienceModal";

export const UserDetailsCard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(null);

  const currentUser = useSelector(selectLoggedInUser);
  const token = useSelector(selectAuthToken);
  const { data: experiences, isFetching } = useGetExperiencesQuery({ token });
  const [modifyExperience] = useModifyExperienceMutation();

  // HANDLERS
  const handleModalOpen = (exp) => {
    setSelectedExperience(exp);
    setIsOpen(true);
  };

  const handleModalClose = () => setIsOpen(false);

  const handleModifyExperience = async (e, formState) => {
    e.preventDefault();

    const newErrors = {};
    if (formState.company === "") {
      newErrors.company = "Company is required";
    }
    if (formState.title === "") {
      newErrors.title = "Title is required";
    }
    if (formState.interval === "") {
      newErrors.interval = "Interval is required";
    }
    const intervalPattern = /^\d{4}-(\d{4})?$/;
    if (!intervalPattern.test(formState.interval)) {
      newErrors.interval = "Interval doesn't match the expected pattern!";
    }

    setErrors(newErrors);
    if (Object.values(newErrors).length > 0) {
      return;
    }

    setSnackbarOpen(true);
    try {
      const { id } = selectedExperience;
      await modifyExperience({ experience: formState, id, token }).unwrap();

      setSnackbarMessage({
        type: "success",
        message: "Experience modified successfully!",
      });
    } catch (e) {
      setSnackbarMessage({
        type: "error",
        message: "Failed to modify experience!",
      });
    }
    handleModalClose();
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  if (isFetching) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Paper
        elevation={3}
        sx={{
          padding: 2,
          alignItems: "center",
          border: "1px solid black",
          width: "70%",
          margin: "15px",
        }}
      >
        <Box>
          <Typography variant="h4" component="h2">
            Személyes adatok
          </Typography>
          <Typography sx={{ mb: 2 }}>
            Adataid és tapasztalataid egy helyen
          </Typography>
          <TableContainer
            component={Paper}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Table
              sx={{ minWidth: 650, width: "60%" }}
              aria-label="caption table"
            >
              <caption>Az elréhető állások listája</caption>
              <TableBody>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    Név
                  </TableCell>
                  <TableCell align="right">
                    <b>{currentUser.fullname}</b>
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    Email-cím
                  </TableCell>
                  <TableCell align="right">
                    <b>{currentUser.email}</b>
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    Státusz
                  </TableCell>
                  <TableCell align="right">
                    <b>
                      {currentUser.role === "company" ? "Cég" : "Munkakereső"}
                    </b>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          {experiences.length > 0 && (
            <>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                sx={{ mt: 2 }}
              >
                Korábbi tapasztalatok
              </Typography>
              <Typography id="modal-modal-description" sx={{ mb: 2 }}>
                Szerkesztés kattints a kívánt sorra!
              </Typography>
              <TableContainer
                component={Paper}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Table
                  sx={{ minWidth: 650, width: "60%" }}
                  aria-label="caption table"
                >
                  <TableBody>
                    {experiences.map((exp) => (
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                          "&:hover": {
                            cursor: "pointer",
                            backgroundColor: "rgba(0, 0, 0, 0.04)", // optional: adds a background color on hover
                          },
                        }}
                        key={exp.id}
                        onClick={() => handleModalOpen(exp)}
                      >
                        <TableCell component="th" scope="row">
                          {exp.company}
                        </TableCell>
                        <TableCell align="right">
                          <b>
                            {exp.interval} | {exp.title}
                          </b>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
        </Box>
      </Paper>
      {selectedExperience && (
        <EditExperienceModal
          isOpen={isOpen}
          onClose={handleModalClose}
          experience={selectedExperience}
          onSubmit={handleModifyExperience}
          errors={errors}
        />
      )}

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
    </>
  );
};
