import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Grid,
  Card,
  CardMedia,
  CardActionArea,
  Modal,
  useTheme
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { tokens } from "../theme";


const UserVideo = ({ open, handleClose, data }) => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const myvideo = data.map((e) => e.data)
 

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        backgroundColor={colors.primary[400]}
        sx={{
          width: '55vw', height: '65vh', p: 4,
          m: 'auto', position: 'relative', top: '50%', overflowY: "auto", transform: 'translateY(-50%)', borderRadius: 2,
        }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h5" fontWeight="bold">
            Videos
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Videos Grid */}
        <Grid container spacing={2} justifyContent="center">
          {myvideo.map((video, ind) => (
            <Grid item xs={12} sm={6} key={ind}>
              <Card sx={{ position: 'relative', height: { xs: '30vh', sm: '37vh' }, cursor: 'pointer' }}>
                <CardActionArea sx={{ height: '100%' }}>
                  <CardMedia
                    component="video"
                    src={video.videoUrl}
                    sx={{ height: '100%', objectFit: 'cover' }}
                    controls
                  />
                  <IconButton sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white' }}>
                  </IconButton>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Modal>
  );
};

export default UserVideo;
