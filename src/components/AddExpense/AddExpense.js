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
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { getAllUser } from "../../api/apiFunc";
import { useSelector } from "react-redux";

const dataFormate = (user) => {
  return {
    expenseType: null,
    persons: [],
    amount: 0,
    shareType: "equal",
    // group: null,
    ifOthersComment: "",
    paidBy: user,
    amountDistribution: {},
  };
};

const AddExpense = ({
  open,
  onClose,
  expenseTypes,
  // group,
  addExpense,
}) => {
  const userData = useSelector((state) => state.userData);

  const [formData, setFormData] = useState(dataFormate(userData.data));
  // const [grpExp, setGrpExp] = useState(false);
  const [search, setSearch] = useState('');
  const [persons, setPersons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openAutocomplete, setOpenAutocomplete] = useState(false);
 
  
  useEffect(()=>{
    if (search && openAutocomplete) {
      setLoading(true);
      getAllUser({ userId: userData.data._id, search: search })
        .then((result) => {
          if (result.length > 0) {
            setPersons(result);
          } else {
            setPersons([]);
          }
        })
        .catch((error) => {
          console.error(error)
          setPersons([]);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [search, openAutocomplete, userData]);

  useEffect(() => {
    if (formData.shareType === "equal" && formData.persons.length > 0) {
      const equalAmount = formData.amount / formData.persons.length;
      const personsWithAmount = formData.persons.reduce((acc, person) => {
        acc[person._id] = equalAmount;
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

  // const handleAutocompleteChangeGroup = (event, value) => {
  //   setFormData((prev) => ({ ...prev, group: value }));
  // };

  const handleAutocompleteChangeExpenseType = (event, value) => {
    setFormData((prev) => ({ ...prev, expenseType: value }));
  };

  const handleCheckboxChange = (event) => {
    setFormData((prev) => ({ ...prev, shareType: event.target.value }));
  };

  // const handleCheckboxChangeGrpExp = (event) => {
  //   setGrpExp((prev) => !prev);
  // };

  const handleAmountChange = (event) => {
    const amount = parseFloat(event.target.value) || 0;
    setFormData((prev) => ({ ...prev, amount }));
  };

  const handleIndividualAmountChange = (_id, value) => {
    console.log("hi", _id)
    const amount = parseFloat(value) || 0;
    setFormData((prev) => ({
      ...prev,
      amountDistribution: {
        ...prev.amountDistribution,
        [_id]: amount,
      },
    }));
  };

  const resetForm = () => {
    setFormData(dataFormate(userData.data));
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

    // if(!grpExp) {
    //     payLoadData.group = {
    //         groupName: "Non Group Expense",
    //         groupId: 1223
    //     }
    // }
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

            

            <Autocomplete
              multiple
              open={openAutocomplete}
              onOpen={() => setOpenAutocomplete(true)}
              onClose={() => setOpenAutocomplete(false)}
              onInputChange={(event, value) => setSearch(value)}
              options={persons}
              loading={loading}
              getOptionLabel={(option) => option.name}
              value={formData.persons}
              onChange={handleAutocompleteChangePerson}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    key={`${option.username}-${index}`}
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
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {loading ? (
                          <CircularProgress color="inherit" size={20} />
                        ) : null}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  }}
                />
              )}
              noOptionsText={
                search ? (loading ? "Searching..." : "No users found") : "Type to search"
              }
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
                  key={person._id}
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
                    value={formData.amountDistribution[person._id] || ""}
                    onChange={(e) =>
                      handleIndividualAmountChange(
                        person._id,
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

// Group

// <FormControlLabel
//               control={
//                 <Checkbox
//                   checked={grpExp}
//                   onChange={handleCheckboxChangeGrpExp}
//                   value={grpExp}
//                 />
//               }
//               label="Group Expense"
//             />

//             <Autocomplete
//               disabled={!grpExp}
//               options={group}
//               getOptionLabel={(option) => option.groupName}
//               value={formData.group}
//               onChange={handleAutocompleteChangeGroup}
//               renderInput={(params) => (
//                 <TextField
//                   {...params}
//                   label="Group"
//                   placeholder="Select a group"
//                   margin="normal"
//                   fullWidth
//                 />
//               )}
//             />