import { Box, useTheme, Button, Typography, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from "react";
import { tokens } from "../../../theme";
import Header from "../../../components/Header";

let initialSearchData = [
  {
    id: 1,
    categ: "Marketing head",
    ago: "1 week ago",
    state: "United States (Hybrid)",
    price: "$80k/yr-$100k/yr",
  },
  {
    id: 2,
    categ: "Marketing head",
    ago: "1 week ago",
    state: "United States (Hybrid)",
    price: "$80k/yr-$100k/yr",
  },
  {
    id: 3,
    categ: "Brand Designer",
    ago: "1 week ago",
    state: "United States (Hybrid)",
    price: "$80k/yr-$100k/yr",
  },
  {
    id: 4,
    categ: "Brand Designer",
    ago: "1 week ago",
    state: "United States (Hybrid)",
    price: "$80k/yr-$100k/yr",
  },
  {
    id: 5,
    categ: "Brand Developer",
    ago: "1 week ago",
    state: "United States (Hybrid)",
    price: "$80k/yr-$1200k/yr",
  },
  {
    id: 6,
    categ: "Brand Designer",
    ago: "1 week ago",
    state: "United States (Hybrid)",
    price: "$80k/yr-$1000k/yr",
  },
];

const DailyInvestorJobs = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [searchData, setSearchData] = useState(initialSearchData);
  const [notificationMessage, setNotificationMessage] = useState('');

  const handleBack = () => {
    navigate('/dailyinvestor');
  };

  const handleDelete = (id) => {
    const updatedData = searchData.filter(job => job.id !== id);
    setSearchData(updatedData);
  };

  const handleNotification = (id) => {
    const message = prompt("Enter your notification message:");
    if (message) {
      setNotificationMessage(message);
      // Here, you can handle the notification logic as needed, e.g., sending it to a server or storing it in a state.
      console.log(`Notification for job ${id}: ${message}`);
    }
  };

  return (
    <Box m="20px">
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
          <Header title="TOTAL Jobs" subtitle="Managing the All Jobs" />
        </Box>
      </Box>
      <Button
        variant="contained"
        onClick={handleBack}
        startIcon={<ArrowBackIcon />}
      >
        Back
      </Button>
      <Box my={3} backgroundColor={colors.primary[400]} p={4}>
        <Box
          display="flex"
          flexWrap="wrap"
          gap={2}
          overflow="hidden"
        >
          {searchData.map((elm, ind) => (
            <Box
              key={elm.id}
              height="auto"
              width={{ xs: "100%", sm: "48%", md: "32%" }}
              flexShrink={0}
              boxShadow={3}
              borderRadius={2}
              border={1}
              borderColor="grey.300"
              position="relative"
              p={2}
              mb={2}
            >
              <Box>
                <Box display="flex" gap={2} alignItems="center">
                  <IconButton
                    style={{
                      backgroundColor: "rgb(61,165,138)",
                      borderRadius: "50%",
                      color: "white",
                      fontSize: "2rem",
                      padding: "0.5rem",
                    }}
                  >
                    {/* <TbBrandNeteaseMusic /> */}
                  </IconButton>
                  <Box>
                    <Typography variant="h6" fontWeight="bold" style={{ color: "#4CCEAC" }}>
                      {elm.categ}
                    </Typography>
                    <Typography variant="body2">{elm.ago}</Typography>
                  </Box>
                </Box>
                <Typography variant="body2" mt={2} color="textSecondary">
                  {elm.state}
                </Typography>
                <Typography variant="body2" mt={1} color="textSecondary">
                  {elm.price}
                </Typography>
              </Box>
              <Box textAlign="center">
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    mt: 2,
                    bgcolor: "#EEEEEE",
                    color: "black",
                    "&:hover": {
                      bgcolor: "#6166f331",
                      color: "#6165F3",
                    },
                  }}
                  onClick={() => handleNotification(elm.id)}
                  startIcon={<NotificationsIcon />}
                >
                  Notification
                </Button>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    mt: 2,
                    bgcolor: "#FF0000",
                    color: "white",
                    "&:hover": {
                      bgcolor: "#FF5555",
                    },
                  }}
                  onClick={() => handleDelete(elm.id)}
                  startIcon={<DeleteIcon />}
                >
                  Delete
                </Button>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default DailyInvestorJobs;
