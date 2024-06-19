import {
  Paper,
  Card,
  Typography,
  Stack,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { useSelector } from "react-redux";
import { selectAuthToken, selectLoggedInUser } from "../../../state/authSlice";
import {
  useDeleteJobMutation,
  useGetRelatedJobQuery,
  useUpdateJobMutation,
} from "../../../state/apiSlice";
import { useState } from "react";
import { Link } from "react-router-dom";
import { EditJobModal } from "./EditJobModal";
import { ApplicantsModal } from "./ApplicantsModal";

export const CompanyDetailsCard = () => {
  const currentUser = useSelector(selectLoggedInUser);
  const [deleteJob] = useDeleteJobMutation();
  const [updateJob] = useUpdateJobMutation();
  const token = useSelector(selectAuthToken);
  const { id } = currentUser;
  const { data, isFetching } = useGetRelatedJobQuery({
    userId: id,
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedJobForApplicant, setSelectedJobForApplicant] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isApplicationsModalOpen, setIsApplicantsModalOpen] = useState(false);
  const [errors, setErrors] = useState({});

  // HANDLERS
  const handleApplicantsModalOpen = (job) => {
    setSelectedJobForApplicant(job);
    setIsApplicantsModalOpen(true);
  };

  const handleApplicantsModalClose = () => setIsApplicantsModalOpen(false);

  const handleModalOpen = (job) => {
    setSelectedJob(job);
    setIsOpen(true);
  };

  const handleModalClose = () => setIsOpen(false);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleDeleteClick = async (job) => {
    setSnackbarOpen(true);
    try {
      await deleteJob({ jobId: job.id, token }).unwrap();

      setSnackbarMessage({
        type: "success",
        message: "Successfully deleted job!",
      });
    } catch (e) {
      setSnackbarMessage({
        type: "error",
        message: "Something went wrong, failed to delete!",
      });
    }
  };

  const handleModifyJob = async (e, formState) => {
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

    setIsOpen(false);
    setSnackbarOpen(true);
    try {
      await updateJob({ id: selectedJob.id, formState, token }).unwrap();

      setSnackbarMessage({
        type: "success",
        message: "Successfully updated job!",
      });
    } catch (e) {
      setSnackbarMessage({
        type: "error",
        message: "Something went wrong, failed to update!",
      });
    }
  };

  if (isFetching) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Paper
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "20px",
        }}
      >
        {data.map((job) => (
          <Card sx={{ margin: "20px" }} key={job.id}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div className="job-details-wrapper">
                <Typography
                  variant="h5"
                  component="div"
                  sx={{ padding: "15px" }}
                >
                  <b>{job.position}</b>
                </Typography>
                <Stack direction="row" spacing={3} sx={{ padding: "15px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <WorkOutlineIcon sx={{ mr: 1 }} />{" "}
                    {job.type === "full-time"
                      ? "Teljes munkaidős"
                      : job.type === "part-time"
                      ? "Részmunkaidős"
                      : "Gyakornoki"}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <LocationOnIcon sx={{ mr: 1 }} />{" "}
                    {job.homeOffice ? "Home office" : "Irodai"}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <AttachMoneyIcon sx={{ mr: 0.5 }} />{" "}
                    {`${job.salaryFrom} - ${job.salaryTo} HuF`}
                  </div>
                </Stack>
              </div>
              <div
                className="button-wrappers"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Button
                  variant="contained"
                  sx={{ mr: 2 }}
                  onClick={() => handleModalOpen(job)}
                >
                  Szerkesztés
                </Button>
                <Button
                  variant="contained"
                  sx={{ mr: 2 }}
                  onClick={() => handleApplicantsModalOpen(job)}
                >
                  Megtekintés
                </Button>
                <Button sx={{ mr: 2 }} onClick={() => handleDeleteClick(job)}>
                  Törlés
                </Button>
              </div>
            </div>
          </Card>
        ))}

        <Typography
          component="div"
          sx={{ padding: "15px", display: "flex", justifyContent: "center" }}
        >
          <Button variant="outlined">
            <Link to="/add-job" replace>
              Hirdetés hozzáadása
            </Link>
          </Button>
        </Typography>
      </Paper>

      {selectedJob && (
        <EditJobModal
          isOpen={isOpen}
          onClose={handleModalClose}
          job={selectedJob}
          onSubmit={handleModifyJob}
          errors={errors}
        />
      )}

      {selectedJobForApplicant && (
        <ApplicantsModal
          isOpen={isApplicationsModalOpen}
          onClose={handleApplicantsModalClose}
          jobId={selectedJobForApplicant.id}
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
