import React, { useEffect, useState } from 'react';
import { useTheme, Button, Card, CardContent, CardHeader, Container, Grid, Typography, TextField } from '@mui/material';
import { tokens } from "../../theme";
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import { fetchAdminData } from '../../Api/Admin/Admin';
import axios from 'axios';


const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  boxShadow: theme.shadows[5],
}));

const AdminProfile = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [admin, setAdmin] = useState([])
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    const getResponse = async () => {
      const response = await fetchAdminData()
      setAdmin(response)
    }
    getResponse()
  }, [refresh])

  // Form Data For Profile 
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    country: "",
    postalCode: "",
    aboutMe: "",
  });

  const handleChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  //  Update Profile 
  const handleSubmit = async () => {
    const isFormValid = Object.values(formData).every((value) => value.trim() !== "");

    if (!isFormValid) {
      alert("Please fill in all the fields.");
      return;
    }
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACK_URL}/admin/profile/update`,
        formData
      );
      if (response.status === 200) {
        alert("Profile updated successfully");
        setRefresh(!refresh)
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile");
    }
  };

  return (
    <>
      {/* Page content */}
      <Container sx={{ padding: 7, height: "87vh", overflowY: "auto" }}>
        <Grid container spacing={3}>
          {/* Profile Image */}
          <Grid item xs={12} md={4} >
            <StyledCard >
              <CardContent style={{ backgroundColor: colors.primary[400] }}>
                <Grid container justifyContent="center" >
                  <Grid item>
                    <Avatar
                      alt="Profile Picture"
                      src="https://media.istockphoto.com/id/1682296067/photo/happy-studio-portrait-or-professional-man-real-estate-agent-or-asian-businessman-smile-for.webp?b=1&s=170667a&w=0&k=20&c=V-RXoAk73ljzQZd0w_JcCFG-jlYs6sjpcrIZQ1TersQ="
                      sx={{ width: 120, height: 120 }}
                    />
                  </Grid>
                </Grid>
                <CardHeader style={{ color: "#4CCEAC" }}
                  title={`${admin.firstName} ${admin.lastName}`}
                  sx={{ textAlign: 'center', mt: 3 }}
                />
                <Typography variant="body2" color="text.secondary" align="center" mt={2}>
                  {admin.userName}
                </Typography>
                <Typography variant="body2" color="text.secondary" align="center">
                  {admin.email}, {admin.country}
                </Typography>
                <Typography variant="body2" color="text.secondary" align="center" mt={2}>
                  {admin.address}
                </Typography>
                <Typography variant="body2" color="text.secondary" align="center">
                  {admin.city}, {admin.country}
                </Typography>
                <Typography variant="body2" color="text.secondary" align="center" mt={3}>
                  {admin.aboutMe}
                </Typography>
              </CardContent>
            </StyledCard>
          </Grid>

          {/* User Info */}
          <Grid item xs={12} md={8}>
            <div style={{ backgroundColor: colors.primary[400], padding: "20px", borderRadius: "8px" }}>
              <CardHeader
                style={{ color: "#4CCEAC" }}
                title="My Account"
                sx={{ textAlign: "center", mt: 3 }}
              />
              <CardContent>
                <Typography
                  variant="h6"
                  gutterBottom
                  style={{ color: "#4CCEAC" }}
                >
                  User Information
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Username"
                      value={formData.username}
                      onChange={handleChange("username")}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email address"
                      value={formData.email}
                      onChange={handleChange("email")}
                      variant="outlined"
                      type="email"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="First name"
                      value={formData.firstName}
                      onChange={handleChange("firstName")}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Last name"
                      value={formData.lastName}
                      onChange={handleChange("lastName")}
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ mt: 4 }}
                  style={{ color: "#4CCEAC" }}
                >
                  Contact Information
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Address"
                      value={formData.address}
                      onChange={handleChange("address")}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="City"
                      value={formData.city}
                      onChange={handleChange("city")}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="Country"
                      value={formData.country}
                      onChange={handleChange("country")}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="Postal code"
                      value={formData.postalCode}
                      onChange={handleChange("postalCode")}
                      variant="outlined"
                      type="number"
                    />
                  </Grid>
                </Grid>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ mt: 4 }}
                  style={{ color: "#4CCEAC" }}
                >
                  About Me
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="About Me"
                  value={formData.aboutMe}
                  onChange={handleChange("aboutMe")}
                  variant="outlined"
                />
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "rgb(41,182,246)",
                    color: "#fff",
                    display: "block",
                    marginTop: "10px",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                  onClick={handleSubmit}
                >
                  Update
                </Button>
              </CardContent>
            </div>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default AdminProfile;
