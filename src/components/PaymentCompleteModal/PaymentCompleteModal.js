import React from 'react';
import { Modal, Box, Typography, Button, Stack } from '@mui/material';

const PaymentCompleteModal = ({open, handleClose, handlePayment}) => {

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="payment-complete-modal"
      aria-describedby="payment-complete-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          width: { xs: '90%', sm: '400px', md: '500px' },
          textAlign: 'center',
        }}
      >
        <Typography id="payment-complete-description" variant="h6" component="h2" mb={3}>
          Payment complete ?
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="center">
          <Button onClick={handlePayment} variant="contained" color="primary">
            Yes
          </Button>
          <Button onClick={handleClose} variant="outlined" color="secondary">
            No
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default PaymentCompleteModal;
