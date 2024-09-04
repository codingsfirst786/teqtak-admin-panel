import React, { useState } from 'react';
import { Box, Table, TableBody, TableCell, Typography, TableContainer, TableHead, TableRow, Avatar, Paper, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { tokens } from '../theme';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import UserProfile from './userProfile';

const users = [
  {
    name: "Jessica Jones",
    role: "Solution Manager - Creative Tim Officer",
    location: "Bucharest, Romania",
    education: "University of Computer Science",
    description: "Ryan — the name taken by Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs and records all of his own music.",
    image: "https://media.istockphoto.com/id/1682296067/photo/happy-studio-portrait-or-professional-man-real-estate-agent-or-asian-businessman-smile-for.webp?b=1&s=170667a&w=0&k=20&c=V-RXoAk73ljzQZd0w_JcCFG-jlYs6sjpcrIZQ1TersQ="
  },
  {
    name: "John Doe",
    role: "Marketing Manager - ABC Company",
    location: "New York, USA",
    education: "University of Marketing",
    description: "John is a seasoned marketing manager with over a decade of experience in the field.",
    image: "https://media.istockphoto.com/id/1156411992/photo/portrait-of-a-business-man.jpg?s=612x612&w=0&k=20&c=gnv9XtMjWhCujhmZplZY-FAaOSmlNjzoMV6lYJ-eDjo="
  },
  {
    name: "Jessica Jones",
    role: "Solution Manager - Creative Tim Officer",
    location: "Bucharest, Romania",
    education: "University of Computer Science",
    description: "Ryan — the name taken by Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs and records all of his own music.",
    image: "https://media.istockphoto.com/id/1682296067/photo/happy-studio-portrait-or-professional-man-real-estate-agent-or-asian-businessman-smile-for.webp?b=1&s=170667a&w=0&k=20&c=V-RXoAk73ljzQZd0w_JcCFG-jlYs6sjpcrIZQ1TersQ="
  },
  {
    name: "John Doe",
    role: "Marketing Manager - ABC Company",
    location: "New York, USA",
    education: "University of Marketing",
    description: "John is a seasoned marketing manager with over a decade of experience in the field.",
    image: "https://media.istockphoto.com/id/1156411992/photo/portrait-of-a-business-man.jpg?s=612x612&w=0&k=20&c=gnv9XtMjWhCujhmZplZY-FAaOSmlNjzoMV6lYJ-eDjo="
  },
  {
    name: "Jessica Jones",
    role: "Solution Manager - Creative Tim Officer",
    location: "Bucharest, Romania",
    education: "University of Computer Science",
    description: "Ryan — the name taken by Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs and records all of his own music.",
    image: "https://media.istockphoto.com/id/1682296067/photo/happy-studio-portrait-or-professional-man-real-estate-agent-or-asian-businessman-smile-for.webp?b=1&s=170667a&w=0&k=20&c=V-RXoAk73ljzQZd0w_JcCFG-jlYs6sjpcrIZQ1TersQ="
  },
  {
    name: "John Doe",
    role: "Marketing Manager - ABC Company",
    location: "New York, USA",
    education: "University of Marketing",
    description: "John is a seasoned marketing manager with over a decade of experience in the field.",
    image: "https://media.istockphoto.com/id/1156411992/photo/portrait-of-a-business-man.jpg?s=612x612&w=0&k=20&c=gnv9XtMjWhCujhmZplZY-FAaOSmlNjzoMV6lYJ-eDjo="
  },
  {
    name: "Jessica Jones",
    role: "Solution Manager - Creative Tim Officer",
    location: "Bucharest, Romania",
    education: "University of Computer Science",
    description: "Ryan — the name taken by Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs and records all of his own music.",
    image: "https://media.istockphoto.com/id/1682296067/photo/happy-studio-portrait-or-professional-man-real-estate-agent-or-asian-businessman-smile-for.webp?b=1&s=170667a&w=0&k=20&c=V-RXoAk73ljzQZd0w_JcCFG-jlYs6sjpcrIZQ1TersQ="
  },
  {
    name: "John Doe",
    role: "Marketing Manager - ABC Company",
    location: "New York, USA",
    education: "University of Marketing",
    description: "John is a seasoned marketing manager with over a decade of experience in the field.",
    image: "https://media.istockphoto.com/id/1156411992/photo/portrait-of-a-business-man.jpg?s=612x612&w=0&k=20&c=gnv9XtMjWhCujhmZplZY-FAaOSmlNjzoMV6lYJ-eDjo="
  },
  {
    name: "Jessica Jones",
    role: "Solution Manager - Creative Tim Officer",
    location: "Bucharest, Romania",
    education: "University of Computer Science",
    description: "Ryan — the name taken by Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs and records all of his own music.",
    image: "https://media.istockphoto.com/id/1682296067/photo/happy-studio-portrait-or-professional-man-real-estate-agent-or-asian-businessman-smile-for.webp?b=1&s=170667a&w=0&k=20&c=V-RXoAk73ljzQZd0w_JcCFG-jlYs6sjpcrIZQ1TersQ="
  },
  {
    name: "John Doe",
    role: "Marketing Manager - ABC Company",
    location: "New York, USA",
    education: "University of Marketing",
    description: "John is a seasoned marketing manager with over a decade of experience in the field.",
    image: "https://media.istockphoto.com/id/1156411992/photo/portrait-of-a-business-man.jpg?s=612x612&w=0&k=20&c=gnv9XtMjWhCujhmZplZY-FAaOSmlNjzoMV6lYJ-eDjo="
  },
];

const InvestorTable = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();

  const handleProfileClick = (user) => {
    setSelectedUser(user);
  };

  const handleBackClick = () => {
    setSelectedUser(null); // Reset the selected user to show the table again
  };

  const HandleDashboard = () => {
    navigate('/');
  };

  if (selectedUser) {
    return <UserProfile user={selectedUser} onBack={handleBackClick} />;
  }

  return (
    <Box m="20px">
      <Box component={Paper} backgroundColor={colors.primary[400]}>
        <Box display="flex" alignItems="center" mb={2}>
          <IconButton onClick={HandleDashboard}>
            <ArrowBackIcon />
          </IconButton>
        </Box>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell color={colors.grey[100]}>Profile</TableCell>
              <TableCell align="right" color={colors.grey[100]}>Name</TableCell>
              <TableCell align="right" color={colors.grey[100]}>Role</TableCell>
              <TableCell align="right" color={colors.grey[100]}>Location</TableCell>
              <TableCell align="right" color={colors.grey[100]}>Education</TableCell>
              <TableCell align="right" color={colors.grey[100]}>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={index} onClick={() => handleProfileClick(user)} style={{ cursor: 'pointer' }}>
                <TableCell component="th" scope="row">
                  <Avatar alt={user.name} src={user.image} sx={{ width: 56, height: 56 }} />
                </TableCell>
                <TableCell align="right" color={colors.grey[100]}>{user.name}</TableCell>
                <TableCell align="right" color={colors.grey[100]}>{user.role.slice(0, 15)}{user.role.length > 15 ? '...' : ''}</TableCell>
                <TableCell align="right" color={colors.grey[100]}>{user.location}</TableCell>
                <TableCell align="right" color={colors.grey[100]}>{user.education}</TableCell>
                <TableCell align="right" color={colors.grey[100]}>{user.description.slice(0, 40)}{user.description.length > 40 ? '...' : ''}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
};

export default InvestorTable;
