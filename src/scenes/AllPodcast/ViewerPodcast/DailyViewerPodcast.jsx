import React, { Fragment, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { tokens } from "../../../theme";
import { styled } from '@mui/material/styles';
import { useTheme, Box, Typography, Button, Card, CardContent, CardMedia } from "@mui/material";
import PodcastsIcon from '@mui/icons-material/Podcasts';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import img1 from '../../podcast/image1.jpeg';
import img2 from '../../podcast/img2.jpeg';
import img3 from '../../podcast/img3.jpeg';
import img4 from '../../podcast/img4.jpeg';
import img5 from '../../podcast/img5.jpeg';

const guestData = [
  { img: img5, title: "Host" },
  { img: img2, title: "Guest" },
  { img: img5, title: "Guest" },
  { img: img4, title: "Guest" },
];

const initialSimilarPodcastData = [
  { img: img1, id: 1, categ: "Politics", userName: "Lily Williams", mint: '35 Mins' },
  { img: img4, id: 2, categ: "Politics", userName: "Lily Williams", mint: '35 Mins' },
  { img: img2, id: 3, categ: "Politics", userName: "Lily Williams", mint: '35 Mins' },
  { img: img3, id: 4, categ: "Politics", userName: "Lily Williams", mint: '35 Mins' },
  { img: img2, id: 5, categ: "Politics", userName: "Lily Williams", mint: '35 Mins' },
  { img: img5, id: 6, categ: "Politics", userName: "Lily Williams", mint: '35 Mins' },
  { img: img1, id: 7, categ: "Politics", userName: "Lily Williams", mint: '35 Mins' },
  { img: img1, id: 8, categ: "Politics", userName: "Lily Williams", mint: '35 Mins' },
  { img: img1, id: 9, categ: "Politics", userName: "Lily Williams", mint: '35 Mins' },
];

const DailyViewerPodcast = () => {
  const { img } = useParams();
  const [revModOpen, setRevModOpen] = useState(false);
  const [repModOpen, setRepModOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [similarPodcastData, setSimilarPodcastData] = useState(initialSimilarPodcastData);
  const [notificationMessage, setNotificationMessage] = useState("");

  const imgMap = {
    'image1.jpeg': img1,
    'img2.jpeg': img2,
    'img3.jpeg': img3,
    'img4.jpeg': img4,
    'img5.jpeg': img5,
  };

  const src = imgMap[img] || img1; // Default to img1 if img is not in the map

  const StyledCard = styled(Card)(({ theme }) => ({
    marginBottom: theme.spacing(2),
    boxShadow: theme.shadows[5],
  }));

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const handleDetailClick = (image) => {
    setSelectedImage(image);
  };

  const handleBack = () => {
    navigate('/dailyViewer');
  };

  const handleDelete = (id) => {
    setSimilarPodcastData(similarPodcastData.filter(podcast => podcast.id !== id));
  };

  const handleNotification = () => {
    const message = prompt("Enter your message:");
    if (message) {
      setNotificationMessage(message);
    }
  };

  return (
    <Fragment>
      <Button
        variant="contained"
        onClick={handleBack}
        startIcon={<ArrowBackIcon />}
      >
        Back
      </Button>
      <Box height="100%" px={6} overflow="auto" position="relative">
        {selectedImage && (
          <Box display="flex" gap={4} mt={3}>
            <Card sx={{ width: { xs: '100%', sm: '40%' }, maxWidth: 345 }}>
              <CardMedia
                component="img"
                image={selectedImage.img}
                alt="Podcast Image"
                sx={{ height: { xs: 'auto', sm: '35vh' }, width: '100%' }}
              />
            </Card>
            <Box width="60%" mx="auto">
              <Typography variant="h4" fontWeight="bold" style={{ color: "#4CCEAC" }}>{selectedImage.categ}</Typography>
              <Typography variant="body2" color="textSecondary">{selectedImage.mint}</Typography>
              <Typography variant="body2" color="textSecondary">{selectedImage.userName}</Typography>
              <Button variant="outlined" color="primary" sx={{ my: 2 }}>
                1 hr left
              </Button>
              <Box display="flex" alignItems="center" gap={2}>
                <Typography variant="body2" color="textSecondary">4.7 (571)</Typography>
              </Box>
              <Typography variant="body2" color="textSecondary" mt={2}>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Optio nam quo amet, inventore iste aspernatur accusantium dolorem blanditiis laboriosam, atquati provident!
              </Typography>
            </Box>
          </Box>
        )}
        <Typography variant="h6" mt={4} mb={2} style={{ color: "#4CCEAC" }}>Guests</Typography>
        <Box display="flex" overflow="auto" gap={2}>
          {guestData.map((elm, ind) => (
            <Card key={ind} sx={{ width: 120, display: 'flex', alignItems: 'center', justifyContent: 'center' }} style={{ backgroundColor: colors.primary[400] }}>
              <CardMedia
                component="img"
                image={elm.img}
                alt={elm.title}
                sx={{ borderRadius: '50%', width: 40, height: 40 }}
              />
              <CardContent>
                <Typography variant="body2">{elm.title}</Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
        <Typography variant="h6" mt={4} mb={2} style={{ color: "#4CCEAC" }}>Similar Podcasts</Typography>
        <Box display="flex" flexWrap="wrap" gap={2}>
          {similarPodcastData.map((elm, ind) => (
            <Card key={ind} sx={{ width: { xs: '100%', sm: '32%' }, position: 'relative', height: '300px' }}>
              <CardMedia
                component="img"
                image={elm.img}
                alt={`Img-${ind}`}
                sx={{ height: '100%' }}
              />
              <Box position="absolute" bottom={0} left={0} width="100%" bgcolor="rgba(0,0,0,0.6)" color="white" p={2}>
                <Typography variant="h6" style={{ color: "#4CCEAC" }}>{elm.categ}</Typography>
                <Typography variant="body2">{elm.userName}</Typography>
                <Box display="flex" justifyContent="space-between" mt={1}>
                  <Typography variant="body2" display="flex" alignItems="center" gap={1}>
                    {elm.mint}
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" mt={2}>
                  <Button variant="contained" color="secondary" onClick={() => handleNotification()}>
                    Notification
                  </Button>
                  <Button variant="contained" color="secondary" onClick={() => handleDetailClick(elm)}>
                    Detail
                  </Button>
                  <Button variant="contained" color="error" onClick={() => handleDelete(elm.id)}>
                    Delete
                  </Button>
                </Box>
              </Box>
            </Card>
          ))}
        </Box>
      </Box>
    </Fragment>
  );
};

export default DailyViewerPodcast;
