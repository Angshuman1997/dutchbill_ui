import React, { useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Typography,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddExpenseModal from './AddExpenseModal'; // Import the new modal component

const data = [
  {
    type: "pay",
    expenseType: "Food",
    ifOthersComment: null,
    payTo: "Anshuli",
    receiveFrom: null,
    amount: "100",
    status: "pending",
    expenseId: "1",
    trnscDate: '02/07/2024',
    trnscCompleteDate: null,
    groupId: "1"
  },
  {
    type: "receive",
    expenseType: "Travel",
    ifOthersComment: null,
    payTo: null,
    receiveFrom: "Aaquib",
    amount: "100",
    status: "pending",
    expenseId: "2",
    trnscDate: '01/07/2024',
    trnscCompleteDate: null,
    groupId: null
  },
  {
    type: "pay",
    expenseType: "Shopping",
    ifOthersComment: null,
    payTo: "Angshuman",
    receiveFrom: null,
    amount: "100",
    status: "done",
    expenseId: "3",
    trnscDate: '28/06/2024',
    trnscCompleteDate: "19/07/2024",
    groupId: "3"
  },
  {
    type: "receive",
    expenseType: "Others",
    ifOthersComment: "Borrowed",
    payTo: null,
    receiveFrom: "Rajat",
    amount: "100",
    status: "done",
    expenseId: "4",
    trnscDate: '22/06/2024',
    trnscCompleteDate: "22/07/2024",
    groupId: "2"
  },
]

const Expenses = () => {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleFilterChange = (event) => setFilter(event.target.value);

  const filteredData = data.filter(item => {
    return filter === '' || item.expenseType === filter;
  });

  return (
    <div>
    <diV>Expenses</diV>
      <div style={{ marginBottom: '16px' }}>
        <FormControl fullWidth>
          <InputLabel>Filter by Expense Type</InputLabel>
          <Select
            value={filter}
            onChange={handleFilterChange}
            label="Filter by Expense Type"
          >
            <MenuItem value="">All</MenuItem>
            {Array.from(new Set(data.map(item => item.expenseType))).map(expenseType => (
              <MenuItem key={expenseType} value={expenseType}>{expenseType}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleOpen} 
          style={{ marginTop: '16px' }}
        >
          Add Expense
        </Button>
      </div>
      {filteredData.map((item) => (
        <Accordion key={item.expenseId}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Chip
                label={item.type}
                color={item.type === 'pay' ? 'error' : 'success'}
              />
              <Typography>{item.expenseType}</Typography>
              <Typography>Status: {item.status}</Typography>
              <Typography>Amount: ${item.amount}</Typography>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>Expense ID: {item.expenseId}</Typography>
            <Typography>Transaction Date: {item.trnscDate}</Typography>
            <Typography>Complete Date: {item.trnscCompleteDate || 'N/A'}</Typography>
            <Typography>Group ID: {item.groupId || 'N/A'}</Typography>
            {item.ifOthersComment && <Typography>Comment: {item.ifOthersComment}</Typography>}
            {item.payTo && <Typography>Pay To: {item.payTo}</Typography>}
            {item.receiveFrom && <Typography>Receive From: {item.receiveFrom}</Typography>}
          </AccordionDetails>
        </Accordion>
      ))}
      <AddExpenseModal open={open} onClose={handleClose} />
    </div>
  );
}

export default Expenses;
