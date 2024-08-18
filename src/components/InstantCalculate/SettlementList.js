import React from "react";
import { List, ListItem, Typography } from "@mui/material";

const SettlementList = ({ settlements }) => (
  <React.Fragment>
    <Typography variant="h6">Settlements:</Typography>
    <List>
      {settlements.map((settlement, index) => (
        <ListItem key={index}>
          {settlement.from} owes {settlement.to} ${settlement.amount}
        </ListItem>
      ))}
    </List>
  </React.Fragment>
);

export default SettlementList;
