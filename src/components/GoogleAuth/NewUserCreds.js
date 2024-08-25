// firebaseName, appUserName, username, emailId
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  TextField,
  Container,
  Grid,
  Typography,
  Paper,
  Button,
} from "@mui/material";
import { setUserData } from "../../redux/actions/actionTypes";
import { createUser } from "../../api/apiFunc";
import { toast } from "react-toastify";

const NewUserCreds = ({ userSignUp, setUserSignUp }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // State for form fields
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    const createUserApi = await createUser({
      ...userSignUp,
      ...{ appUserName: name, username: username },
    });
    if (createUserApi && createUserApi.status === 201) {
      dispatch(setUserData(createUserApi));
      toast.success(createUserApi.message);
      setUserSignUp(null);
      navigate("/dashboard");
    } else {
      toast.error(createUserApi.message);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ padding: "2rem" }}>
      <Paper
        elevation={3}
        sx={{
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" sx={{ marginBottom: "1rem" }}>
          New Account
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sx={{ marginTop: "1rem" }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default NewUserCreds;
