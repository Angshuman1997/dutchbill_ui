import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Typography,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useSelector } from "react-redux";
import { fetchExpense, removeExpense } from "../../api/apiFunc";
import "./Expenses.css";
import { CircularProgress } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import moment from "moment";
import { toast } from "react-toastify";

const Expenses = () => {
  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const userData = useSelector((state) => state.userData);
  const sumExpApiToggle = useSelector((state) => state.sumExpApiToggle);

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
  }, [userData, sumExpApiToggle]);

  const deleteExpense = async (e, item) => {
    e.stopPropagation();
    const temp = expenseData.filter((i) => i.expenseId !== item.expenseId);
    const deleteExpApi = await removeExpense({
      userId: userData.data._id,
      expenseId: item.expenseId,
    });
    if (deleteExpApi && deleteExpApi.status === 200) {
      setExpenseData(temp);
    } else {
      toast.error("Failed to delete expense");
    }
  };

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
            <Accordion
              key={item.expenseId}
              sx={{
                width: "35rem",
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{
                  "& .MuiAccordionSummary-content": {
                    display: "flex",
                    justifyContent: "space-around",
                  },
                }}
              >
                <Chip
                  label={item.type}
                  color={item.type === "pay" ? "error" : "success"}
                  sx={{
                    width: "5rem",
                    marginRight: "0.5rem",
                  }}
                />
                <Chip
                  label={`Amount => ${item.amount}`}
                  sx={{
                    width: "10rem",
                    borderRadius: "0.5rem",
                    backgroundColor: "#08889a",
                    color: "black",
                    marginRight: "0.5rem",
                  }}
                />
                <Chip
                  label={`Status => ${item.status}`}
                  sx={{
                    width: "10rem",
                    borderRadius: "0.5rem",
                    backgroundColor: "white",
                    marginRight: "0.5rem",
                    border: `2px solid ${
                      item.status === "done" ? "green" : "red"
                    }`,
                    color: item.status === "done" ? "green" : "red",
                  }}
                />
                <Button
                  onClick={(e) => deleteExpense(e, item)}
                  disabled={item.createdById !== userData.data._id}
                  sx={{
                    minWidth: 0,
                    padding: 0,
                    margin: 0,
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.1)",
                    },
                    opacity: item.createdById !== userData.data._id ? 0 : 1,
                  }}
                >
                  <DeleteIcon sx={{ color: "black" }} />
                </Button>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <b>Expense On:</b>
                  {` ${item.expenseType}`}
                </Typography>
                {item.payTo && (
                  <Typography>
                    <b>Pay To:</b>
                    {` ${item.payTo}`}
                  </Typography>
                )}
                {item.receiveFrom && (
                  <Typography>
                    <b>Receive From:</b>
                    {` ${item.receiveFrom}`}
                  </Typography>
                )}
                <Typography>
                  <b>Transaction Date:</b>
                  {` ${moment(item.trnsc).format("YYYY-MM-DD")}`}
                </Typography>
                <Typography>
                  <b>Transaction Complete Date:</b>
                  {` ${
                    item.trnscCompleteDate
                      ? moment(item.trnscCompleteDate).format("YYYY-MM-DD")
                      : "N/A"
                  }`}
                </Typography>
                {item.ifOthersComment && (
                  <Typography>
                    <b>{"Comment ( Other Expense ):"}</b>
                    {` ${item.ifOthersComment}`}
                  </Typography>
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
