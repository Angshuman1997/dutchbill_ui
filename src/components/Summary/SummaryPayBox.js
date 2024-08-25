import * as React from "react";
import { Chip } from "@mui/material";
import "./SummaryPayBox.css";

export default function SummaryPayBox({ data, user, handlePaymentModal }) {
  return (
    <React.Fragment>
      {data.map((i, index) => (
        <button
          onClick={() =>
            handlePaymentModal({
              user: { _id: user._id, name: user.appUserName },
              expUser: { _id: i._id, name: i.appUserName },
              type: i.type
            })
          }
          key={index}
          className={`summary-btn ${
            i.type === "receive" ? "green-border" : "red-border"
          }`}
        >
          <Chip
            label={i.type}
            color={`${i.type === "receive" ? "success" : "error"}`}
            sx={{
              width: "100%",
            }}
          />
          <div className="summary-content-layout">
            <div className="summary-content-name">{`${i.appUserName}`}</div>
            <div className="summary-content-amount">{`${Math.abs(
              i.amount
            )}/-`}</div>
          </div>
        </button>
      ))}
    </React.Fragment>
  );
}
