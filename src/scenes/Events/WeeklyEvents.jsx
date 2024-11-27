import { useEffect, useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { Card, CardMedia, CardContent, Typography, Button, Grid, IconButton } from '@mui/material';
import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { styled } from '@mui/material/styles';
import StatBox from "../../components/StatBox";
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import EventNoteIcon from '@mui/icons-material/EventNote';
import DateRangeIcon from '@mui/icons-material/DateRange';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from "axios";
import { fetchAllEventsCount } from "../../Api/Events/AllEventsCount";

const WeeklyEvents = () => {
    const [currentEvents, setCurrentEvents] = useState([]);
    const [count, setCount] = useState(0);
    const [events, setEvents] = useState([]);

    // useEffect(() => {
    //     const getData = async () => {
    //         try {
    //             const response = await axios.get(`${process.env.REACT_APP_BACK_URL}/events`);
    //             const result = await response.data;
    //             console.log("Fetched data:", result);
    //             console.log("count is");
    //             console.log(result.count);

    //             // Update events data
    //             const updatedData = result.data.map(user => ({
    //                 ...user,
    //                 active: true
    //             }));

    //             setCount(result.count);
    //             console.log(updatedData);
    //             setEvents(updatedData);
    //         } catch (error) {
    //             console.error('Fetching data error', error);
    //         }
    //     };
    //     getData();
    // }, []);


    useEffect(() => {
        const getEventsCount = async () => {
            try {
                const users = await fetchAllEventsCount();
                setEvents(users.todayEvents);
                console.log(users.todayEvents, "sagdhjshhvsgacvsgkdcs akghcvsdgjvchgsdcgsdc kgcgsdcvhgsc");

            } catch (error) {
                console.log(error);
            }
        };
        getEventsCount();
    }, []);
    const handleToggleActivation = async (eventId, currentStatus) => {
        console.log("this is event id ", eventId)
        try {
            const updatedStatus = currentStatus === "true" ? "false" : "true"; // Toggle the status
            const response = await axios.put(`${process.env.REACT_APP_BACK_URL}/events/${eventId}`, {
                isActivated: updatedStatus,
            });

            const updatedEvent = response.data;
            console.log("hello asdfasd", updatedEvent)
            // Update the state to reflect the changes in the UI
            setEvents((prevEvents) =>
                prevEvents.map((event) =>
                    event._id === updatedEvent._id ? { ...event, isActivated: updatedStatus } : event
                )
            );

            alert(`Event ${updatedStatus === "true" ? "activated" : "deactivated"} successfully.`);
        } catch (error) {
            console.error("Error toggling activation status:", error);
            alert("Error updating event status.");
        }
    };

    const HandleUser = () => {
        navigate('/events');
    };

    const navigate = useNavigate();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box sx={{ height: "87vh", overflowY: "auto", padding: "20px" }}>
            <Box display="flex" alignItems="center" mb={2}>
                <IconButton onClick={HandleUser}>
                    <ArrowBackIcon />
                </IconButton>
            </Box>
            <Header title="Event" subtitle="Managing Weekly Events" />
            <div style={{ padding: "10px 0px", marginTop: "10px", backgroundColor: colors.primary[400] }}>
                <Grid container spacing={1} style={{ padding: "10px", marginTop: '1%', flexWrap: 'wrap', justifyContent: 'space-between', gap: '1%' }}>
                    {events && events.length > 0 ? (
                        events.map((event) => (
                            <Grid item key={event._id} style={{ margin: 0, width: '32.4%', height: '45vh', position: 'relative' }}>
                                <CardMedia
                                    component="img"
                                    image={event.eventCoverUrl}
                                    alt="Card Img"
                                    style={{ height: '100%', width: '100%', borderRadius: '8px', cursor: 'pointer' }}
                                />
                                <div style={{ position: 'absolute', bottom: '1%', width: '100%' }}>
                                    <div style={{ width: '95%', marginLeft: "3px", padding: '1% 3%', backgroundColor: 'rgba(0, 0, 0, 0.5)', borderRadius: '8px' }}>
                                        <Typography variant="h5" component="small" style={{ fontSize: '1.25rem', color: "#4CCEAC" }}>Title: {event.eventTitle}</Typography>
                                        <Typography variant="body2" style={{ fontSize: '0.875rem', color: 'white', padding: '2% 0' }}>Location: {event.eventLocation}</Typography>
                                        <Typography variant="body1" style={{ fontSize: '1rem', color: 'white', paddingBottom: '2%' }}>Date: {event.eventDate}</Typography>
                                        <Button
                                            variant="contained"
                                            color={event.isActivated === "true" ? "error" : "primary"}
                                            onClick={() => handleToggleActivation(event._id, event.isActivated)}
                                        >
                                            {event.isActivated === "true" ? "Deactivate" : "Activate"}
                                        </Button>
                                    </div>
                                </div>
                            </Grid>
                        ))
                    ) : (
                        <Typography>No events available.</Typography>
                    )}
                </Grid>
            </div>

        </Box>
    );
};

export default WeeklyEvents;
