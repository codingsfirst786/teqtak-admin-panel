import React, { useEffect, useState } from 'react';
import { Box, Typography, Avatar, Button } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import { useTheme } from '@emotion/react';
import StatBox from './StatBox'; // Assume you have a reusable StatBox component
import UserVideo from './UserVideo'; // Dummy modals for each stat box
import UserEvents from './UserEvents';
import UserPodcast from './UserPodcast';
import UserJobs from './UserJobs';
import { tokens } from '../theme';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const dummyUserData = {
  name: "John Doe",
  role: "Software Engineer",
  email: "john.doe@example.com",
  picUrl: "/path/to/image.jpg", // Add a valid image path or placeholder image
  globalRating: 4.7,
  totalJobs: 40,
  totalPodcasts: 25,
  totalVideos: 22,
  totalEvents: 19,
  Users_PK: 123, // Dummy User Primary Key
};

const NotificationUser = ({ user = dummyUserData, onBack }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const location = useLocation()
  const { createdBy } = location.state;
  console.log("createdBy", createdBy)

  // State for handling modal open/close
  const [userData, setUserData] = useState(null)
  const [openVedioModal, setOpenVedioModal] = useState(false);
  const [openEventsModal, setOpenEventsModal] = useState(false);
  const [openPodcastModal, setOpenPodcastModal] = useState(false);
  const [openJobsModal, setOpenJobsModal] = useState(false);
  const [jobCount, setJobCount] = useState(0)
  const [videoCount, setVideoCount] = useState(0)
  const [eventCount, setEventCount] = useState(0)
  const [podcastCount, setPodcastCount] = useState(0)
  const [rating, setRating] = useState(0)

  const handleOpenVideoModal = () => setOpenVedioModal(true);
  const handleCloseVideoModal = () => setOpenVedioModal(false);
  const handleOpenEventsModal = () => setOpenEventsModal(true);
  const handleCloseEventsModal = () => setOpenEventsModal(false);
  const handleOpenPodcastModal = () => setOpenPodcastModal(true);
  const handleClosePodcastModal = () => setOpenPodcastModal(false);
  const handleOpenJobsModal = () => setOpenJobsModal(true);
  const handleCloseJobsModal = () => setOpenJobsModal(false);



  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACK_URL}/users/${createdBy}`)
        const result = response.data
        const count = response.data.data
        setJobCount(count.jobs.length)
        setEventCount(count.events.length)
        setVideoCount(count.videos.length)
        setPodcastCount(count.podcast.length)
        setRating(count.rating.globalrating)
        console.log(count)
        setUserData(result.user)
        console.log(result.user)
      }
      catch (error) {
        console.log(error)
      }
    }
    getUser();
  }, [])

  return (
    <Box m="40px 0" display="flex" flexDirection="column" alignItems="center">
      {userData && ( 
        <Box
          display="flex"
          flexDirection={{ xs: 'column', sm: 'row' }}
          gap="20px"
          sx={{ width: "75%", height: "250px" }}
        >
          <Box
            flexBasis={{ xs: '100%', sm: '30%' }}
            display="flex"
            alignItems="center"
            justifyContent="center"
            backgroundColor={colors.primary[400]}
            padding="20px"
            borderRadius="8px"
            boxShadow="0 3px 10px rgba(0, 0, 0, 0.2)"
          >
            <Avatar alt={userData.name} src={userData.picUrl} sx={{ width: '180px', height: '180px', border: `2px solid ${colors.grey[100]}` }} />
          </Box>

          <Box
            flexBasis={{ xs: '100%', sm: '70%' }}
            backgroundColor={colors.primary[400]}
            padding="20px"
            borderRadius="8px"
            boxShadow="0 3px 10px rgba(0, 0, 0, 0.2)"
          >
            <Typography variant="h4" sx={{ color: '#4CCEAC', marginTop: '12px' }} gutterBottom>
              {userData.name}
            </Typography>
            <Typography variant="subtitle1" color={colors.grey[100]} gutterBottom>
              {userData.role}
            </Typography>
            <Typography variant="subtitle1" color={colors.grey[100]} gutterBottom>
              Email: {userData.email}
            </Typography>

            <Box display="flex" alignItems="center" marginBottom="10px">
              <Box>
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} sx={{ color: '#FFD700', marginRight: '2px' }} />
                ))}
              </Box>
              <Typography variant="body2" color={colors.grey[100]}>
                {userData.globalRating} out of 5
              </Typography>
            </Box>
            <Typography variant="body2" color={colors.grey[100]} gutterBottom>
              Global rating
            </Typography>
            <Button variant="contained" sx={{ backgroundColor: '#4CCEAC', marginTop: '20px' }} onClick={onBack}>
              Back to List
            </Button>
          </Box>
        </Box>
      )}

      {/* StatBoxes */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(4, 1fr)"
        gap="10px"
        mt="30px"
        sx={{ width: "75%" }}
      >
        <Box backgroundColor={colors.primary[400]} display="flex" alignItems="center" padding="30px 5px" justifyContent="center" boxShadow="0 3px 10px rgba(0, 0, 0, 0.2)"
          onClick={handleOpenJobsModal}
        >
          <StatBox
            subtitle="Total Jobs"
            title={jobCount}
            icon={<InsertInvitationIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
          />
        </Box>
        <Box backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center" boxShadow="0 3px 10px rgba(0, 0, 0, 0.2)"
          // onClick={handlepodcast}
          onClick={handleOpenPodcastModal}
        >
          <StatBox
            subtitle="Total Podcast"
            title={podcastCount}
            icon={<InsertInvitationIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
          />
        </Box>
        <Box
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          boxShadow="0 3px 10px rgba(0, 0, 0, 0.2)"
          // onClick={handledailyviewer}
          // onClick={handlevideo}
          onClick={handleOpenVideoModal}
        >
          <StatBox
            subtitle="Total Video"
            title={videoCount}
            icon={<InsertInvitationIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
          />
        </Box>
        <Box backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center" boxShadow="0 3px 10px rgba(0, 0, 0, 0.2)"
          onClick={handleOpenEventsModal}
        >
          <StatBox
            subtitle="Total Events"
            title={eventCount}
            icon={<InsertInvitationIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
          />
        </Box>
      </Box>

      {/* Modals */}
      <UserVideo open={openVedioModal} handleClose={handleCloseVideoModal} userId={user.Users_PK} />
      <UserEvents open={openEventsModal} handleClose={handleCloseEventsModal} userId={user.Users_PK} />
      <UserPodcast open={openPodcastModal} handleClose={handleClosePodcastModal} userId={user.Users_PK} />
      <UserJobs open={openJobsModal} handleClose={handleCloseJobsModal} userId={user.Users_PK} />
    </Box>

  );
};

export default NotificationUser;
