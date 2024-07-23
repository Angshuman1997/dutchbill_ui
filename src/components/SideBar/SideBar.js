import React, { useState } from "react";
import Tab from "../Tab/Tab";
import "./SideBar.css";
import { useDispatch } from "react-redux";
import { setTabSelect } from "../../redux/actions/actionTypes";

const SideBar = () => {
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
    </div>
  );
};

export default SideBar;

// <Tab label="Plan Expense" active={selectedTab === 'PlanExpense'} onClick={()=>handleTabClick('PlanExpense')} />
// <Tab label="Settings" active={selectedTab === 'Settings'} onClick={() => handleTabClick('Settings')} />
