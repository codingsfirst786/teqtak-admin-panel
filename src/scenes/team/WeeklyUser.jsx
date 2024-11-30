import React, { useEffect, useState } from 'react';
import { Box, Table, TableBody, TableCell, Typography, TableContainer, TableHead, TableRow, Avatar, Paper, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { tokens } from '../../theme';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import DailyEnterpreneurUser from '../UserProfile/EnterpreneurUser/DailyEnterpreneurUser';
import axios from 'axios';

const WeeklyUser = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selectedUser, setSelectedUser] = useState(null);
  const [ dailyUser, setDailyUser] = useState([])
  console.log("dailyUser", dailyUser)
  const navigate = useNavigate();

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';
  useEffect(()=>{
    const fetchDailyUser = async () =>{
      try{
        const response = await axios.get(`${API_BASE_URL}/admin/info/users
          `);
          const result = response.data.weekUsers;
          console.log("Heyyyyyyy", result)
          setDailyUser(result)
      }
      catch(err){
        console.log(err)
      }
    }
    fetchDailyUser();
  },[])

  const handleProfileClick = (user) => {
    setSelectedUser(user);
  };

  const handleBackClick = () => {
    setSelectedUser(null); 
  };

  const HandleUser = () => {
    navigate('/team');
  };

  if (selectedUser) {
    return <DailyEnterpreneurUser user={selectedUser} onBack={handleBackClick} />;
  }

  return (
    <Box sx={{ height: "87vh", overflowY: "auto", padding: "20px" }}>
      <Box component={Paper} backgroundColor={colors.primary[400]}>
        <Box display="flex" alignItems="center" mb={2}>
          <IconButton onClick={HandleUser}>
            <ArrowBackIcon />
          </IconButton>
        </Box>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell color={colors.grey[100]}>Profile</TableCell>
              <TableCell align="right" color={colors.grey[100]}>Name</TableCell>
              <TableCell align="right" color={colors.grey[100]}>Email</TableCell>
              <TableCell align="right" color={colors.grey[100]}>Role</TableCell>
              <TableCell align="right" color={colors.grey[100]}>SignIn by</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dailyUser.map((user, index) => (
              <TableRow key={index}
              //  onClick={() => handleProfileClick(user)}
               style={{ cursor: 'pointer' }}>
                <TableCell component="th" scope="row">
                  <Avatar alt={user.name} src={user.picUrl} sx={{ width: 56, height: 56 }} />
                  {/* <Avatar alt={user.name} src={user.picUrl} sx={{ width: 56, height: 56 }} /> */}
                </TableCell>
                <TableCell align="right" color={colors.grey[100]}>{user.name}</TableCell>
                <TableCell align="right" color={colors.grey[100]}>{user.email}</TableCell>
                <TableCell align="right" color={colors.grey[100]}>{user.role.slice(0, 15)}{user.role.length > 15 ? '...' : ''}</TableCell>
                <TableCell align="right" color={colors.grey[100]}>{user.signedInBy}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
};

export default WeeklyUser;

