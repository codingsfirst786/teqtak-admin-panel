import React, { useEffect, useState } from 'react';
import {
  Typography,
  Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@mui/material';
import { useTheme } from '@emotion/react';
import { tokens } from '../../theme';
import { fetchAllReport } from '../../Api/Reports/Reports';
import ReportModal from './ReportModal'; 

function Reports() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [activeReport, setActiveReport] = useState('podcast');
  const [podcastReport, setPodcastReport] = useState([]);
  const [videoReport, setVideoReport] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null); // State for selected row
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  useEffect(() => {
    const getReport = async () => {
      try {
        const response = await fetchAllReport();
        console.log('Fetched reports:', response);
        setPodcastReport(response.podcast || []); // Default to empty array if null/undefined
        setVideoReport(response.videos || []); // Default to empty array if null/undefined
      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    };
    getReport();
  }, []);

  const handleRowClick = (row) => {
    setSelectedRow({
      reportType: activeReport === 'podcast' ? 'Podcast' : 'Video',
      title: row.reportType || 'N/A',
      id: row.reportItemId,
      count: activeReport === 'podcast' ? podcastReport.length : videoReport.length,
      image: row.data.picUrl || null, // Pass image if available
      video: row.data.videoUrl || null, // Pass video if available
      msg: row.reportMessage || null
    });
    setIsModalOpen(true); // Open the modal
  };
  

  const renderTable = (data) => (
    <TableContainer component={Paper} sx={{ marginTop: 2 }}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: colors.greenAccent[200] }}>
            <TableCell
              sx={{
                fontSize: '1.2rem',
                fontWeight: 'bold',
                backgroundColor: colors.blueAccent[600],
                color: theme.palette.mode === 'dark' ? 'white' : 'black',
              }}
            >
              No:
            </TableCell>
            <TableCell
              sx={{
                fontSize: '1.2rem',
                fontWeight: 'bold',
                backgroundColor: colors.blueAccent[600],
                color: theme.palette.mode === 'dark' ? 'white' : 'black',
              }}
            >
              Report Type
            </TableCell>
            <TableCell
              sx={{
                fontSize: '1.2rem',
                fontWeight: 'bold',
                backgroundColor: colors.blueAccent[600],
                color: theme.palette.mode === 'dark' ? 'white' : 'black',
              }}
            >
              Report Title
            </TableCell>
            <TableCell
              sx={{
                fontSize: '1.2rem',
                fontWeight: 'bold',
                backgroundColor: colors.blueAccent[600],
                color: theme.palette.mode === 'dark' ? 'white' : 'black',
              }}
            >
              Number of Reports
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow
              key={index}
              onClick={() => handleRowClick(row)} // Attach click handler
              sx={{
                cursor: 'pointer',
                backgroundColor: colors.primary[400],
                '&:hover': { backgroundColor: colors.primary[300] },
              }}
            >
              <TableCell>{index + 1}</TableCell>
              <TableCell>{activeReport === 'podcast' ? 'Podcast' : 'Video'}</TableCell>
              <TableCell>{row.reportType || 'N/A'}</TableCell>
              <TableCell>
                {activeReport === 'podcast'
                  ? podcastReport.length
                  : videoReport.length}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <Box p={3}>
      <Typography variant="h3" gutterBottom>
        Reports
      </Typography>
      <Grid container spacing={2}>
        {/* Podcast Report Section */}
        <Grid item xs={6}>
          <Button
            fullWidth
            variant="contained"
            onClick={() => setActiveReport('podcast')}
            sx={{
              padding: 2,
              backgroundColor:
                activeReport === 'podcast'
                  ? colors.blueAccent[600]
                  : colors.primary[400],
              '&:hover': {
                backgroundColor:
                  activeReport === 'podcast'
                    ? colors.primary[300]
                    : colors.primary[200],
              },
            }}
          >
            <Typography variant="h6">Podcast Report</Typography>
            <Typography variant="h6">({podcastReport.length})</Typography>
          </Button>
        </Grid>

        {/* Video Report Section */}
        <Grid item xs={6}>
          <Button
            fullWidth
            variant="contained"
            onClick={() => setActiveReport('video')}
            sx={{
              padding: 2,
              backgroundColor:
                activeReport === 'video'
                  ? colors.blueAccent[600]
                  : colors.primary[400],
              '&:hover': {
                backgroundColor:
                  activeReport === 'video'
                    ? colors.primary[300]
                    : colors.primary[200],
              },
            }}
          >
            <Typography variant="h6">Video Report</Typography>
            <Typography variant="h6">({videoReport.length})</Typography>
          </Button>
        </Grid>
      </Grid>

      {/* Render the appropriate table */}
      {activeReport === 'podcast'
        ? renderTable(podcastReport)
        : renderTable(videoReport)}

      {/* Render the modal */}
      <ReportModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        rowData={selectedRow}
      />
    </Box>
  );
}

export default Reports;
