import React, { useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const data = [

  // DB store format
  {
    type: "pay", // the person who addes the expense will be type = receive  
    expenseType: "Food",
    ifOthersComment: null, // ''
    payTo: "Anshuli", // Based on paidById this should be in OverView
    payToId: "Anshul001",
    receiveFrom: null, // personId OverView
    receiveFromId: null,
    amount: "100",
    status: "pending", // Added from backend
    expenseId: "1", // generated on DB
    trnscDate: '02/07/2024', // Added from Backend
    trnscCompleteDate: null, // Added from Backend
    groupId: "", // if empty pass non group unique ID
    groupName: "Non Group",
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
  
  const [filter, setFilter] = useState('');
  
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
    </div>
  );
}

export default Expenses;
