/* eslint-disable react/prop-types */
import {
  Alert,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useState } from "react";
import { JobDetailModal } from "./JobDetailModal";
import { useApplyJobMutation } from "../../../state/apiSlice";
import { useSelector } from "react-redux";
import { selectAuthToken } from "../../../state/authSlice";

export const JobsTable = ({ jobs }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(null);
  const token = useSelector(selectAuthToken);
  const [applyJob] = useApplyJobMutation();

  // HANDLERS
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleModalOpen = (job) => {
    setSelectedJob(job);
    setIsOpen(true);
  };
  const handleModalClose = () => setIsOpen(false);

  const handleApplyClick = async () => {
    setSnackbarOpen(true);
    try {
      await applyJob({ jobId: selectedJob.id, token }).unwrap();

      setSnackbarMessage({
        type: "success",
        message: "Successful application",
      });
    } catch (e) {
      setSnackbarMessage({
        type: "error",
        message: "Something went wrong, failed to apply!",
      });
    }
  };

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <Table sx={{ minWidth: 650, width: "60%" }} aria-label="caption table">
          <caption>Az elréhető állások listája</caption>
          <TableHead>
            <TableRow>
              <TableCell>Állás neve</TableCell>
              <TableCell align="right">Extrák</TableCell>
              <TableCell align="right">Bérezés</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jobs.map((job) => (
              <TableRow
                key={job.id}
                sx={{
                  "&:hover": {
                    cursor: "pointer",
                    backgroundColor: "rgba(0, 0, 0, 0.04)", // optional: adds a background color on hover
                  },
                }}
                onClick={() => handleModalOpen(job)}
              >
                <TableCell component="th" scope="row">
                  <b>
                    {job.position} ({job.company})
                  </b>
                  <br />
                  {job.city}
                </TableCell>
                <TableCell align="right">
                  {job.homeOffice ? "Home Office" : ""}
                </TableCell>
                <TableCell align="right">
                  <b>{`${job.salaryFrom} - ${job.salaryTo} Ft`}</b>
                  <br />
                  {`${job.type}`}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <JobDetailModal
        isOpen={isOpen}
        onClose={handleModalClose}
        selectedJob={selectedJob}
        onApply={handleApplyClick}
      />

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
