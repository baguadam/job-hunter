/* eslint-disable react/prop-types */
import { Box, Card, Modal, Typography } from "@mui/material";
import { modalStyle } from "../../../utils/styles";
import { useSelector } from "react-redux";
import { selectAuthToken } from "../../../state/authSlice";
import { useGetApplicantsQuery } from "../../../state/apiSlice";

export const ApplicantsModal = ({ isOpen, onClose, jobId }) => {
  const token = useSelector(selectAuthToken);
  const { data, isFetching } = useGetApplicantsQuery({
    jobId,
    token,
  });

  if (isFetching) {
    return <p>Loading...</p>;
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
            Az állásra jelentkezettek:
          </Typography>
          {data.map((applicant, id) => (
            <Card sx={{ margin: "20px", padding: "15px" }} key={id}>
              <b>{applicant.user.fullname}</b>
            </Card>
          ))}
        </Box>
      </Modal>
    </>
  );
};
