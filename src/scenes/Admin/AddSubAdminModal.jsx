import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  useTheme,
} from "@mui/material";
import { tokens } from "../../theme";
import axios from "axios";

const AddSubAdminModal = ({ open, handleClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const data = {
    email,
    password
  }
  const handleSubAdmin = async () => {
    if (!email || !password) {
      alert("Please fill in all the fields before submitting");
    } else {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BACK_URL}/admin/subadmin`,
          data
        );
        if (response.status === 200) {
          alert("Sub-Admin added successfully");
          setEmail("");
          setPassword("");
          handleClose(); 
        }
      } catch (err) {
        console.error("Error adding Sub-Admin:", err);
        alert("Failed to add Sub-Admin. Please try again.");
      }
    }
  };
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
      backgroundColor={colors.primary[400]}
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "400px",
          boxShadow: 24,
          p: 4,
          borderRadius: "8px",
        }}
      >
        <Typography variant="h4" mb={2} color= {colors.greenAccent[600]}>
          Add SubAdmin
        </Typography>
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          type="password"
          label="Password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
        />
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 2, backgroundColor:colors.greenAccent[600] }}
          onClick={handleSubAdmin}
        >
          Submit
        </Button>
      </Box>
    </Modal>
  );
};

export default AddSubAdminModal;
