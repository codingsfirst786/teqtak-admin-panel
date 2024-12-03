import { useEffect, useState } from "react";
import { Box, Typography, useTheme, Button, Avatar } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import StarIcon from '@mui/icons-material/Star';
import { tokens } from "../../theme";
import InsertInvitationIcon from "@mui/icons-material/InsertInvitation";
import TrafficIcon from "@mui/icons-material/Traffic";
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";
import StatBox from "../../components/StatBox";
import Header from "../../components/Header";
import axios from "axios";
import img from '../podcast/image1.jpeg'
import UserVideo from "../../components/UserVideo";
import UserPodcast from "../../components/UserPodcast";
import UserEvents from "../../components/UserEvents";
import UserJobs from "../../components/UserJobs";
import { fetchAllUserCount } from "../../Api/AllUser/AllUserCount.api";

const Team = ({ onBack, userId }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [team, setTeam] = useState([]);
  
  const [selectedUser, setSelectedUser] = useState(null);
  const [count, setCount] = useState(0)
  const [dailyUserCount, setDailyUserCount] = useState(0)
  const [monthlyUserCount, setMonthlyUserCount] = useState(0)
  const [weeklyUserCount, setWeeklyUserCount] = useState(0)
  const [refresh, setRefresh] = useState(false)
  const navigate = useNavigate();


  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACK_URL}/admin/allusers
