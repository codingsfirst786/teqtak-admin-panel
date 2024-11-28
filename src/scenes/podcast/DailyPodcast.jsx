import React, { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { tokens } from "../../theme";
import { useTheme, Box, Typography, Button, Card, CardMedia, Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import img3 from './img3.jpeg';
import axios from "axios";
import Header from "../../components/Header";
import { fetchAllPodcastsCount } from '../../Api/Podcast/AllPodcastCount'


const DailyPodcast = () => {
  const navigate = useNavigate()
  const [podcast, setPodcast] = useState([]);

  useEffect(() => {
    const getPodcastCount = async () => {
        try {
            const users = await fetchAllPodcastsCount();
            setPodcast(users.todayPodcast);

        } catch (error) {
            console.log(error);
        }
    };
    getPodcastCount();
}, []);
  const { img } = useParams();
  const [selectedImage, setSelectedImage] = useState(null);
  const [open, setOpen] = useState(false);


  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleDetailClick = (image) => {
    setSelectedImage(image);
    setOpen(true);
  };
  const handleDeletePodact = async (podid) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACK_URL}/podcasts/${podid}`);
      setPodcast((prevpodcast) => prevpodcast.filter((podcast) => podcast._id !== podid));

    } catch (error) {
      console.error("Error deleting video:", error);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      <Box px={6} overflow="auto" position="relative" sx={{ height: "87vh", overflowY: "auto", padding: "20px" }}>
        <IconButton onClick={() => navigate("/podcast")} sx={{ mb: 2 }}>
          <ArrowBack />
        </IconButton>

        <Box
          display="grid"
          gridTemplateColumns="repeat(6, 3fr)"
          gridAutoRows="140px"
          gap="20px"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            gridColumn="span 6"
          >
            <Header title="DAILY PODCAST" subtitle="Managing the Daily Podcast" />
          </Box>
        </Box>

        <Typography variant="h6" mt={4} mb={2} style={{ color: "#4CCEAC" }}>Similar Podcasts</Typography>
        <Box display="flex" flexWrap="wrap" gap={2}>
          {podcast.map((elm, ind) => (
            <Card key={ind} sx={{ width: { xs: '100%', sm: '32%' }, position: 'relative', height: '300px' }}>
              <CardMedia
                component="img"
                image={elm.picUrl ? elm.picUrl : img3}
                alt={`Img-${ind}`}
                sx={{ height: '100%' }}
              />
              <Box position="absolute" bottom={0} left={0} width="100%" bgcolor="rgba(0,0,0,0.6)" color="white" p={2}>
                <Typography variant="h4" style={{ color: "#4CCEAC" }}>{elm.episodeTitle}</Typography>
                <Typography variant="h6">Type : {elm.podcastType}</Typography>
                <Box display="flex" justifyContent="space-between">
                  <Button variant="contained" color="primary" onClick={() => handleDetailClick(elm)}>
                    Detail
                  </Button>
                  <Button variant="contained" color="primary" sx={{ marginLeft: "20px" }} onClick={() => handleDeletePodact(elm._id)}>
                    Delete
                  </Button>
                </Box>
              </Box>
            </Card>
          ))}
        </Box>

        {/* Modal for Podcast Details */}
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
          <DialogTitle sx={{ backgroundColor: colors.primary[400], color: colors.greenAccent[100] }}>
            Podcast Details
          </DialogTitle>
          <DialogContent
            sx={{ backgroundColor: colors.primary[400] }}
          >
            {selectedImage && (
              <Box display="flex" gap={4}>
                <Card sx={{ width: { xs: '100%', sm: '40%' }, maxWidth: 345 }}>
                  <CardMedia
                    component="img"
                    image={selectedImage.picUrl || img3}
                    alt="Podcast Image"
                    sx={{ height: { lg: '230px', sm: 'auto' }, width: '100%' }}
                  />
                </Card>
                <Box width="60%" mx="auto">
                  <Typography variant="h3" style={{ color: "#4CCEAC" }}>
                    {selectedImage.episodeTitle}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: "12px" }}>
                    Episode No: {selectedImage.episodeNumber}
                  </Typography>
                  <Typography variant="body1" sx={{ my: "7px" }}>
                    {selectedImage.episodeDescription}
                  </Typography>
                  <Typography variant="body1" sx={{ my: "7px" }}>
                    Title : {selectedImage.podcastType}
                  </Typography>
                  <Typography variant="body2" sx={{ my: "7px" }}>
                    Session: {selectedImage.seasonNumber}
                  </Typography>
                  <Typography variant="body2" sx={{ my: "7px" }}>
                    Duration: {selectedImage.podcastDuration}
                  </Typography>
                  <Typography variant="h5" sx={{ my: "7px" }}>
                    Speaker: {selectedImage.speakers}
                  </Typography>
                  {/* <Typography variant="h6" style={{ color: "#4CCEAC" }} sx={{ mt: "20px" }}>
                    Publisher: {selectedImage.user.name}
                  </Typography> */}
                </Box>
              </Box>
            )}
          </DialogContent>
          <DialogActions sx={{ backgroundColor: colors.primary[400] }}>
            <Button onClick={handleClose} color="info">
              Close
            </Button>
          </DialogActions>
        </Dialog>

      </Box>
    </Fragment>
  );
};

export default DailyPodcast;
