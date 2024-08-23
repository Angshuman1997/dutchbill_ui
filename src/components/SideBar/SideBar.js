import React, { useState } from "react";
import Tab from "../Tab/Tab";
import "./SideBar.css";
import { useDispatch, useSelector } from "react-redux";
import { setTabSelect } from "../../redux/actions/actionTypes";
import { Button } from "@mui/material";

const SideBar = ({ handleOpenAddExpense }) => {
  const dispatch = useDispatch();
  const tabSelect = useSelector((state) => state.tabSelect);
  const [selectedTab, setSelectedTab] = useState(tabSelect);

  const handleTabClick = (tabLabel) => {
    setSelectedTab(tabLabel);
    dispatch(setTabSelect(tabLabel));
  };

  return (
    <div className="sidebar">
      <Tab
        label="Summary"
        active={selectedTab === "Summary"}
        onClick={() => handleTabClick("Summary")}
      />
      <Tab
        label="Expenses"
        active={selectedTab === "Expenses"}
        onClick={() => handleTabClick("Expenses")}
      />
      <Button
        variant="contained"
        onClick={() => handleOpenAddExpense()}
        sx={{
          marginTop: "16px",
          color: "black",
          background: "white",
          "&:hover": {
            background: "#c7c7c7",
          },
        }}
      >
        Add Expenses
      </Button>
    </div>
  );
};

export default SideBar;

// For later

// <Tab
//         label="Groups"
//         active={selectedTab === "Groups"}
//         onClick={() => handleTabClick("Groups")}
//       />
//       <Tab
//         label="Instant Calculate"
//         active={selectedTab === "InstantCalculate"}
//         onClick={() => handleTabClick("InstantCalculate")}
//       />
