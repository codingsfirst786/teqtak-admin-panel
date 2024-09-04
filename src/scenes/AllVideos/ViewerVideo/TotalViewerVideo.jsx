import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, IconButton, Grid, Card, CardMedia, CardActionArea } from '@mui/material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


// Data for the Videos
const videos = [
  { id: 1, src: "./video1.mp4" },
  { id: 2, src: "./video2.mp4" },
  
  { id: 1, src: "./video1.mp4" },
  { id: 2, src: "./video2.mp4" },
  
  { id: 1, src: "./video1.mp4" },
  { id: 2, src: "./video2.mp4" },
  
  
  
  { id: 3, src: "./video3.mp4" }
];

// Main Video Section for All Videos
const TotalViewerVideo = () => {
  const navigate = useNavigate();

  const HandleViewer = () => {
    navigate('/totalyViewer')
  }
  return (
    <>
      <Box padding="0px 30px">
        <Box sx={{ backgroundColor: '#1F2A40', pb: 3, height: '89vh', overflowY: 'auto', overflowX: 'hidden', mt: 1 }} style={{
          'WebkitOverflowScrolling': 'touch',
          'WebkitScrollbar': {
            display: 'none'
          },
          '-msOverflowStyle': 'none',
          'scrollbarWidth': 'none'
        }}>
          <Box display="flex" alignItems="center" >
            <IconButton onClick={HandleViewer}>
              <ArrowBackIcon />
            </IconButton>
          </Box>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', my: 3, width: { xs: '90%', lg: '80%' }, mx: 'auto' }}>
            Total Viewer Videos
          </Typography>
          <Grid container spacing={2} justifyContent="center" sx={{ width: { xs: '90%', lg: '80%' }, mx: 'auto' }}>
            {videos.map((video, ind) => (
              <Grid item xs={12} sm={6} md={4} key={ind}>
                <Card sx={{ position: 'relative', height: { xs: '30vh', sm: '37vh' }, cursor: 'pointer' }} onClick={() => navigate(`/video/${video.src}`)}>
                  <CardActionArea sx={{ height: '100%' }}>
                    <CardMedia
                      component="video"
                      src={video.src}
                      sx={{ height: '100%', objectFit: 'cover' }} // Change objectFit to 'contain'
                      controls // Add controls to better inspect video during development
                    />
                    <IconButton sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white' }}>
                      <PlayCircleOutlineIcon sx={{ fontSize: '2rem' }} />
                    </IconButton>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default TotalViewerVideo;
