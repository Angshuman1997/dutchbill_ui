import React from "react";
import { Box, Modal } from "@mui/material";
import GoogleAuth from "../../components/GoogleAuth/GoogleAuth";
import NewUserCreds from "../../components/GoogleAuth/NewUserCreds";

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
  const [userSignUp, setUserSignUp] = React.useState(null);

  return (
    <Modal open={open} onClose={onClose}>
      {userSignUp ? (
        <NewUserCreds userSignUp={userSignUp} setUserSignUp={setUserSignUp} />
      ) : (
        <Box sx={style}>
          <GoogleAuth setUserSignUp={setUserSignUp} />
        </Box>
      )}
    </Modal>
  );
}
