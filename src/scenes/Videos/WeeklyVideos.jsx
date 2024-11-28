import { Box, IconButton, Typography } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useEffect, useState } from "react";
import axios from "axios";
import BackspaceIcon from '@mui/icons-material/Backspace';
import { useNavigate } from "react-router-dom";
import { fetchAllVideoCount } from "../../Api/Video/AllVideoCount";


const WeeklyVideos = () => {
  const [videos, setVideos] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const getVideoCount = async () => {
        try {
            const users = await fetchAllVideoCount();
            setVideos(users.weeklyVideos);
            console.log("sdvcbjncshcbscsc  chgasuics  ygcsch csdc", users)

        } catch (error) {
            console.log(error);
        }
    };
    getVideoCount();
}, []);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


  const handleDeleteVideo = async (vidId) => {
    try {
      await axios.post(`http://localhost:5000/upload/delete/${vidId}`);
      setVideos((prevVideos) => prevVideos.filter((video) => video._id !== vidId));

    } catch (error) {
      console.error("Error deleting video:", error);
    }
  };


  return (
    <>

      <Box sx={{ height: "87vh", overflowY: "auto" }}>
        <Box m="20px">
          <IconButton onClick={() => navigate('/videos')} sx={{ mb: 2 }}>
            <ArrowBack />
          </IconButton>
          <Box
            display="grid"
            gridTemplateColumns="repeat(6, 3fr)"
            gridAutoRows="140px"
            gap="20px"
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              gridColumn="span 6"
            >
              <Header title="DAILY VIDEO" subtitle="Managing Daily Video" />
            </Box>
          </Box>
        </Box>

        <Box m="20px">
          <Box
            my="20px"
            display="grid"
            gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr))"
            gap="20px"
          >
            {videos.map((video, index) => (
              <Box
                key={index}
                backgroundColor={colors.primary[400]}
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                padding="10px"
              >

                <video
                  src={video.videoUrl}
                  width="100%"
                  height={"200px"}
                  style={{ objectFit: "cover" }}
                  controls
                ></video>
                <Typography px={1} borderRadius={1} position={'relative'} zIndex={'1'} top={-200} left={134}>
                  <BackspaceIcon
                    onClick={() => handleDeleteVideo(video._id)}
                  />
                </Typography>
              </Box>
            ))}
          </Box>

        </Box>
      </Box>
    </>

  );
};

export default WeeklyVideos;
