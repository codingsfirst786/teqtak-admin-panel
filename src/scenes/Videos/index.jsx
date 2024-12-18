import { Box, Button, Typography } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import StatBox from "../../components/StatBox";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import BackspaceIcon from "@mui/icons-material/Backspace";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { fetchAllVideoCount } from "../../Api/Video/AllVideoCount";
import { useInView } from "react-intersection-observer";

const Videos = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  const [videos, setVideos] = useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [dailyVideosCount, setDailyVideosCount] = useState(0);
  const [monthlyVideosCount, setMonthlyVideosCount] = useState(0);
  const [weeklyVideosCount, setWeeklyVideosCount] = useState(0);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACK_URL}/upload/videos/all`);
        const result = response.data;
        const updatedData = result.data.map((user) => ({
          ...user,
          active: true,
        }));

        setCount(result.count);
        setVideos(updatedData);
      } catch (error) {
        console.error("Fetching data error", error);
      }
    };
    getData();
  }, []);

  // Get Count By Date
  useEffect(() => {
    const getVideoCount = async () => {
      try {
        const users = await fetchAllVideoCount();
        setDailyVideosCount(users.count.daily);
        setWeeklyVideosCount(users.count.weekly);
        setMonthlyVideosCount(users.count.monthly);
      } catch (error) {
        console.log(error);
      }
    };
    getVideoCount();
  }, []);

  const handleDeleteVideo = async (vidId) => {
    try {
      await axios.post(`${process.env.REACT_APP_BACK_URL}/upload/delete/${vidId}`);
      setVideos((prevVideos) => prevVideos.filter((video) => video._id !== vidId));
    } catch (error) {
      console.error("Error deleting video:", error);
    }
  };

  const handleDailyVideos = () => navigate("/dailyVideos");
  const handleWeeklyVideos = () => navigate("/weeklyVideos");
  const handleMonthlyVideos = () => navigate("/monthlyVideos");
  const handleUser = (id) => navigate("/userProfile", { state: { userPK: id } });

  return (
    <Box sx={{ height: "87vh", overflowY: "auto" }}>
      <Box m="20px">
        <Box display="grid" gridTemplateColumns="repeat(6, 3fr)" gap="20px">
          <Box display="flex" justifyContent="space-between" alignItems="center" gridColumn="span 6">
            <Header title="TOTAL video" subtitle="Managing the All video" />
          </Box>
        </Box>
      </Box>

      <Box m="20px">
        <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap="20px">
          <Box
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            onClick={handleDailyVideos}
          >
            <StatBox
              subtitle="Daily Video"
              title={dailyVideosCount}
              icon={<PlayCircleIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
            />
          </Box>
          <Box
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            onClick={handleWeeklyVideos}
          >
            <StatBox
              title={weeklyVideosCount}
              subtitle="Weekly Video"
              icon={<OndemandVideoIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
            />
          </Box>
          <Box
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            onClick={handleMonthlyVideos}
          >
            <StatBox
              title={monthlyVideosCount}
              subtitle="Monthly Video"
              icon={<VideoLibraryIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
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
              subtitle="Total Video"
              icon={<LibraryAddIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
            />
          </Box>
        </Box>

        <Box my="20px" display="grid" gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap="20px">
          {videos.map((video, index) => {
            return (
              <VideoCard
                key={index}
                video={video}
                colors={colors}
                handleUser={handleUser}
                handleDeleteVideo={handleDeleteVideo}
              />
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

const VideoCard = ({ video, colors, handleUser, handleDeleteVideo }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });

  return (
    <Box
      ref={ref}
      backgroundColor={colors.primary[400]}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      padding="10px"
    >
      {inView ? (
        <video
          src={video.videoUrl}
          width="100%"
          height={"200px"}
          style={{ objectFit: "cover" }}
          controls
        ></video>
      ) : (
        <Box width="100%" height="200px" backgroundColor={colors.grey[500]} />
      )}
      <Button variant="contained" color="secondary" sx={{mt:"5px"}} onClick={() => handleUser(video.userId)}>
        View Profile
      </Button>
      <Typography px={1} borderRadius={1} position="relative" zIndex="1" top={-235} left={140}>
        <BackspaceIcon onClick={() => handleDeleteVideo(video._id)} />
      </Typography>
    </Box>
  );
};

export default Videos;