`);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchData();
        console.log("Fetched data:", result);

        const updatedData = result.data.map(user => ({
          ...user,
          active: true
        }));
        setCount(result.count)
        console.log("this is updated data", updatedData)
        setTeam(updatedData);
      } catch (error) {
        console.error('Fetching data error', error);
      }
    };
    getData();
  }, [refresh]);

  const DailyUserHandle = () => {
    navigate('/dailyuser');
  };

  const WeeklyUserHandle = () => {
    navigate('/weeklyuser');
  };

  const MonthlyUserHandle = () => {
    navigate('/monthlyuser');
  };


  const handleViewProfileClick = (user) => {
    setSelectedUser(user);
  };

  const handleBackClick = () => {
    setSelectedUser(null);
  };



  const deActivateUser = async (id, currentStatus) => {
    console.log(currentStatus, "currentStatus");
    
    const isBlocked = currentStatus === "true";
    const updatedStatus = !isBlocked; 
    const data = { "isBlocked": updatedStatus.toString() }; 
  
    console.log('Toggling block status for user ID:', id, 'New Status:', updatedStatus);
  
    try {
      const req = await fetch(`${process.env.REACT_APP_BACK_URL}/users/update/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
  
      const response = await req.json();
      console.log('Response:', response);
      setRefresh(!refresh)
  
    } catch (error) {
      console.error('Error updating user status:', error);
    }
  };

  useEffect(() => {
    const getUserCount = async () => {
      try {
        const users = await fetchAllUserCount();
        setDailyUserCount(users.count.daily);
        setWeeklyUserCount(users.count.weekly)
        setMonthlyUserCount(users.count.monthly)
      } catch (error) {
        console.log(error);
      }
    };
    getUserCount();
  }, []);

  const columns = [
    {
      field: "profile",
      headerName: "Profile",
      flex: 1,
      renderCell: (params) => (
        <Avatar alt={img} src={params.row.picUrl} />
      ),
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      valueGetter: (params) => params.row.name,
      cellClassName: (params) => params.row.active ? "name-column--cell" : "name-column--cell inactive",
    },
    {
      field: "isBlocked",
      headerName: "Status",
      flex: 1,
      valueGetter: (params) => params.row.isBlocked,
      cellClassName: (params) => params.row.active ? "" : "inactive",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      valueGetter: (params) => params.row.email,
      cellClassName: (params) => params.row.active ? "" : "inactive",
    },
    {
      field: "role",
      headerName: "Role",
      flex: 1,
      valueGetter: (params) => params.row.role,
      cellClassName: (params) => params.row.active ? "" : "inactive",
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
        <Box display="flex" gap="10px">
          <Button variant="contained" color="primary" onClick={() => handleViewProfileClick(params.row)}>
            Profile
          </Button>
          <Button
            variant="contained"
            color={params.row.isBlocked === "true" ? "error" : "success"}
            onClick={() => {
              console.log("Helllo ",params.row.Users_PK, params.row.isBlocked);
              deActivateUser(params.row.Users_PK, params.row.isBlocked); 
            }}
          >
            {params.row.isBlocked === "true" ? "Activate" : "Deactivate"}
          </Button>
        </Box>
      ),
    },
  ];

  // State to control the video modal visibility
  const [openVedioModal, setOpenVideoModal] = useState(false);
  const [openPodcastModal, setOpenPodcastModal] = useState(false);
  const [openEventsModal, setOpenEventsModal] = useState(false);
  const [openJobsModal, setOpenJobsModal] = useState(false);
  const [userDataJobsCount, setUserDataJobsCount] = useState(0);
  const [userDataVideoCount, setUserDataVideoCount] = useState(0);
  const [userDataPodcastCount, setUserDataPodcastCount] = useState(0);
  const [userDataEventCount, setUserDataEventCount] = useState(0);
  const [userDataJobs, setUserDataJobs] = useState([]);
  const [userDataVideo, setUserDataVideo] = useState([]);
  const [userDataPodcast, setUserDataPodcast] = useState([]);
  const [userDataEvent, setUserDataEvent] = useState([]);

  // Handler for modal
  const handleOpenVideoModal = () => setOpenVideoModal(true);
  const handleCloseVideoModal = () => setOpenVideoModal(false);
  const handleOpenPodcastModal = () => setOpenPodcastModal(true);
  const handleClosePodcastModal = () => setOpenPodcastModal(false);
  const handleOpenEventsModal = () => setOpenEventsModal(true);
  const handleCloseEventsModal = () => setOpenEventsModal(false);
  const handleOpenJobsModal = () => setOpenJobsModal(true);
  const handleCloseJobsModal = () => setOpenJobsModal(false);

  useEffect(() => {
    if (selectedUser) {
      const fetchUserDataCount = async () => {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_BACK_URL}/users/${selectedUser.Users_PK}`
          );
          const jobsData = response.data.data.jobs; 
          const podcastData = response.data.data.podcast; 
          const eventData = response.data.data.events; 
          const videoData = response.data.data.videos; 
          setUserDataJobsCount(jobsData); 
          setUserDataEventCount(eventData); 
          setUserDataPodcastCount(podcastData); 
          setUserDataVideoCount(videoData); 
          setUserDataJobs(jobsData)
          setUserDataEvent(eventData)
          setUserDataPodcast(podcastData)
          setUserDataVideo(videoData)
          console.log(response.data, "Hello Selected user data count"); 
        } catch (error) {
          console.error("Error fetching user data count:", error);
        }
      };
  
      fetchUserDataCount();
    }
  }, [selectedUser]);


  if (selectedUser) {
    const textStyle = selectedUser.active
      ? {}
      : { color: 'red', filter: 'blur(2px)', textDecoration: 'line-through' };

    return (
      <Box m="40px 0" display="flex" flexDirection="column" alignItems="center" >
        <Box
          display="flex"
          flexDirection={{ xs: 'column', sm: 'row' }}
          gap="20px"
          sx={{ width: "75%", height: "250px" }}
        >
          {/* Left side: Profile Image */}
          <Box
            flexBasis={{ xs: '100%', sm: '30%' }}
            display="flex"
            alignItems="center"
            justifyContent="center"
            backgroundColor={colors.primary[400]}
            padding="20px"
            borderRadius="8px"
            boxShadow="0 3px 10px rgba(0, 0, 0, 0.2)"
          >
            <Avatar alt={selectedUser.name} src={selectedUser.picUrl} sx={{ width: '180px', height: '180px', border: `2px solid ${colors.grey[100]}` }} />
          </Box>
          {/* Right side: User Data */}
          <Box
            flexBasis={{ xs: '100%', sm: '70%' }}
            backgroundColor={colors.primary[400]}
            padding="20px"
            borderRadius="8px"
            boxShadow="0 3px 10px rgba(0, 0, 0, 0.2)"
          >
            <Typography variant="h4" sx={{ color: '#4CCEAC', marginTop: '12px' }} gutterBottom>
              {selectedUser.name}
            </Typography>
            <Typography variant="subtitle1" color={colors.grey[100]} gutterBottom>
              {selectedUser.role}
            </Typography>
            <Typography variant="subtitle1" color={colors.grey[100]} gutterBottom>
              Email{selectedUser.email}
            </Typography>

            {/* Rating component with yellow icon */}
            <Box display="flex" alignItems="center" marginBottom="10px">
              <Box>
                <StarIcon sx={{ color: '#FFD700', marginRight: '2px' }} />
                <StarIcon sx={{ color: '#FFD700', marginRight: '2px' }} />
                <StarIcon sx={{ color: '#FFD700', marginRight: '2px' }} />
                <StarIcon sx={{ color: '#FFD700', marginRight: '2px' }} />
                <StarIcon sx={{ color: '#FFD700', marginRight: '2px' }} />
              </Box>
              <Typography variant="body2" color={colors.grey[100]}>
                4.7 out of 5
              </Typography>
            </Box>
            <Typography variant="body2" color={colors.grey[100]} gutterBottom>
              Global rating
            </Typography>
            <Button variant="contained" sx={{ backgroundColor: '#4CCEAC', marginTop: '20px' }} onClick={handleBackClick}>
              Back to List
            </Button>
          </Box>
        </Box>
        {/* StatBoxes */}
        <Box
          display="grid"
          gridTemplateColumns="repeat(4, 1fr)"
          gap="10px"
          mt="30px"
          sx={{ width: "75%" }}
        >
          <Box backgroundColor={colors.primary[400]} display="flex" alignItems="center" padding="30px 5px" justifyContent="center" boxShadow="0 3px 10px rgba(0, 0, 0, 0.2)" onClick={handleOpenJobsModal}>
            <StatBox
              subtitle="Total Jobs"
              title={userDataJobsCount.length}
              icon={<InsertInvitationIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
            />
          </Box>
          <Box backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center" boxShadow="0 3px 10px rgba(0, 0, 0, 0.2)"
            // onClick={handlepodcast}
            onClick={handleOpenPodcastModal}
          >
            <StatBox
              subtitle="Total Podcast"
              title={userDataPodcastCount.length}
              icon={<InsertInvitationIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
            />
          </Box>
          <Box
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            boxShadow="0 3px 10px rgba(0, 0, 0, 0.2)"
            // onClick={handledailyviewer}
            // onClick={handlevideo}
            onClick={handleOpenVideoModal}
          >
            <StatBox
              subtitle="Total Video"
              title={userDataVideoCount.length}
              icon={<InsertInvitationIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
            />
          </Box>
          <Box backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center" boxShadow="0 3px 10px rgba(0, 0, 0, 0.2)" onClick={handleOpenEventsModal}>
            <StatBox
              subtitle="Total Events"
              title={userDataEventCount.length}
              icon={<InsertInvitationIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
            />
          </Box>
        </Box>
        <UserVideo open={openVedioModal} handleClose={handleCloseVideoModal} data={userDataVideo} />
        <UserEvents open={openEventsModal} handleClose={handleCloseEventsModal} data={userDataEvent} />
        <UserPodcast open={openPodcastModal} handleClose={handleClosePodcastModal} data={userDataPodcast} />
        <UserJobs open={openJobsModal} handleClose={handleCloseJobsModal} data={userDataJobs} />
      </Box>
    );
  }

  return (
    <Box sx={{ height: "87vh", overflowY: "auto", padding: "20px" }}>
      <Box>
        <Box display="grid" gridTemplateColumns="repeat(6, 3fr)" gridAutoRows="140px" gap="20px">
          <Box display="flex" justifyContent="space-between" alignItems="center" gridColumn="span 6">
            <Header title="TOTAL USERS" subtitle="Managing the All Users" />
          </Box>
        </Box>
        <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gridAutoRows="140px" gap="20px">
          <Box gridColumn="span 3" backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center" onClick={DailyUserHandle}>
            <StatBox
              subtitle="Daily User"
              title={dailyUserCount}
              icon={<InsertInvitationIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
            />
          </Box>
          <Box gridColumn="span 3" backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center" onClick={WeeklyUserHandle}>
            <StatBox
              title={weeklyUserCount}
              subtitle="Weekly User"
              icon={<InsertInvitationIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
            />
          </Box>
          <Box gridColumn="span 3" backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center" onClick={MonthlyUserHandle}>
            <StatBox
              title={monthlyUserCount}
              subtitle="Monthly User"
              icon={<InsertInvitationIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
            />
          </Box>
          <Box gridColumn="span 3" backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center">
            <StatBox
              title={`${count}`}
              subtitle="Total User"
              icon={<TrafficIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
            />
          </Box>
        </Box>

        <Box m="40px 0 0 0" height="75vh" sx={{
          "& .MuiDataGrid-root": { border: "none" },
          "& .MuiDataGrid-cell": { borderBottom: "none" },
          "& .name-column--cell": { color: colors.greenAccent[300] },
          "& .name-column--cell.inactive": { filter: 'blur(2px)', color: 'red', textDecoration: 'line-through' },
          "& .MuiDataGrid-columnHeaders": { backgroundColor: colors.blueAccent[700], borderBottom: "none" },
          "& .MuiDataGrid-virtualScroller": { backgroundColor: colors.primary[400] },
          "& .MuiDataGrid-footerContainer": { borderTop: "none", backgroundColor: colors.blueAccent[700] },
        }}>
          <DataGrid rows={team} columns={columns} getRowId={(row) => row.Users_PK} />
        </Box>
      </Box>
    </Box>
  );
};

export default Team;
