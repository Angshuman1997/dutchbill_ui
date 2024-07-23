import React from 'react';
import { useSelector } from 'react-redux';
import OverView from '../../components/Misc/OverView/OverView';
import Expenses from '../../components/Misc/Expenses/Expenses';
import Groups from '../../components/Misc/Groups/Groups';
import InstantCalculate from '../../components/Misc/InstantCalculate/InstantCalculate';
import Settings from '../../components/Misc/Settings/Settings';
import PlanExpense from '../../components/Misc/PlanExpense/PlanExpense';

const DashBoardContent = () => {
  const tabSelect = useSelector(state=>state.tabSelect);

  const TabContent = () =>{
    switch(tabSelect){
      case 'Expenses': return <Expenses />;
      case 'Groups': return <Groups />;
      case 'InstantCalculate': return <InstantCalculate />;
      case 'PlanExpense': return <PlanExpense />
      case 'Settings': return <Settings />;
      default: return <OverView />;
    }
  }

  return (
    <React.Fragment>{TabContent()}</React.Fragment>
  )
}

export default DashBoardContent