import React, { useEffect, useState } from "react";
import {
    Modal,
    Box,
    Typography,
    IconButton,
    Grid,
    Card,
    CardMedia,
    CardActionArea,
    useTheme,
    Button
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { tokens } from "../theme";
import img1 from '../scenes/podcast/image1.jpeg'
import img2 from '../scenes/podcast/img2.jpeg'
import img3 from '../scenes/podcast/img3.jpeg'
import img4 from '../scenes/podcast/img4.jpeg'
import img5 from '../scenes/podcast/img5.jpeg'
import axios from "axios";


const UserPodcast = ({ open, handleClose, data }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [myPodcast, setMyPodcast] = useState([]);

    // useEffect(() => {
    //     const getData = async () => {
    //         try {
    //             const response = await axios.get(`${process.env.REACT_APP_BACK_URL}/users/${userId}`);

    //             const podcast = await response.data.data.podcast;
    //             const podcastLength = await response.data.data.podcast.length;
    //             console.log("videoLength", podcastLength)

    //             console.log("My Single user Podcast is ", podcast)
    //             setMyPodcast(podcast)

    //         } catch (err) {
    //             console.error("Testing Error is ", err);
    //         }
    //     };

    //     if (userId) {
    //         getData();
    //     }
    // }, [userId]);
    console.log(data, '========================================')
    return (
        <Modal open={open} onClose={handleClose}>
            <Box
                backgroundColor={colors.primary[400]}
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "50%",
                    height: '60vh',
                    borderRadius: 2,
                    overflowY: "auto",
                    boxShadow: 24,
                    p: 4,
                    maxHeight: "80vh"
                }}
            >
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h5" fontWeight="bold">
                        Podcast
                    </Typography>
                    <IconButton onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                <Grid container spacing={2} justifyContent="center">
                    {data.map((podcast) => (
                        <Grid item xs={12} sm={6} key={podcast._id}>
                            <Card
                                sx={{
                                    position: "relative",
                                    height: { xs: "30vh", sm: "37vh" },
                                    cursor: "pointer",
                                }}
                            >
                                <CardActionArea sx={{ height: "100%" }}>
                                    <CardMedia
                                        component="img"
                                        src={podcast.picUrl}
                                        sx={{ height: "100%", objectFit: "cover" }}
                                        alt={podcast.episodeTitle}
                                    />
                                    <Box position="absolute" bottom={0} left={0} width="100%" bgcolor="rgba(0,0,0,0.6)" color="white" p={2}>
                                        <Typography variant="h6" style={{ color: "#4CCEAC" }}>{podcast.episodeTitle}</Typography>
                                        <Typography variant="body2">Podcast Number: {podcast.episodeNumber}</Typography>
                                        <Box display="flex" justifyContent="space-between" mt={1}>
                                            <Typography variant="body2" display="flex" alignItems="center" gap={1}>
                                                {podcast.podcastType}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Modal>
    );
};

export default UserPodcast;
