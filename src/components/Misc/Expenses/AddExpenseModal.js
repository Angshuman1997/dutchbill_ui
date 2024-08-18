import React, { useEffect, useState } from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  Autocomplete,
  Chip,
  IconButton,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const AddExpenseModal = ({ open, onClose, persons, expenseTypes, userId, groupId = '' }) => {
  const [formData, setFormData] = useState({
    // add all in backend
    expenseType: [], // String and only one
    persons: [],
    amount: 0,
    shareType: "equal",
    groupId: groupId,
    ifOthersComment: "",
    paidById: userId
  });

  useEffect(() => {
    if (formData.shareType === "equal") {
      const equalAmount = formData.amount / formData.persons.length;
      const personsWithAmount = formData.persons.reduce((acc, person) => {
        acc[person.personId] = equalAmount;
        return acc;
      }, {});
      setFormData({ ...formData, amountDistribution: personsWithAmount });
    }
  }, [formData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAutocompleteChangePerson = (event, value) => {
    setFormData({ ...formData, persons: value });
  };

  const handleAutocompleteChangeExpenseType = (event, value) => {
    setFormData({ ...formData, expenseType: value });
  };

  const handleCheckboxChange = (event) => {
    setFormData({ ...formData, shareType: event.target.value });
  };

  const handleAmountChange = (event) => {
    const { value } = event.target;
    const amount = parseFloat(value) || 0;
    setFormData({ ...formData, amount });
  };

  const handleIndividualAmountChange = (personId, value) => {
    const amount = parseFloat(value) || 0;
    setFormData((prev) => ({
      ...prev,
      amountDistribution: {
        ...prev.amountDistribution,
        [personId]: amount,
      },
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const payLoadData = { ...formData };
    payLoadData.amount = Object.values(payLoadData.amountDistribution).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    payLoadData.expenseType = payLoadData.expenseType.map((i) => i.expenseType);
    console.log("hily", payLoadData);
    onClose();
  };

  const isFormValid = () => {
    const { expenseType, persons, amount, shareType } = formData;
    return (
      expenseType.length &&
      persons.length > 0 &&
      (shareType === "unequal" || (shareType === "equal" && amount > 0)) &&
      (shareType === "unequal" || formData.amountDistribution)
    );
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
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "90%", sm: "80%", md: 400 },
          bgcolor: "background.paper",
          borderRadius: "8px",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography id="modal-title" variant="h6" component="h2">
            Add New Expense
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column" gap={2} mb={2}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.shareType === "equal"}
                  onChange={handleCheckboxChange}
                  value="equal"
                />
              }
              label="Equal"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.shareType === "unequal"}
                  onChange={handleCheckboxChange}
                  value="unequal"
                />
              }
              label="Unequal"
            />
          </Box>

          <Autocomplete
            multiple
            options={persons}
            getOptionLabel={(option) => option.name}
            value={formData.persons}
            onChange={(event, value) =>
              handleAutocompleteChangePerson(event, value)
            }
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  key={index}
                  variant="outlined"
                  label={option.name}
                  {...getTagProps({ index })}
                />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Persons"
                margin="normal"
                fullWidth
              />
            )}
          />

          {formData.shareType === "equal" && (
            <React.Fragment>
              <TextField
                label="Amount"
                name="amount"
                type="number"
                value={formData.amount}
                onChange={handleAmountChange}
                fullWidth
                margin="normal"
              />
            </React.Fragment>
          )}

          {formData.shareType === "unequal" && (
            <React.Fragment>
              {formData.persons.map((person, index) => (
                <Box key={index} display="flex" alignItems="center" mb={1}>
                  <Typography variant="body1" sx={{ mr: 2 }}>
                    {person.name}
                  </Typography>
                  <TextField
                    label="Amount"
                    type="number"
                    value={formData.amountDistribution?.[person.name] || ""}
                    onChange={(e) =>
                      handleIndividualAmountChange(person.personId, e.target.value)
                    }
                    fullWidth
                    margin="normal"
                  />
                </Box>
              ))}
            </React.Fragment>
          )}

          <Autocomplete
            multiple
            options={expenseTypes}
            getOptionLabel={(option) => option.expenseType}
            value={formData.expenseType}
            onChange={(event, value) =>
              handleAutocompleteChangeExpenseType(event, value)
            }
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  key={index}
                  variant="outlined"
                  label={option.expenseType}
                  {...getTagProps({ index })}
                />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Expense Type"
                margin="normal"
                fullWidth
              />
            )}
          />

          {formData.expenseType.some((i) => i.expenseType === "Others") && (
            <TextField
              label="Comment (Optional)"
              name="ifOthersComment"
              value={formData.ifOthersComment}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          )}

          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button
              onClick={onClose}
              variant="outlined"
              color="secondary"
              sx={{ mr: 2 }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={!isFormValid()}
            >
              Submit
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default AddExpenseModal;
