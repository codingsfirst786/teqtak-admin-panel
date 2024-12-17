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
import { fetchTickets } from "../../Api/Ticket/Ticket.Api";

const Ticket = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [tickets, setTickets] = useState([]); 
  const [count, setCount] = useState(0)
  const navigate = useNavigate();


  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetchTickets()
        const updatedData = response.data.map(ticket => ({
          ...ticket,
        }));

        console.log(response.count)
        setCount(response.count)
        console.log(updatedData)
        setTickets(updatedData);
      }
      catch (error) {
        console.error('Fetching data error', error);
      }
    }
    getData();
  }, [])

  const columns = [
    {
      field: "eventlocation",
      headerName: "Event Location",
      flex: 1,
      valueGetter: (params) => params.row.event.eventLocation,
      cellClassName: (params) => (params.row.active ? "" : "inactive"),
    },
    {
      field: "ticketBuyerId",
      headerName: "Buyer Name",
      flex: 1,
      valueGetter: (params) => params.row.buyer.name,
      renderCell: (params) => {
        return (
          <span
            style={{ cursor: "pointer" }}
            onClick={() => navigate('/userProfile', { state: { userPK: params.row.buyer.Users_PK } })}
          >
            {params.row.buyer.name}
          </span>
        );
      },
      cellClassName: (params) => (params.row.active ? "" : "inactive"),
    },
    {
      field: "ticketSellerId",
      headerName: "Seller Name",
      flex: 1,
      valueGetter: (params) => params.row.seller.name,
      renderCell: (params) => {
        return (
          <span
            // style={{ color: "blue", cursor: "pointer" }}
            style={{ cursor: "pointer" }}
            onClick={() => navigate('/userProfile', { state: { userPK: params.row.seller.Users_PK } })}
          >
            {params.row.seller.name}
          </span>
        );
      },
      cellClassName: (params) => (params.row.active ? "" : "inactive"),
    },
    {
      field: "createdAt",
      headerName: "Created At",
      flex: 1,
      valueGetter: (params) => params.row.createdAt,
      cellClassName: (params) => (params.row.active ? "" : "inactive"),
    },
    {
      field: "ticketEventId",
      headerName: "Ticket ID",
      flex: 1,
      valueGetter: (params) => params.row.ticketEventId,
      cellClassName: (params) => (params.row.active ? "" : "inactive"),
    },
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
          {/* <Box gridColumn="span 3" backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center">
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
          </Box> */}
          <Box gridColumn="span 3" backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center">
            <StatBox
              title={`${count}`}
              subtitle="Total Tickets"
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
