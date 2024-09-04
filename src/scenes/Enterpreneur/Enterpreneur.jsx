import { useEffect, useState } from "react";
import { Box, Typography, useTheme, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import InsertInvitationIcon from "@mui/icons-material/InsertInvitation";
import TrafficIcon from "@mui/icons-material/Traffic";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";
import StatBox from "../../components/StatBox";
import Header from "../../components/Header";
import axios from "axios";

const Enterpreneur = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [entrepreneur, setEntrepreneur] = useState([]); // State to hold fetched data
  const [selectedUser, setSelectedUser] = useState(null); // State to handle selected user profile
  const [count, setCount] = useState(0)
  const navigate = useNavigate();

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/admin/entrepreneur
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

        // Set fetched data to state with active status as true by default
        const updatedData = result.data.data.map(user => ({
          ...user,
          active: true
        }));
        setCount(result.data.count)
        console.log(updatedData)
        setEntrepreneur(updatedData);
      } catch (error) {
        console.error('Fetching data error', error);
      }
    };
    getData();
  }, []);

  const DailyEnterpreneurHandle = () => {
    navigate('/dailyEnterpreneur');
  };

  const WeeklyEnterpreneurHandle = () => {
    navigate('/weeklyEnterpreneur');
  };

  const MonthlyEnterpreneurHandle = () => {
    navigate('/monthlyEnterpreneur');
  };

  const TotalEnterpreneurHandle = () => {
    navigate('/totalyEnterpreneur');
  };

  const handleViewProfileClick = (user) => {
    setSelectedUser(user); // Set selected user for profile view
  };

  const handleBackClick = () => {
    setSelectedUser(null); // Reset to show the table
  };

  const handleActiveToggle = (userId) => {
    const updatedEntrepreneurData = entrepreneur.map((user) =>
      user.Users_PK === userId ? { ...user, active: !user.active } : user
    );
    setEntrepreneur(updatedEntrepreneurData);
    if (selectedUser && selectedUser.Users_PK === userId) {
      setSelectedUser({ ...selectedUser, active: !selectedUser.active });
    }
  };

  const columns = [
    { field: "id", headerName: "ID", valueGetter: (params) => params.row.Users_PK },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      valueGetter: (params) => params.row.name,
      cellClassName: (params) => params.row.active ? "name-column--cell" : "name-column--cell inactive",
    },
    {
      field: "password",
      headerName: "Password",
      flex: 1,
      valueGetter: (params) => params.row.password,
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
            color={params.row.active ? "success" : "error"}
            onClick={() => handleActiveToggle(params.row.Users_PK)}
          >
            {params.row.active ? "Deactivate" : "Activate"}
          </Button>
        </Box>
      ),
    },
  ];

  if (selectedUser) {
    const textStyle = selectedUser.active
      ? {}
      : { color: 'red', filter: 'blur(2px)', textDecoration: 'line-through' };

    return (
      <Box m="40px 0" display="flex" flexDirection="column" alignItems="center">
        <Box sx={{ width: '50%', padding: '20px', backgroundColor: colors.primary[400], textAlign: 'center' }}>
          <ArrowBackIcon onClick={handleBackClick} sx={{ cursor: 'pointer', fontSize: '2rem', mb: 2 }} />
          {/* <Typography variant="h4" sx={{ color: '#4CCEAC', margin: '8px', ...textStyle }} gutterBottom>
            {selectedUser.name.S}
          </Typography> */}
          <Typography variant="body1" color={colors.grey[100]} gutterBottom sx={{ margin: '8px', ...textStyle }}>
            ID: {selectedUser.Users_PK}
          </Typography>
          <Typography variant="body1" color={colors.grey[100]} gutterBottom sx={{ margin: '8px', ...textStyle }}>
            Name: {selectedUser.name}
          </Typography>
          <Typography variant="body1" color={colors.grey[100]} gutterBottom sx={{ margin: '8px', ...textStyle }}>
            Password: {selectedUser.password}
          </Typography>
          <Typography variant="body1" color={colors.grey[100]} gutterBottom sx={{ margin: '8px', ...textStyle }}>
            Email: {selectedUser.email}
          </Typography>
          <Typography variant="body1" color={colors.grey[100]} gutterBottom sx={{ margin: '8px', ...textStyle }}>
            Role: {selectedUser.role}
          </Typography>
          <Button variant="contained" color={selectedUser.active ? 'success' : 'error'} onClick={() => handleActiveToggle(selectedUser.Users_PK)}>
            {selectedUser.active ? 'Deactivate' : 'Activate'}
          </Button>
        </Box>
      </Box>
    );
  }

  return (
    <Box m="20px">
      <Box>
        <Box display="grid" gridTemplateColumns="repeat(6, 3fr)" gridAutoRows="140px" gap="20px">
          <Box display="flex" justifyContent="space-between" alignItems="center" gridColumn="span 6">
            <Header title="TOTAL ENTERPRENEUR" subtitle="Managing the All Enterpreneur" />
          </Box>
        </Box>
        <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gridAutoRows="140px" gap="20px">
          <Box gridColumn="span 3" backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center" onClick={DailyEnterpreneurHandle}>
            <StatBox
              subtitle="Daily Enterpreneur"
              title="40"
              icon={<InsertInvitationIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
            />
          </Box>
          <Box gridColumn="span 3" backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center" onClick={WeeklyEnterpreneurHandle}>
            <StatBox
              title="90"
              subtitle="Weekly Enterpreneur"
              icon={<InsertInvitationIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
            />
          </Box>
          <Box gridColumn="span 3" backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center" onClick={MonthlyEnterpreneurHandle}>
            <StatBox
              title="60"
              subtitle="Monthly Enterpreneur"
              icon={<InsertInvitationIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
            />
          </Box>
          <Box gridColumn="span 3" backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center" onClick={TotalEnterpreneurHandle}>
            <StatBox
              title={`${count}`}
              subtitle="Total Enterpreneur"
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
          <DataGrid rows={entrepreneur} columns={columns} getRowId={(row) => row.Users_PK} />
        </Box>
      </Box>
    </Box>
  );
};

export default Enterpreneur;
