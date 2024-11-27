import { useState } from "react";
import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme"; // Same color tokens as used in Event component

const Signup = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);  // Get the colors from the theme

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [selectedRole, setSelectedRole] = useState("Admin");  // Default role is 'viewer'

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRoleSelect = (role) => {
    setSelectedRole(role);  // Update selected role when clicked
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add role to formData before submission
    const requestBody = { ...formData, role: selectedRole };
    // Handle form submission logic here (API call or other)
    console.log(requestBody); // This will log the data, including the selected role.
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "87vh",
        backgroundColor: colors.primary[400], // Using the same background color as Events
        padding: "20px",
      }}
    >
      <Typography variant="h4" sx={{ color: colors.greenAccent[500], marginBottom: "20px" }}>
        Sign Up
      </Typography>

      <Box
        sx={{
          backgroundColor: colors.primary[500], // Same primary color used in Events component
          padding: "30px",
          borderRadius: "10px",
          boxShadow: 3,
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            name="name"
            variant="outlined"
            fullWidth
            value={formData.username}
            onChange={handleChange}
            sx={{
              marginBottom: "15px",
              input: {
                color: colors.greenAccent[500], // Input text color
              },
              label: {
                color: colors.greenAccent[500], // Label color
              },
            }}
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            variant="outlined"
            fullWidth
            value={formData.email}
            onChange={handleChange}
            sx={{
              marginBottom: "15px",
              input: {
                color: colors.greenAccent[500], // Input text color
              },
              label: {
                color: colors.greenAccent[500], // Label color
              },
            }}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            variant="outlined"
            fullWidth
            value={formData.password}
            onChange={handleChange}
            sx={{
              marginBottom: "15px",
              input: {
                color: colors.greenAccent[500], // Input text color
              },
              label: {
                color: colors.greenAccent[500], // Label color
              },
            }}
          />

          {/* Role Selection */}
          <Typography variant="h6" sx={{ color: colors.greenAccent[500], marginBottom: "10px" }}>
            Select your Role
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: "10px",
              marginBottom: "20px",
            }}
          >
            {["Admin", "Sub Admin", ].map((role) => (
              <Button
                key={role}
                onClick={() => handleRoleSelect(role)}
                sx={{
                  backgroundColor: selectedRole === role ? colors.greenAccent[500] : colors.primary[300],
                  color: selectedRole === role ? colors.primary[100] : colors.greenAccent[500],
                  "&:hover": {
                    backgroundColor: selectedRole === role ? colors.greenAccent[600] : colors.primary[400],
                  },
                  padding: "10px 20px",
                  borderRadius: "5px",
                }}
              >
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </Button>
            ))}
          </Box>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: colors.greenAccent[500], // Button color
              "&:hover": {
                backgroundColor: colors.greenAccent[600], // Hover effect
              },
              color: colors.primary[100], // Button text color
            }}
          >
            Sign Up
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default Signup;
