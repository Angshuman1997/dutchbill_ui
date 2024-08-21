import React, { useEffect, useState } from 'react';
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
import { useSelector } from "react-redux";
import { fetchExpense } from '../../api/apiFunc';
import { toast } from 'react-toastify';

const Expenses = () => {

  const [filter, setFilter] = useState('');
  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(true);
  const userData = useSelector((state) => state.userData);

  useEffect(() => {

    const fetchAndSetExpenseData = async () => {
      try{
        const result = await fetchExpense({ userId: userData.data._id });
        if(result && result.status === 200) {
          console.log('hi', result.data)
          setExpenseData(result.data);
        } else {
          toast.error("Failed to fetch expense data");
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error("An error occurred while fetching expense data");
      }
    };
    fetchAndSetExpenseData();
  }, [userData]);
  

  const handleFilterChange = (event) => setFilter(event.target.value);

  const filteredData = expenseData.filter(item => {
    return filter === '' || item.expenseType === filter;
  });

  return (
    <div>
      <div>Expenses</div>
      {loading ? (
        <Typography>Loading expenses...</Typography>
      ) : expenseData.length === 0 ? (
        <Typography>No expenses found</Typography>
      ) : (
        <React.Fragment>
          <div style={{ marginBottom: '16px' }}>
            <FormControl fullWidth>
              <InputLabel>Filter by Expense Type</InputLabel>
              <Select
                value={filter}
                onChange={handleFilterChange}
                label="Filter by Expense Type"
                disabled={expenseData.length === 0}
              >
                <MenuItem value="">All</MenuItem>
                {Array.from(new Set(expenseData.map(item => item.expenseType))).map(expenseType => (
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
        </React.Fragment>
      )}
    </div>
  );
}

export default Expenses;
