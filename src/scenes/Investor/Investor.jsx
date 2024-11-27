import { useEffect, useState } from "react";
import { Box, Typography, useTheme, Button, Avatar } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import TrafficIcon from "@mui/icons-material/Traffic";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import StatBox from "../../components/StatBox";
import StarIcon from '@mui/icons-material/Star';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PreviewIcon from '@mui/icons-material/Preview';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserVideo from "../../components/UserVideo";
import UserPodcast from "../../components/UserPodcast";
import UserEvents from "../../components/UserEvents";
import UserJobs from "../../components/UserJobs";
import { fetchAllInvestorsCount } from "../../Api/Investors/allInvestorCount.api";


const Investor = ({ onBack }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [teamData, setTeamData] = useState(mockDataTeam);
  const [selectedUser, setSelectedUser] = useState(null);
  const [count, setCount] = useState(0);
  const [dailyInvestorCount, setDailyInvestorCount] = useState(0);
  const [weeklyInvestorCount, setWeeklyInvestorCount] = useState(0);
  const [monthlyInvestorCount, setMonthlyInvestorCount] = useState(0);
  const navigate = useNavigate()

  const DailyInvestorHandle = () => {
    navigate('/dailyinvestor')
  }
  const WeeklyInvestorHandle = () => {
    navigate('/weeklyinvestor')
  }
  const MonthlyInvestorHandle = () => {
    navigate('/monthlyinvestor')
  }

  const handleViewProfileClick = (user) => {
    setSelectedUser(user);
  };

  const [investors, setInvestors] = useState([])

  useEffect(() => {
    const getUserCount = async () => {
      try {
        const users = await fetchAllInvestorsCount(); 
        setDailyInvestorCount(users.count.daily);
        setWeeklyInvestorCount(users.count.weekly)
        setMonthlyInvestorCount(users.count.monthly)
      } catch (error) {
        console.log(error);
      }
    };
    getUserCount();
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACK_URL}/admin/investors`)
        const result = await response.data;
        const updatedData = result.data.data.map(user => ({
          ...user,
          active: true
        }));

        setCount(result.data.count)
        console.log("Hey Investors", updatedData)
        setInvestors(updatedData);
      }
      catch (error) {
        console.error('Fetching data error', error);
      }
    }
    getData();
  }, [])

  const handleDelete = async (userId) => {

    try {
      // Sending DELETE request
      const response = await axios.delete(`${process.env.REACT_APP_BACK_URL}/admin/${userId}`);
      if (response.status === 200) {
        console.log("User deleted successfully:", response.data);
        // Optionally refresh the data or update the UI
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleActiveToggle = (userId) => {
    const updatedEntrepreneurData = investors.map((user) =>
      user.Users_PK === userId ? { ...user, active: !user.active } : user
    );
    setInvestors(updatedEntrepreneurData);
    if (selectedUser && selectedUser.Users_PK === userId) {
      setSelectedUser({ ...selectedUser, active: !selectedUser.active });
    }
  };

  const deActivateUser = async (id) => {
    const data = { "isBlocked": "true" }
    console.log('deavtivating ', id)
    const req = await fetch(`http://localhost:5000/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json' // Set the correct content-type header
      },
      body: JSON.stringify(data)
    })
    const d = await req.json()
    console.log({ d })
  }
  
  const handleBackClick = () => {
    setSelectedUser(null)
  }

  const columns = [
    {
      field: "id",
      headerName: "ID",
      valueGetter: (params) => params.row.Users_PK,
      minWidth: 150, // Explicit min width for ID 
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      valueGetter: (params) => params.row.name,
      cellClassName: (params) => params.row.active ? "name-column--cell" : "name-column--cell inactive",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      valueGetter: (params) => params.row.email,
      cellClassName: (params) => (params.row.active ? "" : "inactive"),
      minWidth: 200, // Emails are usually longer, so we set a larger minWidth
      flex: 1,
    },
    {
      field: "role",
      headerName: "Role",
      valueGetter: (params) => params.row.role,
      cellClassName: (params) => (params.row.active ? "" : "inactive"),
      minWidth: 150, // Set width for roles
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      renderCell: (params) => (
        <Box display="flex" gap="10px">
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleViewProfileClick(params.row)}
          >
            Profile
          </Button>
          {/* <Button
            variant="contained"
            color="secondary"
            onClick={() => handleDelete(params.row.Users_PK)} 
          >
            Delete
          </Button> */}
          <Button
            variant="contained"
            color={params.row.active ? "success" : "error"}
            onClick={() => {
              handleActiveToggle(params.row.Users_PK);
              console.log(params.row.Users_PK)
              deActivateUser(params.row.Users_PK)
            }}
          >
            {params.row.active ? "Deactivate" : "Activate"}
          </Button>
        </Box>
      ),
      minWidth: 300, // Ensure enough space for all buttons
      align: "center", // Center-align the actions
    }
  ]
  // State to control the video modal visibility
  const [openVedioModal, setOpenVideoModal] = useState(false);
  const [openPodcastModal, setOpenPodcastModal] = useState(false);
  const [openEventsModal, setOpenEventsModal] = useState(false);
  const [openJobsModal, setOpenJobsModal] = useState(false);

  // Handler for modal
  const handleOpenVideoModal = () => setOpenVideoModal(true);
  const handleCloseVideoModal = () => setOpenVideoModal(false);
  const handleOpenPodcastModal = () => setOpenPodcastModal(true);
  const handleClosePodcastModal = () => setOpenPodcastModal(false);
  const handleOpenEventsModal = () => setOpenEventsModal(true);
  const handleCloseEventsModal = () => setOpenEventsModal(false);
  const handleOpenJobsModal = () => setOpenJobsModal(true);
  const handleCloseJobsModal = () => setOpenJobsModal(false);

  const handlepodcast = () => {
    navigate('/dailyenterpreneurpodcast')
  }
  const handlevideo = () => {
    navigate('/dailyenterpreneurvideo')
  }
  const handlejobs = () => {
    navigate('/dailyenterpreneurjobs')
  }
  const handleevents = () => {
    navigate('/dailyenterpreneurevents')
  }

  if (selectedUser) {
    const textStyle = selectedUser.active
      ? {}
      : { color: 'red', filter: 'blur(2px)', textDecoration: 'line-through' };

    // Render the selected user's profile
    return (
      // <Box m="40px 0" display="flex" flexDirection="column" alignItems="center">
      //   <Box sx={{ width: '50%', padding: '20px', backgroundColor: colors.primary[400], textAlign: 'center' }}>
      //     <ArrowBackIcon onClick={handleBackClick} sx={{ cursor: 'pointer', fontSize: '2rem', mb: 2 }} />
      //     <Typography variant="body1" color={colors.grey[100]} gutterBottom sx={{ margin: '8px', ...textStyle }}>
      //       ID: {selectedUser.Users_PK}
      //     </Typography>
      //     <Typography variant="body1" color={colors.grey[100]} gutterBottom sx={{ margin: '8px', ...textStyle }}>
      //       Name: {selectedUser.name}
      //     </Typography>
      //     <Typography variant="body1" color={colors.grey[100]} gutterBottom sx={{ margin: '8px', ...textStyle }}>
      //       Password: {selectedUser.password}
      //     </Typography>
      //     <Typography variant="body1" color={colors.grey[100]} gutterBottom sx={{ margin: '8px', ...textStyle }}>
      //       Email: {selectedUser.email}
      //     </Typography>
      //     <Typography variant="body1" color={colors.grey[100]} gutterBottom sx={{ margin: '8px', ...textStyle }}>
      //       Role: {selectedUser.role}
      //     </Typography>
      //     <Button variant="contained" color={selectedUser.active ? 'success' : 'error'} onClick={() => handleActiveToggle(selectedUser.Users_PK)}>
      //       {selectedUser.active ? 'Deactivate' : 'Activate'}
      //     </Button>
      //   </Box>
      // </Box>
      <Box m="40px 0" display="flex" flexDirection="column" alignItems="center" >

        <Box
          display="flex"
          flexDirection={{ xs: 'column', sm: 'row' }}
          gap="20px"
          sx={{ width: "75%", minHeight: "220px" }}
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
            <Avatar alt={selectedUser.name} src={selectedUser.image} sx={{ width: '180px', height: '180px', border: `2px solid ${colors.grey[100]}` }} />
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
            <Typography variant="body2" color={colors.grey[100]} gutterBottom>
              {selectedUser.email}
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
          <Box backgroundColor={colors.primary[400]} display="flex" alignItems="center" padding="30px 5px" justifyContent="center" boxShadow="0 3px 10px rgba(0, 0, 0, 0.2)"
            onClick={handleOpenJobsModal}
          >
            <StatBox
              subtitle="Total Jobs"
              title="40"
              icon={<InsertInvitationIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
            />
          </Box>
          <Box backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center" boxShadow="0 3px 10px rgba(0, 0, 0, 0.2)"
            // onClick={handlepodcast}
            onClick={handleOpenPodcastModal}
          >
            <StatBox
              subtitle="Total Podcast"
              title="25"
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
              title="22"
              icon={<InsertInvitationIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
            />
          </Box>
          <Box backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center" boxShadow="0 3px 10px rgba(0, 0, 0, 0.2)"
            onClick={handleOpenEventsModal}
          >
            <StatBox
              subtitle="Total Events"
              title="19"
              icon={<InsertInvitationIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
            />
          </Box>
        </Box>
        <UserVideo open={openVedioModal} handleClose={handleCloseVideoModal} userId={selectedUser.Users_PK} />
        <UserEvents open={openEventsModal} handleClose={handleCloseEventsModal} userId={selectedUser.Users_PK} />
        <UserPodcast open={openPodcastModal} handleClose={handleClosePodcastModal} userId={selectedUser.Users_PK} />
        <UserJobs open={openJobsModal} handleClose={handleCloseJobsModal} userId={selectedUser.Users_PK} />
      </Box>
    );
  }

  return (
    <Box sx={{ height: "87vh", overflowY: "auto", padding: "20px" }}>
      <Box component="div" >
        <Box display="grid" gridTemplateColumns="repeat(6, 3fr)" gridAutoRows="140px" gap="20px">
          <Box display="flex" justifyContent="space-between" alignItems="center" gridColumn="span 6">
            <Header title="TOTAL INVESTOR" subtitle="Managing the All Investor" />
            {/* <Button variant="contained" color="primary">
              DELETE INVESTOR
            </Button> */}
          </Box>
        </Box>
        <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gridAutoRows="140px" gap="20px">
          <Box gridColumn="span 3" backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center" onClick={DailyInvestorHandle}>
            <StatBox
              subtitle="Daily Investor"
              title={dailyInvestorCount}
              icon={<InsertInvitationIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
            />
          </Box>
          <Box gridColumn="span 3" backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center" onClick={WeeklyInvestorHandle}>
            <StatBox
              title={weeklyInvestorCount}
              subtitle="Weekly Investor"
              icon={<InsertInvitationIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
            />
          </Box>
          <Box gridColumn="span 3" backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center" onClick={MonthlyInvestorHandle}>
            <StatBox
              title={monthlyInvestorCount}
              subtitle="Monthly Investor"
              icon={<InsertInvitationIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
            />
          </Box>
          <Box gridColumn="span 3" backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center">
            <StatBox
              title={`${count}`}
              subtitle="Total Investor"
              icon={<TrafficIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
            />
          </Box>
        </Box>

        <Box
          m="40px 0 0 0"
          height="75vh"
          sx={{
            "& .MuiDataGrid-root": { border: "none" },
            "& .MuiDataGrid-cell": { borderBottom: "none" },
            "& .name-column--cell": { color: colors.greenAccent[300] },
            "& .name-column--cell.inactive": { filter: 'blur(2px)', color: 'red', textDecoration: 'line-through' },
            "& .MuiDataGrid-columnHeaders": { backgroundColor: colors.blueAccent[700], borderBottom: "none" },
            "& .MuiDataGrid-virtualScroller": { backgroundColor: colors.primary[400] },
            "& .MuiDataGrid-footerContainer": { borderTop: "none", backgroundColor: colors.blueAccent[700] },
            "& .MuiCheckbox-root": { color: `${colors.greenAccent[200]} !important` },
          }}
        >
          <DataGrid
            rows={investors}
            columns={columns}
            getRowId={(row) => row.Users_PK}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Investor;
