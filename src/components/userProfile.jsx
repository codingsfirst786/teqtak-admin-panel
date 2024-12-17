import React, { useEffect, useState } from 'react';
import { Box, Avatar, Typography, Button, Rating } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { tokens } from '../theme';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import StarIcon from '@mui/icons-material/Star';
import StatBox from "./StatBox";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserVideo from './UserVideo';
import UserEvents from './UserEvents';
import UserPodcast from './UserPodcast';
import UserJobs from './UserJobs';

const UserProfile = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();
    const location = useLocation();
    const [userProfile, setUserProfile] = useState([])
    const { userPK } = location.state || {};

    const [openVedioModal, setOpenVideoModal] = useState(false);
    const [openPodcastModal, setOpenPodcastModal] = useState(false);
    const [openEventsModal, setOpenEventsModal] = useState(false);
    const [openJobsModal, setOpenJobsModal] = useState(false);
    const [userDataJobsCount, setUserDataJobsCount] = useState(0);
    const [userDataVideoCount, setUserDataVideoCount] = useState(0);
    const [userDataPodcastCount, setUserDataPodcastCount] = useState(0);
    const [userDataEventCount, setUserDataEventCount] = useState(0);
    const [userDataJobs, setUserDataJobs] = useState([]);
    const [userDataVideo, setUserDataVideo] = useState([]);
    const [userDataPodcast, setUserDataPodcast] = useState([]);
    const [userDataEvent, setUserDataEvent] = useState([]);

    const handleOpenVideoModal = () => setOpenVideoModal(true);
    const handleCloseVideoModal = () => setOpenVideoModal(false);
    const handleOpenPodcastModal = () => setOpenPodcastModal(true);
    const handleClosePodcastModal = () => setOpenPodcastModal(false);
    const handleOpenEventsModal = () => setOpenEventsModal(true);
    const handleCloseEventsModal = () => setOpenEventsModal(false);
    const handleOpenJobsModal = () => setOpenJobsModal(true);
    const handleCloseJobsModal = () => setOpenJobsModal(false);

    useEffect(() => {
        const userData = async () => {
            const response = await axios.get(`${process.env.REACT_APP_BACK_URL}/users/${userPK}`)
            console.log(response.data.user, "Response check")
            const userResult = Array.isArray(response.data.user)
                ? response.data.user
                : [response.data.user];
            console.log(userResult, "Response check22222222222")
            const jobsData = response.data.data.jobs;
            const podcastData = response.data.data.podcast;
            const eventData = response.data.data.events;
            const videoData = response.data.data.videos;
            setUserDataJobsCount(jobsData);
            setUserDataEventCount(eventData);
            setUserDataPodcastCount(podcastData);
            setUserDataVideoCount(videoData);
            setUserDataJobs(jobsData)
            setUserDataEvent(eventData)
            setUserDataPodcast(podcastData)
            setUserDataVideo(videoData)
            setUserProfile(userResult)
        }
        userData()
    }, [])

    console.log("Testing User", userProfile)


    return (
        <Box m="40px 0" display="flex" flexDirection="column" alignItems="center" >
            {userProfile && userProfile.map((data, i) => (<Box
                display="flex"
                flexDirection={{ xs: 'column', sm: 'row' }}
                gap="20px"
                sx={{ width: "75%", height: "250px" }}
            >
                {/* Left side: Profile Image */}
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
                    <Avatar alt={data.name} src={data.picUrl} sx={{ width: '180px', height: '180px', border: `2px solid ${colors.grey[100]}` }} />
                </Box>
                {/* Right side: User Data */}
                <Box
                    flexBasis={{ xs: '100%', sm: '70%' }}
                    backgroundColor={colors.primary[400]}
                    padding="20px"
                    borderRadius="8px"
                    boxShadow="0 3px 10px rgba(0, 0, 0, 0.2)"
                >
                    <Typography variant="h4" sx={{ color: '#4CCEAC', marginTop: '12px' }} gutterBottom>
                        {data.name}
                    </Typography>
                    <Typography variant="subtitle1" color={colors.grey[100]} gutterBottom>
                        {data.role}
                    </Typography>
                    <Typography variant="subtitle1" color={colors.grey[100]} gutterBottom>
                        Email : {data.email}
                    </Typography>

                    {/* Rating component with yellow icon */}
                    <Box display="flex" alignItems="center" marginBottom="10px">
                        <Box>
                            <StarIcon sx={{ color: '#FFD700', marginRight: '2px' }} />
                            <StarIcon sx={{ color: '#FFD700', marginRight: '2px' }} />
                            <StarIcon sx={{ color: '#FFD700', marginRight: '2px' }} />
                            <StarIcon sx={{ color: '#FFD700', marginRight: '2px' }} />
                            <StarIcon sx={{ color: '#FFD700', marginRight: '2px' }} />
                        </Box>
                        <Typography variant="body2" color={colors.grey[100]}>
                            4.7 out of 5
                        </Typography>
                    </Box>
                    <Typography variant="body2" color={colors.grey[100]} gutterBottom>
                        Global rating
                    </Typography>
                    {/* <Button variant="contained" sx={{ backgroundColor: '#4CCEAC', marginTop: '20px' }} onClick={handleBackClick}>
                        Back to List
                    </Button> */}
                </Box>
            </Box>))}
            {/* StatBoxes */}
            <Box
                display="grid"
                gridTemplateColumns="repeat(4, 1fr)"
                gap="10px"
                mt="30px"
                sx={{ width: "75%" }}
            >
                <Box backgroundColor={colors.primary[400]} display="flex" alignItems="center" padding="30px 5px" justifyContent="center" boxShadow="0 3px 10px rgba(0, 0, 0, 0.2)" onClick={handleOpenJobsModal}>
                    <StatBox
                        subtitle="Total Jobs"
                        title={userDataJobsCount.length}
                        icon={<InsertInvitationIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
                    />
                </Box>
                <Box backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center" boxShadow="0 3px 10px rgba(0, 0, 0, 0.2)"
                    // onClick={handlepodcast}
                    onClick={handleOpenPodcastModal}
                >
                    <StatBox
                        subtitle="Total Podcast"
                        title={userDataPodcastCount.length}
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
                        title={userDataVideoCount.length}
                        icon={<InsertInvitationIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
                    />
                </Box>
                <Box backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center" boxShadow="0 3px 10px rgba(0, 0, 0, 0.2)" onClick={handleOpenEventsModal}>
                    <StatBox
                        subtitle="Total Events"
                        title={userDataEventCount.length}
                        icon={<InsertInvitationIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
                    />
                </Box>
            </Box>
            <UserVideo open={openVedioModal} handleClose={handleCloseVideoModal} data={userDataVideo} />
            <UserEvents open={openEventsModal} handleClose={handleCloseEventsModal} data={userDataEvent} />
            <UserPodcast open={openPodcastModal} handleClose={handleClosePodcastModal} data={userDataPodcast} />
            <UserJobs open={openJobsModal} handleClose={handleCloseJobsModal} data={userDataJobs} />
        </Box>
    );
};

export default UserProfile;
