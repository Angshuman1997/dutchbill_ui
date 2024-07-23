import * as React from "react";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";

const user = "Syed";

const data = [
  {
    type: "pay",
    payTo: "Anshuli",
    receiveFrom: null,
    amount: "100",
    status: "pending",
    trancsId: "1",
    trnscCompleteDate: null,
  },
  {
    type: "receive",
    payTo: null,
    receiveFrom: "Aaquib",
    amount: "100",
    status: "pending",
    trancsId: "2",
    trnscCompleteDate: null,
  },
  {
    type: "pay",
    payTo: "Angshuman",
    receiveFrom: null,
    amount: "100",
    status: "done",
    trancsId: "3",
    trnscCompleteDate: "19/07/2024",
  },
  {
    type: "receive",
    payTo: null,
    receiveFrom: "Rajat",
    amount: "100",
    status: "done",
    trancsId: "4",
    trnscCompleteDate: "22/07/2024",
  },
  {
    type: "pay",
    payTo: "Anshuli",
    receiveFrom: null,
    amount: "100",
    status: "pending",
    trancsId: "1",
    trnscCompleteDate: null,
  },
  {
    type: "receive",
    payTo: null,
    receiveFrom: "Aaquib",
    amount: "100",
    status: "pending",
    trancsId: "2",
    trnscCompleteDate: null,
  },
  {
    type: "pay",
    payTo: "Angshuman",
    receiveFrom: null,
    amount: "100",
    status: "done",
    trancsId: "3",
    trnscCompleteDate: "19/07/2024",
  },
  {
    type: "receive",
    payTo: null,
    receiveFrom: "Rajat",
    amount: "100",
    status: "done",
    trancsId: "4",
    trnscCompleteDate: "22/07/2024",
  },
  {
    type: "pay",
    payTo: "Anshuli",
    receiveFrom: null,
    amount: "100",
    status: "pending",
    trancsId: "1",
    trnscCompleteDate: null,
  },
  {
    type: "receive",
    payTo: null,
    receiveFrom: "Aaquib",
    amount: "100",
    status: "pending",
    trancsId: "2",
    trnscCompleteDate: null,
  },
  {
    type: "pay",
    payTo: "Angshuman",
    receiveFrom: null,
    amount: "100",
    status: "done",
    trancsId: "3",
    trnscCompleteDate: "19/07/2024",
  },
  {
    type: "receive",
    payTo: null,
    receiveFrom: "Rajat",
    amount: "100",
    status: "done",
    trancsId: "4",
    trnscCompleteDate: "22/07/2024",
  },
];

export default function OverViewPayBox() {
  return (
    <div className="overview-pay-box-scrollable-container">
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {data.map((i, index) => (
          <Grid item xs={4} sm={4} md={4} key={`${index}-${i.trancsId}`}>
            <Card sx={{ minWidth: 275, width: "100%", height: "200px" }}>
              <Chip
                label={i.type}
                color={i.type === "pay" ? "error" : "success"}
              />
              <div>{`Status: ${i.status}`}</div>
              {i.status === "done" && (
                <div>{`Transaction Completed On: ${i.trnscCompleteDate}`}</div>
              )}
              {i.type === "pay" && (
                <div>
                  <div>{`${user} ---> ${i.amount} ---> ${i.payTo}`}</div>
                </div>
              )}
              {i.type === "receive" && (
                <div>
                  <div>{`${i.receiveFrom} ---> ${i.amount} ---> ${user}`}</div>
                </div>
              )}
              <Button />
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
