import { useEffect, useState } from "react";
import { Box, Typography, useTheme, Button, Avatar } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import InsertInvitationIcon from "@mui/icons-material/InsertInvitation";
import TrafficIcon from "@mui/icons-material/Traffic";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";
import StatBox from "../../components/StatBox";
import Header from "../../components/Header";
import axios from "axios";
import img from '../podcast/image1.jpeg'

const Ticket = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [tickets, setTickets] = useState([]); // State to hold fetched data
  const [count, setCount] = useState(0)
  const navigate = useNavigate();

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACK_URL}/tickets/`)
        const result = await response.data;
        console.log("Fetched data:", result);
        const updatedData = result.data.map(ticket => ({
          ...ticket,
          // active: true
        }));

        console.log(result.count)
        setCount(result.count)
        console.log(updatedData)
        setTickets(updatedData);
      }
      catch (error) {
        console.error('Fetching data error', error);
      }
    }
    getData();
  }, [])
  // const DailyEnterpreneurHandle = () => {
  //   navigate('/dailyEnterpreneur');
  // };

  // const WeeklyEnterpreneurHandle = () => {
  //   navigate('/weeklyEnterpreneur');
  // };

  // const MonthlyEnterpreneurHandle = () => {
  //   navigate('/monthlyEnterpreneur');
  // };

  // const TotalEnterpreneurHandle = () => {
  //   navigate('/totalyEnterpreneur');
  // };

  // const handleViewProfileClick = (user) => {
  //   setSelectedUser(user); // Set selected user for profile view
  // };

  // const handleBackClick = () => {
  //   setSelectedUser(null); // Reset to show the table
  // };

  const columns = [
    {
      field: "profile",
      headerName: "Profile",
      flex: 1,
      renderCell: (params) => (
        <Avatar alt={img} src={params.row.picUrl} />
      ),
    },
    // { field: "id", headerName: "ID", valueGetter: (params) => params.row.Users_PK },
    {
      field: "ticketBuyerId",
      headerName: "Buyer Id",
      flex: 1,
      valueGetter: (params) => params.row.ticketBuyerId,
      cellClassName: (params) => params.row.active ? "" : "inactive",
    },
    {
      field: "createdAt",
      headerName: "Created At",
      flex: 1,
      valueGetter: (params) => params.row.createdAt,
      cellClassName: (params) => params.row.active ? "" : "inactive",
    },
    {
      field: "ticketEventId",
      headerName: "Ticke Id",
      flex: 1,
      valueGetter: (params) => params.row.ticketEventId,
      cellClassName: (params) => params.row.active ? "" : "inactive",
    },
    {
      field: "ticketSellerId",
      headerName: "Seller Id",
      flex: 1,
      valueGetter: (params) => params.row.ticketSellerId,
      cellClassName: (params) => params.row.active ? "" : "inactive",
    },
    {
      field: "updatedAt",
      headerName: "Updated At",
      flex: 1,
      valueGetter: (params) => params.row.updatedAt,
      cellClassName: (params) => params.row.active ? "" : "inactive",
    }
   
  ];


  return (
    <Box sx={{height:"87vh",overflowY:"auto", padding:"20px"}}>
      <Box>
        <Box display="grid" gridTemplateColumns="repeat(6, 3fr)" gridAutoRows="140px" gap="20px">
          <Box display="flex" justifyContent="space-between" alignItems="center" gridColumn="span 6">
            <Header title="TOTAL TICKETS" subtitle="Managing the All Tickets" />
          </Box>
        </Box>
        <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gridAutoRows="140px" gap="20px">
          <Box gridColumn="span 3" backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center">
            <StatBox
              subtitle="Daily Tickets"
              title="40"
              icon={<InsertInvitationIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
            />
          </Box>
          <Box gridColumn="span 3" backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center">
            <StatBox
              title="90"
              subtitle="Weekly Tickets"
              icon={<InsertInvitationIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
            />
          </Box>
          <Box gridColumn="span 3" backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center">
            <StatBox
              title="60"
              subtitle="Monthly Tickets"
              icon={<InsertInvitationIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
            />
          </Box>
          <Box gridColumn="span 3" backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center">
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
          <DataGrid rows={tickets} columns={columns} getRowId={(row) => row._id} />
        </Box>
      </Box>
    </Box>
  );
};

export default Ticket;
