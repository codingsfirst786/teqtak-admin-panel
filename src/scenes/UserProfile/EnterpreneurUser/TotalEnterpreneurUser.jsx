import React from 'react';
import { Box, Avatar, Typography, Button, Rating } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { tokens } from '../../../theme';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import StarIcon from '@mui/icons-material/Star';
import StatBox from '../../../components/StatBox';
import { useNavigate } from 'react-router-dom';

const TotalEnterpreneurUser = ({ user, onBack }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();

    const handletotalEnterpreneur = () => {
        navigate('/totalyEnterpreneur');
    };
    const handlepodcast =() => {
        navigate('/totalenterpreneurpodcast')
    }
    const handlevideo =() => {
        navigate('/totalenterpreneurvideo')
    }
    const handlejobs =() => {
        navigate('/totalenterpreneurjobs')
    }
    const handleevents =() => {
        navigate('/totalenterpreneurevents')
    }

    return (
        <Box width="90%" mx="auto" my="30px" gap="20px">
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
                    <Avatar alt={user.name} src={user.image} sx={{ width: '100%', height: 'auto', maxWidth: '150px', border: `2px solid ${colors.grey[100]}` }} />
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
                        {user.name}
                    </Typography>
                    <Typography variant="subtitle1" color={colors.grey[100]} gutterBottom>
                        {user.role}
                    </Typography>
                    <Typography variant="body2" color={colors.grey[100]} gutterBottom>
                        {user.location}
                    </Typography>
                    <Typography variant="body2" color={colors.grey[100]} gutterBottom>
                        {user.education}
                    </Typography>
                    <Typography variant="body2" color={colors.grey[100]} gutterBottom sx={{ marginBottom: '20px' }}>
                        {user.description}
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
                    <Button variant="contained" sx={{ backgroundColor: '#4CCEAC', marginTop: '20px' }} onClick={onBack}>
                        Back to List
                    </Button>
                </Box>
            </Box>
            {/* StatBoxes */}
            <Box
                display="grid"
                gridTemplateColumns="repeat(4, 1fr)"
                gap="20px"
                mt="20px"
            >
                <Box backgroundColor={colors.primary[400]} display="flex" alignItems="center" padding="30px 5px" justifyContent="center" boxShadow="0 3px 10px rgba(0, 0, 0, 0.2)" onClick={handlejobs}>
                    <StatBox
                        subtitle="Total Jobs"
                        title="40"
                        icon={<InsertInvitationIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
                    />
                </Box>
                <Box backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center" boxShadow="0 3px 10px rgba(0, 0, 0, 0.2)" onClick={handlepodcast}>
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
                    // onClick={handletotalEnterpreneur}
                    onClick={handlevideo}
                >
                    <StatBox
                        subtitle="Total Video"
                        title="22"
                        icon={<InsertInvitationIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
                    />
                </Box>
                <Box backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center" boxShadow="0 3px 10px rgba(0, 0, 0, 0.2)" onClick={handleevents}>
                    <StatBox
                        subtitle="Total Events"
                        title="19"
                        icon={<InsertInvitationIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default TotalEnterpreneurUser;
