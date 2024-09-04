import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { Card, CardMedia, CardContent, Typography, Button, Grid } from '@mui/material';
import {Box, useTheme} from "@mui/material";
import Header from "../../../components/Header";
import { tokens } from "../../../theme";
import { styled } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TrafficIcon from "@mui/icons-material/Traffic";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import StatBox from "../../../components/StatBox";
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import EventNoteIcon from '@mui/icons-material/EventNote';
import DateRangeIcon from '@mui/icons-material/DateRange';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const MonthlyViewerEvents = () => {
  const [currentEvents, setCurrentEvents] = useState([]);

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

  const newCardData = [
    {
      id: 1,
      title: "Business",
      imgSrc: "https://images.unsplash.com/photo-1522582324369-2dfc36bd9275?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDV8fHxlbnwwfHx8fHw%3D",
    },
    {
      id: 2,
      title: "Networking",
      imgSrc: "https://plus.unsplash.com/premium_photo-1670213989449-29b83feebe8a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZmluYW5jZXxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      id: 3,
      title: "Finance",
      imgSrc: "https://images.unsplash.com/photo-1665686306574-1ace09918530?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJ1c2luZXNzfGVufDB8fDB8fHww",
    },
    {
      id: 1,
      title: "Business",
      imgSrc: "https://images.unsplash.com/photo-1522582324369-2dfc36bd9275?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDV8fHxlbnwwfHx8fHw%3D",
    },
    {
      id: 2,
      title: "Networking",
      imgSrc: "https://plus.unsplash.com/premium_photo-1670213989449-29b83feebe8a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZmluYW5jZXxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      id: 3,
      title: "Finance",
      imgSrc: "https://images.unsplash.com/photo-1665686306574-1ace09918530?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJ1c2luZXNzfGVufDB8fDB8fHww",
    },
    {
      id: 3,
      title: "Finance",
      imgSrc: "https://images.unsplash.com/photo-1665686306574-1ace09918530?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJ1c2luZXNzfGVufDB8fDB8fHww",
    },
    {
      id: 3,
      title: "Finance",
      imgSrc: "https://images.unsplash.com/photo-1665686306574-1ace09918530?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJ1c2luZXNzfGVufDB8fDB8fHww",
    },
    {
      id: 3,
      title: "Finance",
      imgSrc: "https://images.unsplash.com/photo-1665686306574-1ace09918530?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJ1c2luZXNzfGVufDB8fDB8fHww",
    },
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

  const StyledCard = styled(Card)(({ theme }) => ({
    marginBottom: theme.spacing(2),
    boxShadow: theme.shadows[5],
  }));

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const handleBack = () => {
    navigate('/monthlyViewer')
  }
  return (
    <Box m="20px">
      <Header title="Event" />
      <Button
        variant="contained"
        onClick={handleBack}
        startIcon={<ArrowBackIcon />}
      >
        Back
      </Button>
      <div style={{ height: '100%', width: '100%', backgroundColor: colors.primary[400] }}>
        {/* <div style={{ width: '100%', height: '10%' }}>
          <EventFilters />
        </div> */}
        <div style={{ height: '89%', marginTop: '1%', width: '100%', overflowY: 'scroll' }}>
          <Typography variant="h3" component="h3" style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: '1.5% 0', width: '95%', marginLeft: 'auto', marginRight: 'auto', color: "#4CCEAC" }}>
            Suggested Event
          </Typography>
          <div style={{ height: '100%', width: '95%', marginLeft: 'auto', marginRight: 'auto' }}>
            <Grid container spacing={4}>
              {cardData.map((card) => (
                <Grid item key={card.id}>
                  <CardComponent title={card.title} imgSrc={card.imgSrc} />
                </Grid>

              ))}
            </Grid>
            <Grid container spacing={1} style={{ marginTop: '1%', flexWrap: 'wrap', justifyContent: 'space-between', gap: '1%', width: '97%', }}>
              {newCardData.map((data, i) => (
                <Grid item key={i} style={{ margin: 0, width: '32.4%', height: '45vh', position: 'relative' }}>
                  <CardMedia component="img" image={data.imgSrc} alt="Card Img2y" style={{ height: '100%', width: '100%', borderRadius: '8px', cursor: 'pointer' }} onClick={() => navigate("/eventdetail", { state: { data } })} />
                  <BookmarkBorderIcon style={{ position: 'absolute', right: '2%', top: '4%', color: 'white', fontSize: '2rem' }} />
                  <div style={{ position: 'absolute', bottom: '1%', width: '100%' }}>
                    <div style={{ width: '95%', marginLeft: 'auto', marginRight: 'auto', padding: '1% 3%', backgroundColor: 'rgba(0, 0, 0, 0.5)', borderRadius: '8px' }}>
                      <Typography variant="h5" component="small" style={{ fontSize: '1.25rem', color: "#4CCEAC" }}>Startup</Typography>
                      <Typography variant="body2" style={{ fontSize: '0.875rem', color: 'white', padding: '2% 0' }}>Fri, May 28, 3:30pm</Typography>
                      <Typography variant="body1" style={{ fontSize: '1rem', color: 'white', paddingBottom: '2%' }}>NYC, USA</Typography>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Button variant="contained" style={{ marginRight: '1%', padding: '1% 5%', backgroundColor: 'rgba(0, 0, 0, 0.5)', color: 'white', borderRadius: '24px' }} onClick={() => navigate("/ticket")}>
                          Buy tickets
                        </Button>
                        <Button variant="contained" style={{ padding: '1% 7%', display: 'flex', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)', color: 'white', borderRadius: '24px' }}>
                          {/* <ShareIcon style={{ fontSize: '1.5rem' }} /> */}
                        </Button>
                      </div>
                    </div>
                  </div>
                </Grid>
              ))}
            </Grid>
          </div>
        </div>
      </div>



    </Box>
  );
};

export default MonthlyViewerEvents;
