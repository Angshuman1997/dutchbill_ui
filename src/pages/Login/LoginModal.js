import React, { useState } from "react";
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CloseOutlined } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { setUserData } from "../../redux/actions/actionTypes";
import {
  addNewUser,
  checkExistingUser,
  getUser,
  otpActionUser,
  updateUser,
} from "../../api/apiFunc";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  maxWidth: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: 2,
};

export default function LoginModal({ open, onClose }) {
  const [phase, setPhase] = useState("login");
  const [formData, setFormData] = useState({});
  const [userDataForOTP, setUserDataForOTP] = useState({});
  const [forPassOTPData, setForPassOTPData] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (phase === "login") {
        // LOGIN

        const getUserData = await getUser({
          userId: "",
          username: formData.username,
          userEmail: "",
          password: formData.password,
          formType: "login",
        });

        if (getUserData && getUserData.success) {
          try {
            dispatch(setUserData(getUserData));
            navigate("/dashboard");
            toast.success(`Welcome ${getUserData.data.name} !`);
          } catch (error) {
            // console.error(error);
            toast.error("Something went wrong !");
          }
        } else {
          toast.error("Please check the username and password");
        }
      } else if (phase === "signup") {
        // SIGNUP

        if (formData.password !== formData.confirmPassword) {
          toast.error("Pasword did not match");
        } else {
          const checkUserExists = await checkExistingUser({
            userEmail: formData.emailId,
            username: formData.username,
            formType: "signup",
          });

          if (checkUserExists && checkUserExists.status === 500) {
            toast.error(checkUserExists.message);
          } else {
            if (checkUserExists && checkUserExists.userExists === false) {
              const createUserData = await addNewUser({
                name: formData.name,
                emailId: formData.emailId,
                username: formData.username,
                password: formData.password,
              });

              if (createUserData && createUserData.success) {
                setUserDataForOTP({
                  id: createUserData.insertedId,
                  name: formData.name,
                  emailId: formData.emailId,
                });
                toast.success(createUserData.message);
                setPhase("otpSignUp");
              } else {
                toast.error(createUserData.message);
              }
            } else {
              toast.error(checkUserExists.message);
            }
          }
        }
      } else if (phase === "otpSignUp") {
        // OTP FOR SIGNUP

        const otpAction = await otpActionUser({
          ...userDataForOTP,
          onTime: true,
          resend: false,
          otpValue: formData.otp,
          formType: "signup",
        });

        if (otpAction && otpAction.otpVerification) {
          try {
            toast.success(otpAction.message);
            setPhase("login");
          } catch (error) {
            // console.error(error);
            toast.error("Something went wrong !");
          }
        } else {
          toast.error(otpAction.message);
        }
      } else if (phase === "otpForPass") {
        // OTP FOR FORGET PASSWORD

        if (forPassOTPData && forPassOTPData.success) {
          try {
            const updateUserData = await updateUser({
              name: "",
              formType: "forgetpass",
              password: formData.password,
              username: formData.username,
              userEmail: formData.emailId,
              userId: "",
            });

            if (updateUserData.success) {
              toast.success("Password Changed successful, please login");
              setPhase("login");
            } else {
              toast.error(updateUserData.message);
            }
          } catch (error) {
            // console.error(error);
            toast.error("Something went wrong !");
          }
        } else {
          toast.error(forPassOTPData.message);
        }
      } else if (phase === "forgotPassword") {
        // FORGET PASSWORD
        if (formData.password !== formData.confirmPassword) {
          toast.error("Password did not match");
        } else {
          const checkUserExists = await checkExistingUser({
            userEmail: formData.emailId,
            username: formData.username,
            formType: "forgetpass",
          });

          if (checkUserExists && checkUserExists.status === 500) {
            toast.error(checkUserExists.message);
          } else {
            if (checkUserExists && checkUserExists.userExists === true) {
              try {
                const otpAction = await otpActionUser({
                  id: "",
                  name: "",
                  emailId: formData.emailId,
                  onTime: true,
                  resend: true,
                  otpValue: "",
                  formType: "forgetpass",
                });
                setForPassOTPData(otpAction);
                toast.success("Please check email for OTP");
                setPhase("otpForPass");
              } catch (error) {
                toast.error(error.message);
              }
            } else {
              toast.error(checkUserExists.message);
            }
          }
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const renderPhase = () => {
    switch (phase) {
      case "login":
        return (
          <React.Fragment>
            <IconButton
              onClick={onClose}
              sx={{ position: "absolute", top: 10, right: 10 }}
            >
              <CloseOutlined />
            </IconButton>
            <Typography variant="h6">Login</Typography>
            <TextField
              label="Username"
              name="username"
              onChange={handleChange}
            />
            <TextField
              label="Password"
              type="password"
              name="password"
              onChange={handleChange}
            />
            <Button variant="contained" onClick={handleSubmit}>
              Login
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {}}
              disabled
            >
              Login with Google - disabled
            </Button>
            <Box display="flex" justifyContent="space-between">
              <Button onClick={() => setPhase("signup")}>Signup</Button>
              <Button onClick={() => setPhase("forgotPassword")}>
                Forgot Password
              </Button>
            </Box>
          </React.Fragment>
        );
      case "signup":
        return (
          <React.Fragment>
            <IconButton
              onClick={onClose}
              sx={{ position: "absolute", top: 10, right: 10 }}
            >
              <CloseOutlined />
            </IconButton>
            <Typography variant="h6">Signup</Typography>
            <TextField label="Name" name="name" onChange={handleChange} />
            <TextField
              label="Username"
              name="username"
              onChange={handleChange}
            />
            <TextField label="Email" name="emailId" onChange={handleChange} />
            <TextField
              label="Password"
              type="password"
              name="password"
              onChange={handleChange}
            />
            <TextField
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              onChange={handleChange}
            />
            <Button variant="contained" onClick={handleSubmit}>
              Signup
            </Button>
            <Button onClick={() => setPhase("login")}>Back to Login</Button>
          </React.Fragment>
        );
      case "otpSignUp":
        return (
          <React.Fragment>
            <IconButton
              onClick={onClose}
              sx={{ position: "absolute", top: 10, right: 10 }}
            >
              <CloseOutlined />
            </IconButton>
            <Typography variant="h6">Verify OTP</Typography>
            <TextField label="OTP" name="otp" onChange={handleChange} />
            <Button variant="contained" onClick={handleSubmit}>
              Verify
            </Button>
            <Button onClick={() => setPhase("login")}>Back to Login</Button>
          </React.Fragment>
        );
      case "otpForPass":
        return (
          <React.Fragment>
            <IconButton
              onClick={onClose}
              sx={{ position: "absolute", top: 10, right: 10 }}
            >
              <CloseOutlined />
            </IconButton>
            <Typography variant="h6">Verify OTP</Typography>
            <TextField label="OTP" name="otp" onChange={handleChange} />
            <Button variant="contained" onClick={handleSubmit}>
              Verify
            </Button>
            <Button onClick={() => setPhase("login")}>Back to Login</Button>
          </React.Fragment>
        );
      case "forgotPassword":
        return (
          <React.Fragment>
            <IconButton
              onClick={onClose}
              sx={{ position: "absolute", top: 10, right: 10 }}
            >
              <CloseOutlined />
            </IconButton>
            <Typography variant="h6">Forgot Password</Typography>
            <TextField
              label="Username"
              name="username"
              onChange={handleChange}
            />
            <TextField label="Email" name="emailId" onChange={handleChange} />
            <TextField
              label="Password"
              type="password"
              name="password"
              onChange={handleChange}
            />
            <TextField
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              onChange={handleChange}
            />
            <Button variant="contained" onClick={handleSubmit}>
              Send OTP
            </Button>
            <Button onClick={() => setPhase("login")}>Back to Login</Button>
          </React.Fragment>
        );
      default:
        return null;
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>{renderPhase()}</Box>
    </Modal>
  );
}
