import React from "react";
import {
  Grid,
  TextField,
  IconButton,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import UserBaseExpenseList from "./UserBaseExpenseList";

const ExpenseItem = ({
  item,
  handleRemoveItem,
  handleInputChange,
  handleAddUserBaseExpense,
  handleRemoveUserBaseExpense,
  handleEditItem,
  handleConfirmItem,
}) => {
  const isConfirmDisabled =
    !item.payer || !item.expenseOn || !item.amount || item.userBaseExpense.length === 0;

  return (
    <Grid container spacing={2}>
      {item.isNew || item.isEditing ? (
        <React.Fragment>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Payer"
              value={item.payer}
              onChange={(e) => handleInputChange(item.id, "payer", e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Expense On"
              value={item.expenseOn}
              onChange={(e) => handleInputChange(item.id, "expenseOn", e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Amount"
              type="number"
              value={item.amount}
              onChange={(e) => handleInputChange(item.id, "amount", e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <UserBaseExpenseList
              userBaseExpense={item.userBaseExpense}
              handleInputChange={handleInputChange}
              handleRemoveUserBaseExpense={handleRemoveUserBaseExpense}
              handleAddUserBaseExpense={handleAddUserBaseExpense}
              itemId={item.id}
            />
          </Grid>
          <Grid item xs={12}>
            <IconButton
              edge="end"
              aria-label="confirm"
              title="Confirm"
              onClick={() => handleConfirmItem(item.id)}
              disabled={isConfirmDisabled}
            >
              <CheckIcon />
            </IconButton>
            <IconButton
              edge="end"
              aria-label="delete"
              title="Delete"
              onClick={() => handleRemoveItem(item.id)}
            >
              <DeleteIcon />
            </IconButton>
          </Grid>
        </React.Fragment>
      ) : (
        <Box>
          <Typography variant="body1">Payer: {item.payer}</Typography>
          <Typography variant="body1">Expense On: {item.expenseOn}</Typography>
          <Typography variant="body1">Amount: {item.amount}</Typography>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>User Base Expense</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {item.userBaseExpense.map((expense, index) => (
                <Typography key={index}>
                  {expense.person}: {expense.amount}
                </Typography>
              ))}
            </AccordionDetails>
          </Accordion>
          <IconButton
            edge="end"
            aria-label="edit"
            title="Edit"
            onClick={() => handleEditItem(item.id)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            edge="end"
            aria-label="delete"
            title="Delete"
            onClick={() => handleRemoveItem(item.id)}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      )}
    </Grid>
  );
};

export default ExpenseItem;
