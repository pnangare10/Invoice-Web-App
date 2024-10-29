import { Box, Button, Modal, Typography } from '@mui/material';
import React from 'react';
import api from '../../api/springApi';

const DownloadModal = ({ open, onClose, onDownload, invoiceId }) => {

  const handleClick = () => {
    api.get(`/invoices/download-invoice/${invoiceId}`, {
      responseType: 'blob',
    })
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data], { type: response.headers['content-type'] }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'invoice.xlsx'); 
      document.body.appendChild(link);
      link.click();
      link.remove(); 
    })
    .catch((error) => {
      console.error("Error downloading the file:", error);
    });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="download-modal-title">
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
          textAlign: 'center',
        }}
      >
        <Typography id="download-modal-title" variant="h6" component="h2">
          Would you like to download the Excel file for the invoice?
        </Typography>
        
        <Box mt={3} display="flex" justifyContent="space-around">
          <Button variant="contained" color="primary" onClick={handleClick}>
            Yes, Download
          </Button>
          <Button variant="outlined" color="secondary" onClick={onClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DownloadModal;
