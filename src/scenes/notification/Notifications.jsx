import { useTheme } from '@emotion/react';
import { Box, Typography, Avatar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { tokens } from '../../theme';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';


function Notifications() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate()

  const [notification, setNotification] = useState([])
  useEffect(() => {
    const getNotification = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACK_URL}/notifications`);
        const result = response.data;
        const userId = result.data
        console.log("Notification Response is ", userId);
        setNotification(result.data);
      }
      catch (err) {
        console.log("Notification error is that", err);
      }
    }
    getNotification();
  }, []);

  const handleUser = (createdBy) => {
    navigate('/notificationUser', {
      state: { createdBy }
    })
  }

  return (
    <Box sx={{ height: "87vh", overflowY: "auto", padding: "20px" }}>
      <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
        All Notifications
      </Typography>

      <Box
        sx={{
          width: '60%',
          margin: '0 auto', // Centering the parent box
        }}
      >
        {notification.map((singlenotification, index) => (
          <Box
            onClick={() => handleUser(singlenotification.createdBy)}
            key={index}
            backgroundColor={colors.primary[400]}
            sx={{
              display: 'flex', // Flexbox for horizontal layout
              alignItems: 'center', // Vertically align items
              width: '100%',
              marginTop: 1,
              padding: 2,
              boxShadow: 3,
              borderRadius: 1,
              gap: 2 // Space between avatar and text
            }}
          >
            {/* Avatar (Image) on the left */}
            <Avatar
              alt="User Avatar"
              src={singlenotification.user.picUrl} // Use the user image
              sx={{ width: 66, height: 66 }}
            />

            {/* Notification Content on the right */}
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 'bold', color: colors.greenAccent[400] }}>
                {singlenotification.notiTitle}
              </Typography>
              <Typography variant="body" >
                {singlenotification.notiDesc.slice(0, 30)}: {singlenotification.user.name}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: colors.greenAccent[600] }}
              >
                Created By: {singlenotification.user.name}
              </Typography>
              <Typography
                variant="body2"
                sx={{  color: colors.greenAccent[600] }}
              >
                 Created: {formatDistanceToNow(new Date(singlenotification.createdAt))} ago
                 </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default Notifications;
