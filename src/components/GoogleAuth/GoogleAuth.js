import React, { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../auth/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserData } from "../../redux/actions/actionTypes";
import { toast } from "react-toastify";
import { Button, CircularProgress } from "@mui/material";
import { fetchUserCreds } from "../../api/apiFunc";

const GoogleAuth = ({ setUserSignUp }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleGoogleAuth = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);

      const user = result.user;
      const token = user.accessToken;

      if (user) {
        localStorage.setItem("sessionToken", token);
        localStorage.setItem("userEmail", user.email);
        const fetchUser = await fetchUserCreds({ userEmail: user.email });
        if (fetchUser && fetchUser.status === 200) {
          dispatch(setUserData(fetchUser));
          navigate("/dashboard");
          toast.success(fetchUser.message);
        } else if (fetchUser && fetchUser.status === 201) {
          setUserSignUp({
            firebaseName: user.displayName,
            emailId: user.email,
          });
          toast.success(fetchUser.message);
        } else {
          toast.error(fetchUser.message);
        }
      } else {
        toast.error("Failed to login");
      }
    } catch (error) {
      console.error("Error with Google Authentication:", error);
    }
  };

  return (
    <Button
      onClick={handleGoogleAuth}
      disabled={loading}
      sx={{
        background: "#393737",
        color: "white",
        borderRadius: "1rem",
        "&:hover": {
          background: "#393737",
          opacity: "0.8"
        },
      }}
    >
      {loading ?  <CircularProgress size={20} sx={{ color: "white" }} /> : "Sign In / Sign Up with Google"}
    </Button>
  );
};

export default GoogleAuth;
