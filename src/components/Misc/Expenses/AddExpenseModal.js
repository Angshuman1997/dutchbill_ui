import React, { useState } from 'react';
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography
} from '@mui/material';

const AddExpenseModal = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    type: '',
    expenseType: '',
    payTo: '',
    receiveFrom: '',
    amount: '',
    status: '',
    trnscDate: '',
    trnscCompleteDate: '',
    groupId: '',
    ifOthersComment: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic
    console.log(formData);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          borderRadius: '8px',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography id="modal-title" variant="h6" component="h2">
          Add New Expense
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Expense Type"
            name="expenseType"
            value={formData.expenseType}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Pay To"
            name="payTo"
            value={formData.payTo}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Receive From"
            name="receiveFrom"
            value={formData.receiveFrom}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Amount"
            name="amount"
            type="number"
            value={formData.amount}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Transaction Date"
            name="trnscDate"
            type="date"
            value={formData.trnscDate}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Complete Date"
            name="trnscCompleteDate"
            type="date"
            value={formData.trnscCompleteDate}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Group ID"
            name="groupId"
            value={formData.groupId}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Comment"
            name="ifOthersComment"
            value={formData.ifOthersComment}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button onClick={onClose} variant="outlined" color="secondary" sx={{ mr: 2 }}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}

export default AddExpenseModal;
