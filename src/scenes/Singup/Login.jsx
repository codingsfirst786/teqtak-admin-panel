import { useState } from "react";
import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme"; // Same color tokens as used in Event component
import { useNavigate } from "react-router-dom";

const Login = () => {
  const theme = useTheme();
  const navigate = useNavigate()
  const colors = tokens(theme.palette.mode);  // Get the colors from the theme

  const [formData, setFormData] = useState({});
  const [selectedRole, setSelectedRole] = useState("Admin");  // Default role is 'viewer'

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = formData
    console.log(requestBody);
  };

  const __login__=async()=>{
    console.log("logining in");
    console.log({formData});
    
    const req = await fetch(`${process.env.REACT_APP_BACK_URL}/admin/login`,{
      method:"POST",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify(formData)
    })
    const data = await req.json()
    if(data.message=='success'){
      document.cookie=`teqtak-admin-token=${data.authtoken}`
      navigate('/')
    }
    else{
      navigate('/login')
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: colors.primary[400],
        padding: "20px",
      }}
    >

      <Box
        sx={{
          backgroundColor: colors.primary[500], // Same primary color used in Events component
          padding: "30px",
          borderRadius: "10px",
          boxShadow: 3,
          width: "100%",
          height: "50vh",
          maxWidth: "330px",
        }}
      >
        <Typography variant="h1" sx={{ color: colors.greenAccent[500], marginBottom: "20px", textAlign: "center" }}>
          Log In
        </Typography>
        <form onSubmit={handleSubmit}>
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
                color: colors.greenAccent[500],
              },
              label: {
                color: colors.greenAccent[500],
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
                color: colors.greenAccent[500], 
              },
              label: {
                color: colors.greenAccent[500], 
              },
            }}
          />


          <Button
          onClick={__login__}
            // type="submit"
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: colors.greenAccent[600], 
              "&:hover": {
                backgroundColor: colors.greenAccent[500], 
              },
              color: colors.grey[100],
            }}
          >
            Sign Up
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
