import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useSelector } from "react-redux";
import { fetchExpense } from "../../api/apiFunc";
import "./Expenses.css";
import { CircularProgress } from "@mui/material";

const Expenses = () => {
  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const userData = useSelector((state) => state.userData);

  useEffect(() => {
    const fetchAndSetExpenseData = async () => {
      try {
        const result = await fetchExpense({ userId: userData.data._id });
        if (result && result.status === 200) {
          setExpenseData(result.data);
        } else {
          setError(true);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };
    fetchAndSetExpenseData();
  }, [userData]);

  return (
    <React.Fragment>
      {loading ? (
        <div className="expense-message">
          <CircularProgress color="inherit" />
        </div>
      ) : error ? (
        <div className="expense-message">Something went wrong !</div>
      ) : expenseData.length === 0 ? (
        <div className="expense-message">No data found</div>
      ) : (
        <div className="expense-content">
          {expenseData.map((item) => (
            <Accordion key={item.expenseId} sx={{
              width: "35rem",
              
            }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Chip
                  label={item.type}
                  color={item.type === "pay" ? "error" : "success"}
                  sx={{
                    width: "5rem",
                    borderRadius: "0.5rem"
                  }}
                />
                <Typography>{item.expenseType}</Typography>
                <Typography>Status: {item.status}</Typography>
                <Typography>Amount: {item.amount}/-</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>Expense ID: {item.expenseId}</Typography>
                <Typography>Transaction Date: {item.trnscDate}</Typography>
                <Typography>
                  Complete Date: {item.trnscCompleteDate || "N/A"}
                </Typography>
                <Typography>Group ID: {item.groupId || "N/A"}</Typography>
                {item.ifOthersComment && (
                  <Typography>Comment: {item.ifOthersComment}</Typography>
                )}
                {item.payTo && <Typography>Pay To: {item.payTo}</Typography>}
                {item.receiveFrom && (
                  <Typography>Receive From: {item.receiveFrom}</Typography>
                )}
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      )}
    </React.Fragment>
  );
};

export default Expenses;
