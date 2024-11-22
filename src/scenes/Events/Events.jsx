import { useEffect, useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { Card, CardMedia, CardContent, Typography, Button, Grid } from '@mui/material';
import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { styled } from '@mui/material/styles';
import StatBox from "../../components/StatBox";
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import EventNoteIcon from '@mui/icons-material/EventNote';
import DateRangeIcon from '@mui/icons-material/DateRange';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import axios from "axios";

const Events = () => {
  const [currentEvents, setCurrentEvents] = useState([]);
  const [count, setCount] = useState(0)
  // ////////////////////////////////////////////// //
  const [events, setEvents] = useState([])
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACK_URL}/events`)
        const result = await response.data;
        console.log("Fetched data:", result);
        console.log("count is");
        console.log(result.data.count)
        const updatedData = result.data.map(user => ({
          ...user,
          active: true
        }));

        setCount(result.count)
        console.log(updatedData)
        setEvents(updatedData);
      }
      catch (error) {
        console.error('Fetching data error', error);
      }
    }
    getData();
  }, [])
  // /////////////////////////////////////////////  //

  const handleDateClick = (selected) => {
    const title = prompt("Please enter a new title for your event");
    const calendarApi = selected.view.calendar;
    calendarApi.unselect();

    if (title) {
      calendarApi.addEvent({
        id: `${selected.dateStr}-${title}`,
        title,
        start: selected.startStr,
        end: selected.endStr,
        allDay: selected.allDay,
      });
    }
  };

  const handleEventClick = (selected) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${selected.event.title}'`
      )
    ) {
      selected.event.remove();
    }
  };

  const cardData = [
    {
      id: 1,
      title: "Business",
      imgSrc: "https://images.unsplash.com/photo-1522582324369-2dfc36bd9275?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDV8fHxlbnwwfHx8fHw%3D",
    },
    {
      id: 2,
      title: "Networking",
      imgSrc: "https://media.istockphoto.com/id/1649927045/photo/social-media-social-media-marketing-engagement-post-structure.webp?b=1&s=170667a&w=0&k=20&c=si9Ex9etSObs30XVUIKzMJiexUz78p_z2Xw-YLfkwh8=",
    },
    {
      id: 3,
      title: "Finance",
      imgSrc: "https://images.unsplash.com/photo-1579621970795-87facc2f976d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZmluYW5jZXxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      id: 4,
      title: "Business",
      imgSrc: "https://media.istockphoto.com/id/1480095869/photo/student-or-man-use-computer-for-elearning-education-online-internet-technology-webinar-online.webp?b=1&s=170667a&w=0&k=20&c=lAFPQOr_Bvjfr1235EcosGYhr4KgUtuBW1jzMqMU05w=",
    },
    {
      id: 5,
      title: "Finance",
      imgSrc: "https://plus.unsplash.com/premium_photo-1670213989449-29b83feebe8a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZmluYW5jZXxlbnwwfHwwfHx8MA%3D%3D",
    },
    // {
    //   id: 6,
    //   title: "Business",
    //   imgSrc: "https://images.unsplash.com/photo-1665686306574-1ace09918530?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJ1c2luZXNzfGVufDB8fDB8fHww",
    // },
    // {
    //   id: 7,
    //   title: "Business",
    //   imgSrc: "https://images.unsplash.com/photo-1665686306574-1ace09918530?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJ1c2luZXNzfGVufDB8fDB8fHww",
    // },
    // {
    //   id: 8,
    //   title: "Business",
    //   imgSrc: "https://images.unsplash.com/photo-1665686306574-1ace09918530?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJ1c2luZXNzfGVufDB8fDB8fHww",
    // },
    // Add more card objects here
  ];

  const CardComponent = ({ title, imgSrc }) => (
    <Card sx={{ height: '30vh', width: { lg: '12vw', md: '15vw', sm: '20vw', xs: '25vw' }, position: 'relative', cursor: 'pointer', m: 0 }} >

      <CardMedia component="img" image={imgSrc} alt="Card Img" sx={{ height: '100%', width: '100%', borderRadius: 1 }} />
      <CardContent sx={{ position: 'absolute', inset: 0, display: 'flex', justifyContent: 'space-between', bgcolor: 'rgba(0, 0, 0, 0.5)', borderRadius: 1 }}>
        <Typography variant="h5" component="div" sx={{ color: 'white', position: 'absolute', bottom: 2, left: 3 }}>{title}</Typography>
        <BookmarkBorderIcon sx={{ position: 'absolute', right: 2, top: 4, color: 'white', fontSize: '2rem' }} />
      </CardContent>
    </Card>
  );

  const navigate = useNavigate();


  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box  sx={{height:"87vh",overflowY:"auto", padding:"20px"}}>
      <Header title="Event" />

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
            subtitle="Daily Events "
            title="40"
            icon={
              <EventAvailableIcon
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
            subtitle="Weekly Events"
            icon={
              <DateRangeIcon
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
            subtitle="Monthly Events"

            icon={
              <EventNoteIcon
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
            title={count}
            subtitle="Total Events"
            icon={
              <CalendarMonthIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
      </Box>
      <div style={{  padding:"10px 0px",marginTop:"10px", backgroundColor: colors.primary[400] }}>

            <Grid container spacing={1} style={{padding:"10px", marginTop: '1%', flexWrap: 'wrap', justifyContent: 'space-between', gap: '1%'}}>
              {events.map((event, i) => (
                <Grid item key={i} style={{ margin: 0, width: '32.4%', height: '45vh', position: 'relative' }}>
                  <CardMedia component="img" image={event.eventCoverUrl} alt="Card Img2y" style={{ height: '100%', width: '100%', borderRadius: '8px', cursor: 'pointer' }}
                  />
                  {/* <BookmarkBorderIcon style={{ position: 'absolute', right: '2%', top: '4%', color: 'white', fontSize: '2rem' }} /> */}
                  <div style={{ position: 'absolute', bottom: '1%', width: '100%' }}>
                    <div style={{ width: '95%', marginLeft:"3px",   padding: '1% 3%', backgroundColor: 'rgba(0, 0, 0, 0.5)', borderRadius: '8px' }}>
                      <Typography variant="h5" component="small" style={{ fontSize: '1.25rem', color: "#4CCEAC" }}>Title: {event.eventTitle}</Typography>
                      <Typography variant="body2" style={{ fontSize: '0.875rem', color: 'white', padding: '2% 0' }}>Location: {event.eventLocation}</Typography>
                      <Typography variant="body1" style={{ fontSize: '1rem', color: 'white', paddingBottom: '2%' }}>Date: {event.eventDate}</Typography>
                    </div>
                  </div>
                </Grid>
              ))}
            </Grid>
      </div>

    </Box>
  );
};

export default Events;
