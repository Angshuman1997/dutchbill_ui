import * as React from "react";
import { Chip } from "@mui/material";
import "./SummaryPayBox.css";

export default function SummaryPayBox({ data, user }) {
  return (
    <React.Fragment>
      {data.map((i, index) => (
        <button
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
            <div className="summary-content-amount">{`${Math.abs(i.amount)}/-`}</div>
          </div>
        </button>
      ))}
    </React.Fragment>
  );
}
