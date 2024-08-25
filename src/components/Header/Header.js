import React, { useState } from "react";
import "./Header.css";
import { Button } from "@mui/material";
import LoginModal from "../../pages/Login/LoginModal";
import { useNavigate, useLocation } from "react-router-dom";
import LogoComponent from "../LogoComponent/LogoComponent";
import { signOut } from "firebase/auth";
import { auth } from "../../auth/firebaseConfig";
import { toast } from "react-toastify";

const Header = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Successfully logged out.");
      localStorage.setItem("sessionToken", "");
      localStorage.setItem("userEmail", "");
      navigate("/");
    } catch (error) {
      toast.error("Failed to log out. Please try again.");
      console.error("Logout Error:", error);
    }
  };

  return (
    <div className="header-main">
      <div style={{ marginLeft: "1rem" }}>
        <LogoComponent />
      </div>
      <div style={{ marginRight: "1rem" }}>
        {location.pathname !== "/dashboard" ? (
          <React.Fragment>
            <Button
              variant="contained"
              disabled={true}
              sx={{
                color: "#0d0c0b",
                fontWeight: "bold",
                borderColor: "#0d0c0b",
                borderWidth: "2px",
                marginRight: "0.7rem",
                borderRadius: "100px",
                backgroundColor: "#ffffff",
                "&:hover": {
                  borderColor: "#d3e5f5",
                  borderWidth: "2px",
                  backgroundColor: "#d3e5f5",
                },
                "@media (max-width: 600px)": {
                  fontSize: "0.8rem",
                  padding: "6px 12px",
                },
                "@media (min-width: 601px)": {
                  fontSize: "1rem",
                  padding: "8px 16px",
                },
              }}
            >
              About
            </Button>
            <Button
              variant="contained"
              sx={{
                color: "#0d0c0b",
                fontWeight: "bold",
                borderColor: "#0d0c0b",
                borderWidth: "2px",
                borderRadius: "100px",
                backgroundColor: "#ffffff",
                "&:hover": {
                  borderColor: "#d3e5f5",
                  borderWidth: "2px",
                  backgroundColor: "#d3e5f5",
                },
                "@media (max-width: 600px)": {
                  fontSize: "0.8rem",
                  padding: "6px 12px",
                },
                "@media (min-width: 601px)": {
                  fontSize: "1rem",
                  padding: "8px 16px",
                },
              }}
              onClick={handleLogin}
            >
              Login
            </Button>
          </React.Fragment>
        ) : (
          <Button
            variant="contained"
            sx={{
              color: "#0d0c0b",
              fontWeight: "bold",
              borderColor: "#0d0c0b",
              borderWidth: "2px",
              borderRadius: "100px",
              backgroundColor: "#ffffff",
              "&:hover": {
                borderColor: "#d3e5f5",
                borderWidth: "2px",
                backgroundColor: "#d3e5f5",
              },
              "@media (max-width: 600px)": {
                fontSize: "0.8rem",
                padding: "6px 12px",
              },
              "@media (min-width: 601px)": {
                fontSize: "1rem",
                padding: "8px 16px",
              },
            }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        )}
      </div>
      <LoginModal open={open} onClose={handleClose} />
    </div>
  );
};

export default Header;
