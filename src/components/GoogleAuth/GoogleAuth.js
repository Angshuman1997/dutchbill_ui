import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../auth/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserData } from "../../redux/actions/actionTypes";
import { toast } from "react-toastify";
import { Button } from "@mui/material";
import { fetchUserCreds } from "../../api/apiFunc";

const GoogleAuth = ({ setUserSignUp }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleGoogleAuth = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);

      const user = result.user;
      const token = await user.getIdToken();

      if (user) {
        localStorage.setItem("sessionToken", token);
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
    <Button onClick={handleGoogleAuth} variant="contained" color="primary">
      Sign In / Sign Up with Google
    </Button>
  );
};

export default GoogleAuth;
