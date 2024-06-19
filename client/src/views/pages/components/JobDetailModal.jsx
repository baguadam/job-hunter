/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Card,
  Chip,
  Divider,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import { modalStyle } from "../../../utils/styles";
import { useAuth } from "../../auth/AuthContext";

export const JobDetailModal = ({ isOpen, onClose, selectedJob, onApply }) => {
  const { isAuthenticatedAsJobseeker } = useAuth();

  if (!selectedJob) {
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
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Cég részletei
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2, mb: 2 }}>
            Ha megtetszett az álláshirdetés, jelentkezz!
          </Typography>
          <Typography id="modal-modal-job-details" sx={{ mt: 2, mb: 2 }}>
            <Card variant="outlined" sx={{ maxWidth: 400 }}>
              <Box sx={{ p: 2 }}>
                <Typography gutterBottom variant="h5" component="div">
                  {selectedJob.position}
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                  {selectedJob.company}
                </Typography>
                <Typography color="text.secondary" variant="body2">
                  {selectedJob.description}
                </Typography>
              </Box>
              <Divider />
              <Box sx={{ p: 2 }}>
                <Typography gutterBottom variant="h7" component="div">
                  <b>Bérezés: </b>
                  Bruttó {selectedJob.salaryFrom} - {selectedJob.salaryTo}
                </Typography>
                <Typography gutterBottom variant="h7" component="div">
                  <b>Település: </b>
                  {selectedJob.city}
                </Typography>
                <Typography gutterBottom variant="h7" component="div">
                  <b>Foglalkozás típusa: </b>
                  {selectedJob.type}
                </Typography>
              </Box>
              <Divider />
              <Box sx={{ p: 2 }}>
                <Stack direction="row" spacing={1}>
                  <Chip
                    color="primary"
                    label={selectedJob.homeOffice ? "Home Office" : "Irodai"}
                    size="small"
                  />
                </Stack>
              </Box>
            </Card>
          </Typography>
          {isAuthenticatedAsJobseeker && (
            <Button variant="outlined" onClick={onApply}>
              Jelentkezés!
            </Button>
          )}
        </Box>
      </Modal>
    </>
  );
};
