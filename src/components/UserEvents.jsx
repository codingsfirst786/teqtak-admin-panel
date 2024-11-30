import { useEffect, useState } from "react";
import React from "react";
import { Modal, Grid, Typography, CardMedia, Box, IconButton } from '@mui/material';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";
import { useTheme } from "@emotion/react";
import { tokens } from "../theme";

const UserEvents = ({ open, handleClose, data }) => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  console.log(data, "===== Hello hey")

  const [myevents, setMyEvents] = useState([]);

  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       const response = await axios.get(`${process.env.REACT_APP_BACK_URL}/users/${userId}`);

  //       const events = await response.data.data.events;
  //       const eventsLength = await response.data.data.events.length;
  //       console.log("EventsLength", eventsLength)

  //       console.log("evnte is ", events)
  //       setMyEvents(events)

  //     } catch (err) {
  //       console.error("Testing Error is ", err);
  //     }
  //   };

  //   if (userId) {
  //     getData();
  //   }
  // }, [userId]);

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        backgroundColor={colors.primary[400]}
        sx={{
          width: '50%', height: '60vh', p: 4, position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)', overflowY: "auto",  borderRadius: 2, display: 'flex',
          flexDirection: 'column',
        }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h5" fontWeight="bold">
            Events
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Grid container sx={{ flexWrap: 'wrap', justifyContent: 'space-between' }}>
          {data.map((event, i) => (
            <Grid item key={event._id} sx={{ width: '48%', position: 'relative', minHeight: '45vh', margin: "10px" }}>
              <CardMedia
                component="img"
                image={event.eventCoverUrl}
                sx={{
                  height: '100%',
                  width: '100%',
                  borderRadius: 1,
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease',
                  '&:hover': { transform: 'scale(1.03)' }
                }}
              />
              <BookmarkBorderIcon sx={{
                position: 'absolute',
                right: 12,
                top: 12,
                color: 'white',
                fontSize: '2rem',
                cursor: 'pointer'
              }} />
              <Box sx={{
                position: 'absolute',
                bottom: 0,
                width: '100%',
                bgcolor: 'rgba(0, 0, 0, 0.7)',
                borderRadius: 1,
                // margin:"0px auto 3px auto",
                padding: '10px',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                color: 'white',
                textShadow: '0 1px 3px rgba(0,0,0,0.5)'
              }}>
                <Typography variant="h6" component="small" sx={{
                  fontSize: '1rem',
                  color: "#4CCEAC",
                  fontWeight: 'bold',
                  lineHeight: '1.4',
                }}>
                  Ticket Type: {event.eventTicketType}
                </Typography>
                <Typography variant="h3" component="small" sx={{
                  fontSize: '1.2rem',
                  color: "#4CCEAC",
                  fontWeight: 'bold',
                  lineHeight: '1.4',
                  mb: 0.6,
                }}>
                  {event.eventTitle}
                </Typography>

                <Typography variant="body1" sx={{
                  fontSize: '0.9rem',
                  color: 'white',
                  mt: 0.5,
                  lineHeight: '1.4'
                }}>
                  {event.eventDescription}
                </Typography>
                <Typography variant="body1" sx={{
                  fontSize: '0.9rem',
                  color: 'white',
                  mt: 0.5,
                  lineHeight: '1.4'
                }}>
                  Location: {event.eventLocation}
                </Typography>
                <Typography variant="body1" sx={{
                  fontSize: '0.9rem',
                  color: 'white',
                  lineHeight: '1.4'
                }}>
                  Event Date: {event.eventDate}
                </Typography>
                <Typography variant="body2" sx={{
                  fontSize: '0.85rem',
                  color: 'white',
                  lineHeight: '1.4'
                }}>
                  Duration: {event.eventDuration}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Modal>
  );
};

export default UserEvents;
