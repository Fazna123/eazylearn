import React, { useState } from "react";
import { Modal, Box, TextField, Button } from "@mui/material";
import swal from "sweetalert";
import { BASE_URL } from "../../utils/api";

type RejectionModalProps = {
  open: boolean;
  handleClose: () => void;
  email: string;
  courseName: string;
};

const RejectionModal = ({
  open,
  handleClose,
  email,
  courseName,
}: RejectionModalProps) => {
  const [reason, setReason] = useState("");

  const handleReasonChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReason(event.target.value);
  };

  const handleSubmit = async () => {
    if (reason.trim()) {
      try {
        console.log(email, courseName, reason);
        const response = await fetch(
          `${BASE_URL}/api/user/send-rejection-email`,
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, courseName, reason }),
          }
        );
        console.log(response);
        if (response.ok) {
          swal("Email sent successfully!", { icon: "success" });
          handleClose();
        } else {
          throw new Error("Failed to send email");
        }
      } catch (error) {
        console.error("Error sending email:", error);
        swal("Failed to send email!", { icon: "error" });
      }
    } else {
      swal("Please enter a reason for rejection.");
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          p: 4,
          backgroundColor: "white",
          margin: "auto",
          marginTop: "20vh",
          maxWidth: "400px",
          borderRadius: "8px",
        }}
      >
        {/* <h2>Reason for Rejection</h2> */}
        <TextField
          label="Enter Rejection Reason..."
          fullWidth
          multiline
          rows={4}
          value={reason}
          onChange={handleReasonChange}
          variant="outlined"
        />
        <Box mt={2} display="flex" justifyContent="space-between">
          <Button onClick={handleClose} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" color="secondary">
            Submit
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default RejectionModal;
