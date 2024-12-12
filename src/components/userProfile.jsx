import React, { useEffect, useState } from 'react';
import { Box, Avatar, Typography, Button, Rating } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { tokens } from '../theme';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import StarIcon from '@mui/icons-material/Star';
import StatBox from "./StatBox";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserProfile = ({ onBack }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();
    const location = useLocation();
    const [userProfile, setUserProfile] = useState([])
    const { userPK } = location.state || {};

    useEffect(() => {
        const userData = async () => {
            const response = await axios.get(`${process.env.REACT_APP_BACK_URL}/users/${userPK}`)
            console.log(response.data.user, "Response check")
            const userResult = Array.isArray(response.data.user)
                ? response.data.user
                : [response.data.user];
            setUserProfile(userResult)
        }
        userData()
    }, [])
    console.log("Testing User", userProfile)

    const handleUserVideo = () => {
        navigate('/uservideo');
    };

    return (
        <Box
            sx={{ height: "87vh", overflowY: "auto", padding: "20px" }}>
            <Box width="90%" mx="auto" >
                {userProfile && userProfile.map((d, i) => {
                    return <Box key={i}>
                        <Box
                            display="flex"
                            flexDirection={{ xs: 'column', sm: 'row' }}
                            gap="20px"
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
                                <Avatar alt={d.name} src={d.picUrl} sx={{ width: '100%', height: '200px', width: '200px', border: `2px solid ${colors.grey[100]}` }} />
                            </Box>
                            <Box
                                flexBasis={{ xs: '100%', sm: '70%' }}
                                backgroundColor={colors.primary[400]}
                                padding="20px"
                                borderRadius="8px"
                                boxShadow="0 3px 10px rgba(0, 0, 0, 0.2)"
                            >
                                <Typography variant="h4" sx={{ color: '#4CCEAC', marginTop: '12px' }} gutterBottom>
                                    {d.name}
                                </Typography>
                                <Typography variant="subtitle1" color={colors.grey[100]} gutterBottom>
                                    {d.role}
                                </Typography>
                                <Typography variant="body2" color={colors.grey[100]} gutterBottom>
                                    {d.location}
                                </Typography>
                                <Typography variant="body2" color={colors.grey[100]} gutterBottom>
                                    {d.education}
                                </Typography>
                                <Typography variant="body2" color={colors.grey[100]} gutterBottom sx={{ marginBottom: '20px' }}>
                                    {d.description}
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
                                {/* <Button variant="contained" sx={{ backgroundColor: '#4CCEAC', marginTop: '20px' }} onClick={onBack}>
                                    Back to List
                                </Button> */}
                            </Box>
                        </Box>
                        {/* StatBoxes */}
                        <Box
                            display="grid"
                            gridTemplateColumns="repeat(4, 1fr)"
                            gap="20px"
                            mt="20px"
                        >
                            <Box backgroundColor={colors.primary[400]} display="flex" alignItems="center" padding="30px 5px" justifyContent="center" boxShadow="0 3px 10px rgba(0, 0, 0, 0.2)">
                                <StatBox
                                    subtitle="Total Jobs"
                                    title="40"
                                    icon={<InsertInvitationIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
                                />
                            </Box>
                            <Box backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center" boxShadow="0 3px 10px rgba(0, 0, 0, 0.2)">
                                <StatBox
                                    subtitle="Total Podcast"
                                    title="25"
                                    icon={<InsertInvitationIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
                                />
                            </Box>
                            <Box
                                backgroundColor={colors.primary[400]}
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                boxShadow="0 3px 10px rgba(0, 0, 0, 0.2)"
                                onClick={handleUserVideo}
                            >
                                <StatBox
                                    subtitle="Total Video"
                                    title="22"
                                    icon={<InsertInvitationIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
                                />
                            </Box>
                            <Box backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center" boxShadow="0 3px 10px rgba(0, 0, 0, 0.2)">
                                <StatBox
                                    subtitle="Total Events"
                                    title="19"
                                    icon={<InsertInvitationIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
                                />
                            </Box>
                        </Box>
                    </Box>
                })}
            </Box>
        </Box>
    );
};

export default UserProfile;
