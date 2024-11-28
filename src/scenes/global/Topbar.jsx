import { Box, IconButton, useTheme, Modal, Typography, Button, Avatar } from "@mui/material";
import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import profile from '../../assets/user.jpg'
import { formatDistanceToNow } from 'date-fns';


const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [open, setOpen] = useState(false); // Modal open state
  const navigate = useNavigate();

  // Function to handle opening and closing the modal
  const handleModalOpen = () => setOpen(true);
  const handleModalClose = () => setOpen(false);


  const handleMoreClick = () => {
    handleModalClose();
    navigate("/notification");
  };

  const [notification, setNotification] = useState([])
  const [count, setCount] = useState(0)

  useEffect(() => {
    const getnotification = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACK_URL}/notifications`)
        const result = response.data
        setCount(result.count)
        setNotification(result.data)
      }
      catch (err) {
        console.log("Notification error is that", err)
      }
    }
    getnotification();
  }, [])

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        {/* Notification Icon Button */}
        <IconButton onClick={handleModalOpen}>
          <Box>
            <NotificationsOutlinedIcon />
            <sup>{count}</sup>
          </Box>
        </IconButton>
        {/* <IconButton>
          <SettingsOutlinedIcon />
        </IconButton> */}
        <Link to="/admin-profile">
          <IconButton>
            <PersonOutlinedIcon />
          </IconButton>
        </Link>
      </Box>

      {/* Modal for notifications */}
      <Modal
        open={open}
        onClose={handleModalClose}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '10%',
            right: '5%',
            width: 280,
            backgroundColor: colors.primary[400],
            boxShadow: 24,
            py: 1,
            borderRadius: '8px',
          }}
        >
          <Typography variant="h4" fontWeight={"bold"} id="notifications-modal" mb={1} ml={1}>
            Notifications
          </Typography>
          {/* Notification Messages */}
          {notification.map((singlenotification, i) => (
               <Box
               sx={{
                 borderBottom: "1px solid gray",
                 marginTop: "3px",
                 marginLeft: "10px",
                 marginRight: "10px",
                 display: "flex", // Use flex for alignment
                 alignItems: "center", // Vertically align content
                 padding: "4px 0", // Some padding for spacing
               }}
             >
               <Avatar
                 alt={singlenotification.notiTitle}
                 src={singlenotification.user.picUrl}
                 sx={{ width: 42, height: 42, marginRight: 2 }} // Avatar size and right margin for spacing
               />
               <Box onClick={handleMoreClick} sx={{cursor:"pointer"}}>
                 <Typography variant="h6" sx={{color: colors.greenAccent[400]}}> {/* Use any color here or from theme */}
                   {singlenotification.notiTitle}
                 </Typography>
                 <Typography variant="body2">
                 Created: {formatDistanceToNow(new Date(singlenotification.createdAt))} ago
                 </Typography>
               </Box>
             </Box>
          )).slice(0, 3)}
          {/* More button */}
          <Button variant="contained" onClick={handleMoreClick} sx={{margin:"10px"}}>
            See All
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default Topbar;
