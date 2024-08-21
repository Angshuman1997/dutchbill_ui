import React from "react";
import { useSelector } from "react-redux";
import Summary from "../../components/Summary/Summary";
import Expenses from "../../components/Expenses/Expenses";
import Groups from "../../components/Groups/Groups";
import InstantCalculate from "../../components/InstantCalculate/InstantCalculate";

const DashBoardContent = () => {
  const tabSelect = useSelector((state) => state.tabSelect);

  const TabContent = () => {
    switch (tabSelect) {
      case "Expenses":
        return <Expenses />;
      case "Groups":
        return <Groups />;
      case "InstantCalculate":
        return <InstantCalculate />;
      default:
        return <Summary />;
    }
  };

  return <React.Fragment>{TabContent()}</React.Fragment>;
};

export default DashBoardContent;
