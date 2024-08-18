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

const dataFormate = (userId) => {
  return {
    expenseType: null,
    persons: [],
    amount: 0,
    shareType: "equal",
    group: null,
    ifOthersComment: "",
    paidById: userId,
    amountDistribution: {},
  };
};

const AddExpense = ({
  open,
  onClose,
  persons,
  expenseTypes,
  userId,
  group,
  addExpense,
}) => {
  const [formData, setFormData] = useState(dataFormate(userId));
  const [grpExp, setGrpExp] = useState(false);

  useEffect(() => {
    if (formData.shareType === "equal" && formData.persons.length > 0) {
      const equalAmount = formData.amount / formData.persons.length;
      const personsWithAmount = formData.persons.reduce((acc, person) => {
        acc[person.personId] = equalAmount;
        return acc;
      }, {});
      setFormData((prev) => ({
        ...prev,
        amountDistribution: personsWithAmount,
      }));
    }
  }, [formData.amount, formData.shareType, formData.persons]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAutocompleteChangePerson = (event, value) => {
    setFormData((prev) => ({ ...prev, persons: value }));
  };

  const handleAutocompleteChangeGroup = (event, value) => {
    setFormData((prev) => ({ ...prev, group: value }));
  };

  const handleAutocompleteChangeExpenseType = (event, value) => {
    setFormData((prev) => ({ ...prev, expenseType: value }));
  };

  const handleCheckboxChange = (event) => {
    setFormData((prev) => ({ ...prev, shareType: event.target.value }));
  };

  const handleCheckboxChangeGrpExp = (event) => {
    setGrpExp((prev) => !prev);
  };

  const handleAmountChange = (event) => {
    const amount = parseFloat(event.target.value) || 0;
    setFormData((prev) => ({ ...prev, amount }));
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

  const resetForm = () => {
    setFormData(dataFormate(userId));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const payLoadData = {
      ...formData,
      amount: Object.values(formData.amountDistribution).reduce(
        (acc, curr) => acc + curr,
        0
      ),
      expenseType: formData.expenseType.expenseType,
    };

    if(!grpExp) {
        payLoadData.group = {
            groupName: "Non Group Expense",
            groupId: 1223
        }
    }
    addExpense(payLoadData);
    resetForm();
    onClose();
  };

  const isFormValid = () => {
    const { expenseType, persons, amount, shareType, amountDistribution } =
      formData;

    // Check if expenseType and persons are selected
    if (!expenseType || !persons) return false;

    if (shareType === "equal") {
      // For equal sharing, check if amount is greater than 0
      return amount > 0;
    } else {
      // For unequal sharing, ensure each person has an amount assigned
      return (
        Object.keys(amountDistribution).length === persons.length &&
        Object.values(amountDistribution).every((amt) => amt > 0)
      );
    }
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        resetForm();
        onClose();
      }}
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
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography id="modal-title" variant="h6" component="h2">
            Add New Expense
          </Typography>
          <IconButton
            onClick={() => {
              resetForm();
              onClose();
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            mb: 2,
            maxHeight: "calc(100vh - 200px)",
          }}
        >
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

            <FormControlLabel
              control={
                <Checkbox
                  checked={grpExp}
                  onChange={handleCheckboxChangeGrpExp}
                  value={grpExp}
                />
              }
              label="Group Expense"
            />

            <Autocomplete
              disabled={!grpExp}
              options={group}
              getOptionLabel={(option) => option.groupName}
              value={formData.group}
              onChange={handleAutocompleteChangeGroup}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Group"
                  placeholder="Select a group"
                  margin="normal"
                  fullWidth
                />
              )}
            />

            <Autocomplete
              multiple
              options={persons}
              getOptionLabel={(option) => option.name}
              value={formData.persons}
              onChange={handleAutocompleteChangePerson}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => {
                  const { key, ...tagProps } = getTagProps({ index });
                  return (
                    <Chip
                      key={option.personId} // Use a unique key, for example, option.personId
                      variant="outlined"
                      label={option.name}
                      {...tagProps} // Spread the rest of the props excluding `key`
                    />
                  );
                })
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

            {formData.shareType === "equal" ? (
              <TextField
                label="Amount"
                name="amount"
                type="number"
                value={formData.amount}
                onChange={handleAmountChange}
                fullWidth
                margin="normal"
                inputProps={{ step: "0.01", min: "0" }} // Prevents changing numbers on scroll
              />
            ) : (
              formData.persons.map((person, index) => (
                <Box
                  key={person.personId}
                  display="flex"
                  alignItems="center"
                  mb={1}
                >
                  <Typography variant="body1" sx={{ mr: 2 }}>
                    {person.name}
                  </Typography>
                  <TextField
                    label="Amount"
                    type="number"
                    value={formData.amountDistribution[person.personId] || ""}
                    onChange={(e) =>
                      handleIndividualAmountChange(
                        person.personId,
                        e.target.value
                      )
                    }
                    fullWidth
                    margin="normal"
                    inputProps={{ step: "0.01", min: "0" }} // Prevents changing numbers on scroll
                  />
                </Box>
              ))
            )}

            <Autocomplete
              options={expenseTypes}
              getOptionLabel={(option) => option.expenseType}
              value={formData.expenseType}
              onChange={handleAutocompleteChangeExpenseType}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Expense Type"
                  placeholder="Select an expense type"
                  margin="normal"
                  fullWidth
                />
              )}
            />

            {formData.expenseType?.expenseType === "Others" && (
              <TextField
                label="Comment (Optional)"
                name="ifOthersComment"
                value={formData.ifOthersComment}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            )}
          </form>
        </Box>
        <Box display="flex" justifyContent="flex-end">
          <Button
            onClick={() => {
              resetForm();
              onClose();
            }}
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
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddExpense;