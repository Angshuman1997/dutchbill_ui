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
import { searchUser, addExpense } from "../../api/apiFunc";
import { useDispatch, useSelector } from "react-redux";
import { setSumExpApiToggle } from "../../redux/actions/actionTypes";
import { toast } from "react-toastify"; 

const dataFormate = (user) => {
  return {
    expenseType: null,
    persons: [],
    amount: undefined,
    shareType: "equal",
    ifOthersComment: "",
    paidBy: user,
    amountDistribution: {},
  };
};

const AddExpense = ({ open, onClose, expenseTypes }) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData);
  const sumExpApiToggle = useSelector((state) => state.sumExpApiToggle);

  const [formData, setFormData] = useState(dataFormate(userData.data));
  const [search, setSearch] = useState("");
  const [persons, setPersons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openAutocomplete, setOpenAutocomplete] = useState(false);
  const [apiStatus, setApiStatus] = useState("notstart");

  useEffect(()=>{
    if(apiStatus === "done") {
      resetForm();
      onClose();
      dispatch(setSumExpApiToggle(!sumExpApiToggle));
      setApiStatus("notstart");
    }
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiStatus])

  useEffect(() => {
    if (search && openAutocomplete) {
      setLoading(true);
      searchUser({
        userId: userData.data._id,
        search: search,
        fetchType: "search",
        alreadySelectedIds: formData.persons.map((i) => i._id),
      })
        .then((result) => {
          if (result.length > 0) {
            setPersons(result);
          } else {
            setPersons([]);
          }
        })
        .catch((error) => {
          console.error(error);
          setPersons([]);
        })
        .finally(() => {
          setLoading(false);
          setSearch("");
        });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const handleAutocompleteChangeExpenseType = (event, value) => {
    setFormData((prev) => ({ ...prev, expenseType: value }));
  };

  const handleCheckboxChange = (event) => {
    setFormData((prev) => ({ ...prev, shareType: event.target.value }));
  };

  const handleAmountChange = (event) => {
    const amount = parseFloat(event.target.value) || undefined;
    setFormData((prev) => ({ ...prev, amount }));
  };

  const handleIndividualAmountChange = (_id, value) => {
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setApiStatus("loading");
    const tempFormData = { ...formData };
    delete tempFormData.amountDistribution[userData.data._id];
    const payLoadData = {
      ...tempFormData,
      amount: Object.values(tempFormData.amountDistribution).reduce(
        (acc, curr) => acc + curr,
        0
      ),
      expenseType: tempFormData.expenseType.expenseType,
    };

    try {
      const result = await addExpense(payLoadData);
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setApiStatus("done");
    }
  };

  const isFormValid = () => {
    const { expenseType, persons, amount, shareType, amountDistribution } =
      formData;
    if (!expenseType || !persons) return false;

    if (shareType === "equal") {
      return amount > 0;
    } else {
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
          width: { xs: "70%", sm: "50%", md: 400 },
          backgroundColor: "rgba(255, 255, 255, 0.3)",
          backdropFilter: "blur(15px)",
          borderRadius: "2rem",
          boxShadow: 24,
          padding: "0.5rem 1rem 2rem 2rem",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <IconButton
            onClick={() => {
              resetForm();
              onClose();
            }}
            sx={{
              color: "white",
            }}
          >
            <CloseIcon />
          </IconButton>
        </div>

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            marginBottom: "1rem",
          }}
        >
          <Typography
            id="modal-title"
            variant="h6"
            component="h2"
            color="white"
          >
            Add New Expense
          </Typography>
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            mb: 2,
            maxHeight: "calc(100vh - 200px)",
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "#f0f0f0",
              borderRadius: "10px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#888",
              borderRadius: "10px",
              "&:hover": {
                backgroundColor: "#555",
              },
            },
          }}
        >
          <form onSubmit={handleSubmit} style={{ marginRight: "1rem" }}>
            <Box display="flex" flexDirection="row" gap={2} mb={2}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.shareType === "equal"}
                    onChange={handleCheckboxChange}
                    value="equal"
                    sx={{
                      color: "#ffffff",
                      "&.Mui-checked": {
                        color: "#ffffff",
                      },
                    }}
                  />
                }
                label="Equal"
                sx={{
                  color: "#ffffff",
                  "& .MuiTypography-root": {
                    fontWeight: "bold",
                  },
                }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.shareType === "unequal"}
                    onChange={handleCheckboxChange}
                    value="unequal"
                    sx={{
                      color: "#ffffff",
                      "&.Mui-checked": {
                        color: "#ffffff",
                      },
                    }}
                  />
                }
                label="Unequal"
                sx={{
                  color: "#ffffff",
                  "& .MuiTypography-root": {
                    fontWeight: "bold",
                  },
                }}
              />
            </Box>
            <Autocomplete
              multiple
              open={openAutocomplete}
              onOpen={() => setOpenAutocomplete(true)}
              onClose={() => {
                setOpenAutocomplete(false);
                setSearch("");
                setPersons([]);
              }}
              onInputChange={(event, value) => setSearch(value)}
              options={persons}
              getOptionLabel={(option) => option.appUserName}
              value={formData.persons}
              onChange={handleAutocompleteChangePerson}
              renderOption={(props, option) => {
                const { appUserName, username } = option;
                return (
                  <span
                    {...props}
                    style={{
                      background: "#393737",
                      color: "#ffffff",
                      borderBottom: "1px solid #ffffff",
                    }}
                  >
                    {`${appUserName} (${username})`}
                  </span>
                );
              }}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    key={`${option.username}-${index}`}
                    variant="outlined"
                    label={option.appUserName}
                    {...getTagProps({ index })}
                    sx={{
                      color: "white",
                      "& .MuiSvgIcon-root": {
                        color: "white",
                      },
                    }}
                  />
                ))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Persons ( Type name to search )"
                  margin="normal"
                  fullWidth
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <React.Fragment>
                        {loading ? (
                          <CircularProgress color="inherit" size={20} />
                        ) : null}
                        {params.InputProps.endAdornment}
                      </React.Fragment>
                    ),
                  }}
                  InputLabelProps={{
                    style: { color: "#ffffff" },
                  }}
                  sx={{
                    "& input[type=number]": {
                      "-moz-appearance": "textfield",
                      "-webkit-appearance": "none",
                      appearance: "textfield",
                      margin: 0,
                    },
                    "& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button":
                      {
                        "-webkit-appearance": "none",
                        margin: 0,
                      },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#ffffff", // Change outline color
                      },
                      "&:hover fieldset": {
                        borderColor: "#ffffff", // Change outline color on hover
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#ffffff", // Change outline color when focused
                      },
                      "& .MuiSvgIcon-root": {
                        color: "#ffffff",
                      },
                      "& .MuiInputBase-input": {
                        color: "#ffffff",
                      },
                    },
                  }}
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
                InputProps={{
                  inputProps: {
                    style: {
                      MozAppearance: "textfield", // Firefox
                    },
                  },
                  // Additional styles for hiding the up/down buttons
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                }}
                InputLabelProps={{
                  style: { color: "#ffffff" }, // Change label color
                }}
                sx={{
                  "& input[type=number]": {
                    "-moz-appearance": "textfield", // Hide buttons in Firefox
                    "-webkit-appearance": "none", // Hide buttons in Chrome, Safari, Edge
                    appearance: "textfield",
                    margin: 0, // Removes any margin
                  },
                  "& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button":
                    {
                      "-webkit-appearance": "none",
                      margin: 0, // Removes any margin for the spin buttons
                    },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#ffffff", // Change outline color
                    },
                    "&:hover fieldset": {
                      borderColor: "#ffffff", // Change outline color on hover
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#ffffff", // Change outline color when focused
                    },
                    "& .MuiInputBase-input": {
                      color: "#ffffff",
                    },
                  },
                }}
              />
            ) : (
              formData.persons.map((person, index) => (
                <Box key={person._id} display="flex" alignItems="center" mb={1}>
                  <TextField
                    label={`Amount Spent On ${person.name}`}
                    type="number"
                    value={formData.amountDistribution[person._id] || ""}
                    onChange={(e) =>
                      handleIndividualAmountChange(person._id, e.target.value)
                    }
                    fullWidth
                    margin="normal"
                    InputProps={{
                      inputProps: {
                        style: {
                          MozAppearance: "textfield", // Firefox
                        },
                      },
                      // Additional styles for hiding the up/down buttons
                      inputMode: "numeric",
                      pattern: "[0-9]*",
                    }}
                    InputLabelProps={{
                      style: { color: "#ffffff" }, // Change label color
                    }}
                    sx={{
                      "& input[type=number]": {
                        "-moz-appearance": "textfield", // Hide buttons in Firefox
                        "-webkit-appearance": "none", // Hide buttons in Chrome, Safari, Edge
                        appearance: "textfield",
                        margin: 0, // Removes any margin
                      },
                      "& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button":
                        {
                          "-webkit-appearance": "none",
                          margin: 0, // Removes any margin for the spin buttons
                        },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "#ffffff", // Change outline color
                        },
                        "&:hover fieldset": {
                          borderColor: "#ffffff", // Change outline color on hover
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#ffffff", // Change outline color when focused
                        },
                        "& .MuiInputBase-input": {
                          color: "#ffffff",
                        },
                      },
                    }}
                  />
                </Box>
              ))
            )}

            <Autocomplete
              options={expenseTypes}
              getOptionLabel={(option) => option.expenseType}
              value={formData.expenseType}
              onChange={handleAutocompleteChangeExpenseType}
              renderOption={(props, option) => {
                const { expenseType } = option;
                return (
                  <span
                    {...props}
                    style={{ background: "#393737", color: "white" }}
                  >
                    {`${expenseType}`}
                  </span>
                );
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Expense Type"
                  onKeyDown={(e) => e.preventDefault()}
                  placeholder="Select an expense type"
                  margin="normal"
                  fullWidth
                  InputLabelProps={{
                    style: { color: "#ffffff" }, // Change label color
                  }}
                  sx={{
                    "& input[type=number]": {
                      "-moz-appearance": "textfield", // Hide buttons in Firefox
                      "-webkit-appearance": "none", // Hide buttons in Chrome, Safari, Edge
                      appearance: "textfield",
                      margin: 0, // Removes any margin
                    },
                    "& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button":
                      {
                        "-webkit-appearance": "none",
                        margin: 0, // Removes any margin for the spin buttons
                      },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#ffffff", // Change outline color
                      },
                      "&:hover fieldset": {
                        borderColor: "#ffffff", // Change outline color on hover
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#ffffff", // Change outline color when focused
                      },
                      "& .MuiInputBase-input": {
                        color: "#ffffff",
                      },
                      "& .MuiSvgIcon-root": {
                        color: "#ffffff",
                      },
                    },
                  }}
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
                InputLabelProps={{
                  style: { color: "#ffffff" },
                }}
                sx={{
                  "& input[type=number]": {
                    "-moz-appearance": "textfield", // Hide buttons in Firefox
                    "-webkit-appearance": "none", // Hide buttons in Chrome, Safari, Edge
                    appearance: "textfield",
                    margin: 0, // Removes any margin
                  },
                  "& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button":
                    {
                      "-webkit-appearance": "none",
                      margin: 0, // Removes any margin for the spin buttons
                    },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#ffffff", // Change outline color
                    },
                    "&:hover fieldset": {
                      borderColor: "#ffffff", // Change outline color on hover
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#ffffff", // Change outline color when focused
                    },
                    "& .MuiInputBase-input": {
                      color: "#ffffff",
                    },
                  },
                }}
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
            disabled={apiStatus === "loading"}
            variant="outlined"
            color="primary"
            sx={{
              mr: 2,
              background: "transparent",
              borderRadius: "2rem",
              color: "white",
              border: "2px solid white",
              "&:hover": {
                background: "#393737",
                border: "2px solid white",
                color: "white",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={apiStatus === "loading" ? true : !isFormValid()}
            onClick={handleSubmit}
            sx={{
              background: "white",
              borderRadius: "2rem",
              color: "black",
              border: "none",
              "&:hover": {
                background: "#393737",
                color: "white",
              },
            }}
          >
            {apiStatus === "loading" ? <CircularProgress size={10} sx={{ color: 'white' }} /> : "Submit "}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddExpense;
