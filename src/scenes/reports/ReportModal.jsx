import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import { useTheme } from '@emotion/react';
import { tokens } from '../../theme';
import axios from 'axios';

const ReportModal = ({ open, onClose, rowData, onDelete }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleDelete = async () => {
    try {
      const apiUrl = rowData?.reportType === 'Podcast' 
      ? `${process.env.REACT_APP_BACK_URL}/podcasts`
        : `${process.env.REACT_APP_BACK_URL}/upload/delete`;
        
      await axios.post(`${apiUrl}/${rowData?.id}`);
      onDelete(); // Callback to refresh data after deletion
      onClose(); // Close the modal
    } catch (error) {
      console.error('Error deleting report:', error);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="report-modal-title"
      aria-describedby="report-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 700,
          bgcolor: colors.primary[400],
          boxShadow: 24,
          borderRadius: '6px',
          p: 4,
          display: 'flex',
          gap: 2,
        }}
      >
        {/* Left Side: Media Content */}
        <Box sx={{ flex: 3, textAlign: 'center' }}>
          {rowData?.image && (
            <img
              src={rowData.image}
              alt="Report Visual"
              style={{ width: '220px',height:"220px", borderRadius: '4px' }}
            />
          )}
          {rowData?.video && (
            <video
              controls
              style={{ width: '230px', height:"230px", marginTop: '10px', borderRadius: '4px', objectFit:"cover" }}
              src={rowData.video}
            />
          )}
        </Box>

        {/* Right Side: Report Details */}
        <Box sx={{ flex: 2 }}>
          <Typography id="report-modal-title" variant="h6" component="h2">
            Report Details
          </Typography>
          <Typography id="report-modal-description" sx={{ mt: 3 }}>
            <strong>Report Type:</strong> {rowData?.reportType || 'N/A'}
          </Typography>
          <Typography sx={{ mt: 1 }}>
            <strong>Title:</strong> {rowData?.title || 'N/A'}
          </Typography>
          <Typography sx={{ mt: 1 }}>
            <strong>Message:</strong> {rowData?.msg || 'N/A'}
          </Typography>
          <Typography sx={{ mt: 1 }}>
            <strong>Number of Reports:</strong> {rowData?.count || 'N/A'}
          </Typography>

          {/* Delete Button */}
          <Button
            onClick={handleDelete}
            sx={{ mt: 2, backgroundColor: 'red', color: 'white' }}
            variant="contained"
          >
            Delete
          </Button>
          <Button onClick={onClose} sx={{ mt: 2, ml: 2 }} variant="contained">
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ReportModal;
