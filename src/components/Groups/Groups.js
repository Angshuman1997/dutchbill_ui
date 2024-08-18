import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const data = [
  {
    groupId: "1",
    groupName: "Coorg",
    members: ['A', 'B', 'C'],
    expenses: [
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
      },
      {
        type: "pay",
        expenseType: "Food",
        ifOthersComment: null,
        payTo: "Anshuli",
        receiveFrom: null,
        amount: "100",
        status: "pending",
        expenseId: "2",
        trnscDate: '02/07/2024',
        trnscCompleteDate: null,
      },
      {
        type: "pay",
        expenseType: "Food",
        ifOthersComment: null,
        payTo: "Anshuli",
        receiveFrom: null,
        amount: "100",
        status: "pending",
        expenseId: "3",
        trnscDate: '02/07/2024',
        trnscCompleteDate: null,
      }
    ]
  }
];

const Groups = () => {
  const handleButtonClick = (event) => {
    event.stopPropagation();
  };

  return (
    <div>
      {data.map(group => (
        <Accordion key={group.groupId}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${group.groupId}-content`}
            id={`panel${group.groupId}-header`}
          >
            <Typography sx={{ flex: 1 }}>
              {group.groupName} - Members: {group.members.join(', ')}
            </Typography>
            <IconButton size="small" onClick={handleButtonClick}>
              <AddIcon />
            </IconButton>
            <IconButton size="small" onClick={handleButtonClick}>
              <RemoveIcon />
            </IconButton>
            <IconButton size="small" onClick={handleButtonClick}>
              <DeleteIcon />
            </IconButton>
            <IconButton size="small" onClick={handleButtonClick}>
              <AddCircleOutlineIcon />
            </IconButton>
          </AccordionSummary>
          <AccordionDetails>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Expense Type</TableCell>
                    <TableCell>Pay To</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Transaction Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {group.expenses.map(expense => (
                    <TableRow key={expense.expenseId}>
                      <TableCell>{expense.expenseType}</TableCell>
                      <TableCell>{expense.payTo}</TableCell>
                      <TableCell>{expense.amount}</TableCell>
                      <TableCell>{expense.status}</TableCell>
                      <TableCell>{expense.trnscDate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default Groups;
