import React, { useState } from "react";
import Tab from "../Tab/Tab";
import "./SideBar.css";
import { useDispatch } from "react-redux";
import { setTabSelect } from "../../redux/actions/actionTypes";
import { Button } from "@mui/material";

const SideBar = ({ handleOpenAddExpense }) => {
  const dispatch = useDispatch();
  const [selectedTab, setSelectedTab] = useState("Overview");

  const handleTabClick = (tabLabel) => {
    setSelectedTab(tabLabel);
    dispatch(setTabSelect(tabLabel));
  };

  return (
    <div className="sidebar">
      <Tab
        label="Overview"
        active={selectedTab === "Overview"}
        onClick={() => handleTabClick("Overview")}
      />
      <Tab
        label="Expenses"
        active={selectedTab === "Expenses"}
        onClick={() => handleTabClick("Expenses")}
      />
      <Tab
        label="Groups"
        active={selectedTab === "Groups"}
        onClick={() => handleTabClick("Groups")}
      />
      <Tab
        label="Instant Calculate"
        active={selectedTab === "InstantCalculate"}
        onClick={() => handleTabClick("InstantCalculate")}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={()=>handleOpenAddExpense()}
        style={{ marginTop: "16px" }}
      >
        Add Expenses
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={()=>{}}
        style={{ marginTop: "16px" }}
      >
        Add Friends
      </Button>
    </div>
  );
};

export default SideBar;
