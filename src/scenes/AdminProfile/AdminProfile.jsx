import React from 'react';
import { useTheme, Button, Card, CardContent, CardHeader, Container, Grid, Typography, TextField } from '@mui/material';
import { tokens } from "../../theme";
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';

const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  boxShadow: theme.shadows[5],
}));

const AdminProfile = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <>
      {/* Page content */}
      <Container sx={{ padding: 7, height:"87vh",overflowY:"auto"}}>
        <Grid container spacing={3}>
          {/* Profile Image */}
          <Grid item xs={12} md={4} >
            <StyledCard >
              <CardContent style={{ backgroundColor: colors.primary[400]}}>
                <Grid container justifyContent="center" >
                  <Grid item>
                    <Avatar
                      alt="Profile Picture"
                      src="https://media.istockphoto.com/id/1682296067/photo/happy-studio-portrait-or-professional-man-real-estate-agent-or-asian-businessman-smile-for.webp?b=1&s=170667a&w=0&k=20&c=V-RXoAk73ljzQZd0w_JcCFG-jlYs6sjpcrIZQ1TersQ="
                      sx={{ width: 120, height: 120 }}
                    />
                  </Grid>
                </Grid>
                <CardHeader style={{color:"#4CCEAC"}}
                  title="Jessica Jones"
                  subheader="Solution Manager - Creative Tim Officer"
                  sx={{ textAlign: 'center', mt: 2 }}
                />
                <Typography variant="body2" color="text.secondary" align="center">
                  Bucharest, Romania
                </Typography>
                <Typography variant="body2" color="text.secondary" align="center">
                  University of Computer Science
                </Typography>
                <Typography variant="body2" color="text.secondary" align="center" mt={2}>
                  Ryan — the name taken by Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs and records all of his own music.
                </Typography>
                <Button variant="contained" color="info" fullWidth sx={{ mt: 2 }}>
                  Connect
                </Button>
                <Button variant="contained" color="info" fullWidth sx={{ mt: 1 }} style={{background:"rgb(41,182,246)"}}>
                  Message
                </Button>
              </CardContent>
            </StyledCard>
          </Grid>

          {/* User Info */}
          <Grid item xs={12} md={8} >
            <StyledCard style={{backgroundColor: colors.primary[400]}}>
              <CardHeader style={{color:"#4CCEAC"}}
                title="My account"
                action={
                  <Button variant="contained" color="primary" size="small" style={{background:"rgb(41,182,246)"}}>
                    Settings
                  </Button>
                }
              />
              <CardContent>
                <Typography variant="h6" gutterBottom style={{color:"#4CCEAC"}}>
                  User information
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Username"
                      defaultValue="lucky.jesse"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email address"
                      defaultValue="jesse@example.com"
                      variant="outlined"
                      type="email"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="First name"
                      defaultValue="Lucky"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Last name"
                      defaultValue="Jesse"
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
                <Typography variant="h6" gutterBottom sx={{ mt: 4 }} style={{color:"#4CCEAC"}}>
                  Contact information
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Address"
                      defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="City"
                      defaultValue="New York"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="Country"
                      defaultValue="United States"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="Postal code"
                      defaultValue=""
                      variant="outlined"
                      type="number"
                    />
                  </Grid>
                </Grid>
                <Typography variant="h6" gutterBottom sx={{ mt: 4 }} style={{color:"#4CCEAC"}}>
                  About me
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  placeholder="A few words about you ..."
                  defaultValue="A beautiful Dashboard for Bootstrap 4. It is Free and Open Source."
                  variant="outlined"
                />
                <button type='submit' style={{background:"rgb(41,182,246)", border:"none", padding:"8px", width:"120px", borderRadius:"5px",  margin:"auto", display:"block", marginTop:"10px",}}>Update</button>
              </CardContent>
            </StyledCard>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default AdminProfile;
