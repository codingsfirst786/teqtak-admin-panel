import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { tokens } from "../../theme";
import { styled } from '@mui/material/styles';
import { useTheme, Box, Typography, Button, Card, CardContent, CardMedia } from "@mui/material";
import StatBox from "../../components/StatBox";
import PodcastsIcon from '@mui/icons-material/Podcasts';
import img1 from './image1.jpeg';
import img2 from './img2.jpeg';
import img3 from './img3.jpeg';
import img4 from './img4.jpeg';
import img5 from './img5.jpeg';
import axios from "axios";

const guestData = [
  { img: img5, title: "Host" },
  { img: img2, title: "Guest" },
  { img: img5, title: "Guest" },
  { img: img4, title: "Guest" },
];

const similarPodcastData = [
  { img: img1, id: 1, categ: "Politics", userName: "Lily Williams", mint: '35 Mins' },
  { img: img4, id: 1, categ: "Politics", userName: "Lily Williams", mint: '35 Mins' },
  { img: img2, id: 1, categ: "Politics", userName: "Lily Williams", mint: '35 Mins' },
  { img: img3, id: 1, categ: "Politics", userName: "Lily Williams", mint: '35 Mins' },
  { img: img2, id: 1, categ: "Politics", userName: "Lily Williams", mint: '35 Mins' },
  { img: img5, id: 1, categ: "Politics", userName: "Lily Williams", mint: '35 Mins' },
  { img: img1, id: 1, categ: "Politics", userName: "Lily Williams", mint: '35 Mins' },
  { img: img1, id: 1, categ: "Politics", userName: "Lily Williams", mint: '35 Mins' },
  { img: img1, id: 1, categ: "Politics", userName: "Lily Williams", mint: '35 Mins' },
];

const SinglePodcastDetails = () => {
  const [count, setCount] = useState(0)
  // ////////////////////////////////////////////// //
  const [podcast, setPodcast] = useState([])
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/podcasts`)
        const result = await response.data;
        console.log("Fetched data:", result);
        console.log("count is");
        console.log(result.count)
        const updatedData = result.data.map(user => ({
          ...user,
          active: true
        }));

        setCount(result.count)
        console.log(updatedData)
        setPodcast(updatedData);
      }
      catch (error) {
        console.error('Fetching data error', error);
      }
    }
    getData();
  }, [])
  const { img } = useParams();
  const [revModOpen, setRevModOpen] = useState(false);
  const [repModOpen, setRepModOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

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

  const handleDetailClick = (image) => {
    setSelectedImage(image);
  };

  return (
    <Fragment>
      <Box height="100%" px={6} overflow="auto" position="relative">
        <Box
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gridAutoRows="140px"
          gap="20px">
          <Box
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              subtitle="Total Invester"
              title="40"
              icon={
                <PodcastsIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>
          <Box
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title="90"
              subtitle="Total Interpenurer"
              icon={
                <PodcastsIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>
          <Box
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title="60"
              subtitle="Total Viewer"
              icon={
                <PodcastsIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>
          <Box
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title="190"
              subtitle="Total Traffic"
              icon={
                <PodcastsIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>
        </Box>
        {selectedImage && (
          <Box display="flex" gap={4} mt={3}>
            <Card sx={{ width: { xs: '100%', sm: '40%' }, maxWidth: 345 }}>
              <CardMedia
                component="img"
                image={selectedImage.img}
                alt="Podcast Image"
                sx={{ height: { lg: '230px', sm: 'auto' }, width: '100%' }}
              />
            </Card>
            <Box width="60%" mx="auto">
              {/* <Typography variant="h4" fontWeight="bold" style={{ color: "#4CCEAC" }}>{selectedImage.categ}</Typography> */}
              <Typography variant="h6" style={{ color: "#4CCEAC" }} sx={{mt:"6px"}}>{selectedImage.episodeTitle}</Typography>
              <Typography variant="body2" sx={{ mt: "42px" }}>Episode No: {selectedImage.episodeNumber}</Typography>
              <Typography variant="body2" sx={{ my: "7px" }}>{selectedImage.episodeDescription}</Typography>
              <Typography variant="body2" sx={{ my: "7px" }}>{selectedImage.podcastType}</Typography>
              <Typography variant="body2" sx={{ my: "7px" }}>Session: {selectedImage.seasonNumber}</Typography>
              <Typography variant="h6" style={{ color: "#4CCEAC" }} sx={{mt:"40px"}}>Publisher: {selectedImage.publisher}</Typography>
              {/* <Box display="flex" alignItems="center" gap={2}>
                <Typography variant="body2" color="textSecondary">4.7 (571)</Typography>
              </Box> */}
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
          {podcast.map((elm, ind) => (
            <Card key={ind} sx={{ width: { xs: '100%', sm: '32%' }, position: 'relative', height: '300px' }}>
              <CardMedia
                component="img"
                image={elm.picUrl ? img3 : elm.picUrl}
                alt={`Img-${ind}`}
                sx={{ height: '100%' }}
              />
              <Box position="absolute" bottom={0} left={0} width="100%" bgcolor="rgba(0,0,0,0.6)" color="white" p={2}>
                <Typography variant="h6" style={{ color: "#4CCEAC" }}>{elm.episodeTitle}</Typography>
                <Typography variant="body2">{elm.episodeDescription.slice(1, 40)}...</Typography>
                <Box display="flex" justifyContent="space-between" mt={1}>
                  <Typography variant="body2" display="flex" alignItems="center" gap={1}>
                    {elm.publisher}
                  </Typography>
                  <Button variant="contained" color="primary" onClick={() => handleDetailClick(elm)}>
                    Detail
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

export default SinglePodcastDetails;
