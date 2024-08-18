import React from "react";
import { Grid, TextField, IconButton, Button, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const UserBaseExpenseList = ({
  userBaseExpense,
  handleInputChange,
  handleRemoveUserBaseExpense,
  handleAddUserBaseExpense,
  itemId,
}) => (
  <Accordion>
    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
      User Base Expense
    </AccordionSummary>
    <AccordionDetails>
      {userBaseExpense.map((expense, index) => (
        <Grid container spacing={2} key={index}>
          <Grid item xs={5}>
            <TextField
              label="Person"
              value={expense.person}
              onChange={(e) =>
                handleInputChange(itemId, "userBaseExpense", e.target.value, index, "person")
              }
              fullWidth
            />
          </Grid>
          <Grid item xs={5}>
            <TextField
              label="Amount"
              type="number"
              value={expense.amount}
              onChange={(e) =>
                handleInputChange(itemId, "userBaseExpense", e.target.value, index, "amount")
              }
              fullWidth
            />
          </Grid>
          <Grid item xs={2}>
            <IconButton
              edge="end"
              aria-label="delete"
              title="Delete"
              onClick={() => handleRemoveUserBaseExpense(itemId, index)}
            >
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>
      ))}
      <Button onClick={() => handleAddUserBaseExpense(itemId)}>Add User Base Expense</Button>
    </AccordionDetails>
  </Accordion>
);

export default UserBaseExpenseList;
