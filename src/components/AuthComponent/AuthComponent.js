import React, { useEffect, useState } from "react";
import { Box, Button, Grow, TextField, Typography } from "@mui/material";
import "./AuthComponent.css"; // Ensure you create and import this CSS file for the transition styles

const AuthComponent = () => {
  const [currentView, setCurrentView] = useState("login");
  const [stageTrans, setStageTrans] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    fullName: "",
    email: "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });

  const initialValue = {
    username: "",
    password: "",
    fullName: "",
    email: "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
  };

  useEffect(() => {
    if (currentView === "login") {
      setFormData(initialValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentView]);

  useEffect(() => {
    if (!stageTrans) {
      setTimeout(() => {
        setStageTrans(true);
      }, 300);
    }
  }, [stageTrans]);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleLogin() {
    console.log("Login data:", formData);
    // Implement login logic here
  }

  function handleSignup() {
    console.log("Signup data:", formData);
    // Implement signup logic here
  }

  function handleVerifyOtp() {
    console.log("OTP data:", formData.otp);
    // Implement OTP verification logic here
  }

  function handleResetPassword() {
    console.log("Reset Password data:", formData);
    // Implement reset password logic here
  }

  function handleSubmit(action) {
    action(); // Execute the respective action (e.g., handleLogin, handleSignup, etc.)
  }

  const handleViewChange = (view) => {
    setStageTrans(false);
    setTimeout(() => {
      setCurrentView(view);
      setStageTrans(true);
    }, 300);
  };

  const renderStage = () => {
    switch (currentView) {
      case "login":
        return renderLogin();
      case "signup":
        return renderSignup();
      case "verifyOtp":
        return renderVerifyOtp();
      case "forgotPassword":
        return renderForgotPassword();
      case "resetPassword":
        return renderResetPassword();
      default:
        return renderLogin();
    }
  };

  const renderLogin = () => {
    const isLoginDisabled = !formData.username || !formData.password;

    return (
      <Grow in={stageTrans}>
        <Box
          className="auth-box"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          borderRadius={"2rem"}
          marginRight={"2rem"}
        >
          <Typography
            variant="h6"
            sx={{ marginBottom: 2, fontWeight: 600, fontFamily: "sans-serif" }}
          >
            Login
          </Typography>
          <TextField
            label="Username"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            sx={{ marginBottom: 2 }}
          />
          <Box sx={{ marginTop: 2, marginBottom: 2 }}>
            <Button
              variant="contained"
              onClick={() => handleSubmit(handleLogin)}
              disabled={isLoginDisabled}
              sx={{ marginBottom: 2 }}
            >
              Login
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              marginTop: 1,
              marginBottom: 2,
            }}
          >
            <Button
              variant="text"
              onClick={() => handleViewChange("signup")}
              sx={{ textTransform: "none", padding: 0 }}
            >
              Signup
            </Button>
            <Button
              variant="text"
              onClick={() => handleViewChange("forgotPassword")}
              sx={{ textTransform: "none", padding: 0 }}
            >
              Forgot Password
            </Button>
          </Box>
        </Box>
      </Grow>
    );
  };

  const renderSignup = () => {
    const isSignupDisabled =
      !formData.fullName ||
      !formData.email ||
      !formData.username ||
      !formData.password;
    return (
      <Grow in={stageTrans}>
        <Box
          className="auth-box"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          borderRadius={"2rem"}
          marginRight={"2rem"}
        >
          <Typography
            variant="h6"
            sx={{ marginBottom: 2, fontWeight: 600, fontFamily: "sans-serif" }}
          >
            Signup
          </Typography>
          <TextField
            label="Full Name"
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Username"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            sx={{ marginBottom: 2 }}
          />
          <Box sx={{ marginTop: 2, marginBottom: 2 }}>
            <Button
              variant="contained"
              onClick={() => {
                handleSubmit(handleSignup);
                handleViewChange("verifyOtp");
              }}
              disabled={isSignupDisabled}
              sx={{ marginBottom: 2 }}
            >
              Signup
            </Button>
          </Box>
          <Box sx={{ marginTop: "auto", width: "100%" }}>
            <Button
              variant="text"
              onClick={() => handleViewChange("login")}
              sx={{ textTransform: "none", padding: 0, width: "100%" }}
            >
              Back to Login
            </Button>
          </Box>
        </Box>
      </Grow>
    );
  };

  const renderVerifyOtp = () => {
    const isVerifyDisabled = !formData.otp;

    return (
      <Grow in={stageTrans}>
        <Box
          className="auth-box"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          borderRadius={"2rem"}
          marginRight={"2rem"}
        >
          <Typography
            variant="h6"
            sx={{ marginBottom: 2, fontWeight: 600, fontFamily: "sans-serif" }}
          >
            Verify OTP
          </Typography>
          <TextField
            label="OTP"
            type="text"
            name="otp"
            value={formData.otp}
            onChange={handleChange}
            sx={{ marginBottom: 2 }}
          />
          <Box sx={{ marginTop: 2, marginBottom: 2 }}>
            <Button
              variant="contained"
              onClick={() => handleSubmit(handleVerifyOtp)}
              disabled={isVerifyDisabled}
              sx={{ marginBottom: 2 }}
            >
              Verify OTP
            </Button>
          </Box>
          <Box sx={{ marginTop: "auto", width: "100%" }}>
            <Button
              variant="text"
              onClick={() => handleViewChange("login")}
              sx={{ textTransform: "none", padding: 0, width: "100%" }}
            >
              Back to Login
            </Button>
          </Box>
        </Box>
      </Grow>
    );
  };

  const renderForgotPassword = () => {
    const isSendOtpDisabled = !formData.email;

    return (
      <Grow in={stageTrans}>
        <Box
          className="auth-box"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          borderRadius={"2rem"}
          marginRight={"2rem"}
        >
          <Typography
            variant="h6"
            sx={{ marginBottom: 2, fontWeight: 600, fontFamily: "sans-serif" }}
          >
            Forgot Password
          </Typography>
          <TextField
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            sx={{ marginBottom: 2 }}
          />
          <Box sx={{ marginTop: 2, marginBottom: 2 }}>
            <Button
              variant="contained"
              onClick={() => handleViewChange("resetPassword")}
              disabled={isSendOtpDisabled}
              sx={{ marginBottom: 2 }}
            >
              Send OTP
            </Button>
          </Box>
          <Box sx={{ marginTop: "auto", width: "100%" }}>
            <Button
              variant="text"
              onClick={() => handleViewChange("login")}
              sx={{ textTransform: "none", padding: 0, width: "100%" }}
            >
              Back to Login
            </Button>
          </Box>
        </Box>
      </Grow>
    );
  };

  const renderResetPassword = () => {
    const isResetDisabled =
      !formData.otp ||
      !formData.newPassword ||
      !formData.confirmPassword ||
      formData.newPassword !== formData.confirmPassword;

    const handleResetPasswordClick = () => {
      if (formData.newPassword !== formData.confirmPassword) {
        alert("New Password and Confirm New Password do not match");
      } else {
        handleSubmit(handleResetPassword);
      }
    };

    return (
      <Grow in={stageTrans}>
        <Box
          className="auth-box"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          borderRadius={"2rem"}
          marginRight={"2rem"}
        >
          <Typography
            variant="h6"
            sx={{ marginBottom: 2, fontWeight: 600, fontFamily: "sans-serif" }}
          >
            Reset Password
          </Typography>
          <TextField
            label="OTP"
            type="text"
            name="otp"
            value={formData.otp}
            onChange={handleChange}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="New Password"
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Confirm New Password"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            sx={{ marginBottom: 2 }}
          />
          <Box sx={{ marginTop: 2, marginBottom: 2 }}>
            <Button
              variant="contained"
              onClick={handleResetPasswordClick}
              disabled={isResetDisabled}
              sx={{ marginBottom: 2 }}
            >
              Reset Password
            </Button>
          </Box>
          <Box sx={{ marginTop: "auto", width: "100%" }}>
            <Button
              variant="text"
              onClick={() => handleViewChange("login")}
              sx={{ textTransform: "none", padding: 0, width: "100%" }}
            >
              Back to Login
            </Button>
          </Box>
        </Box>
      </Grow>
    );
  };

  return renderStage();
};

export default AuthComponent;
