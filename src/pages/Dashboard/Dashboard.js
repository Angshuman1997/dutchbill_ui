import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/SideBar/SideBar";
import DashBoardContent from "./DashBoardContent";
import AddExpense from "../../components/AddExpense/AddExpense";
import "./Dashboard.css";
import { toast } from "react-toastify";

// pass From API
const persons = [
  { name: "Alice", personId: "alice1" },
  { name: "Bob", personId: "bob2" },
  { name: "Charlie", personId: "charlie3" },
];

const group = [
  { groupName: "BTM Team", groupId: "1234" },
  { groupName: "School", groupId: "0987" },
  { groupName: "College", groupId: "5637" },
];

const userId = "ab123";

const expenseTypes = [
  { expenseType: "Food" },
  { expenseType: "Shopping" },
  { expenseType: "Movie" },
  { expenseType: "Travel" },
  { expenseType: "Borrow" },
  { expenseType: "Others" },
];

const Dashboard = () => {
  const [openAddExpense, setOpenAddExpense] = useState(false);
  const [addExpenseData, setAddExpenseData] =  useState(null);
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const handleOpenAddExpense = () => setOpenAddExpense(true);
  const handleCloseAddExpense = () => setOpenAddExpense(false);
  const handleDataAddExpense = (data) => setAddExpenseData(data);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  useEffect(()=>{
    if(addExpenseData) {
      console.log("hi", addExpenseData)
      toast.success("Expense Added");
      setAddExpenseData(null);
    }
  }, [addExpenseData]);

  // Add an effect to handle initial sidebar state based on screen width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    handleResize(); // Set initial state
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="dashboard-layout">
      <Header />
      <div className="dashboard-container">
        <button className="toggle-button" onClick={toggleSidebar}>
          {isSidebarOpen ? "Close Sidebar" : "Open Sidebar"}
        </button>
        <div className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
          <Sidebar handleOpenAddExpense={handleOpenAddExpense} />
        </div>
        <div className="dashboard-content">
          <DashBoardContent />
        </div>
      </div>
      <AddExpense
        open={openAddExpense}
        onClose={handleCloseAddExpense}
        persons={persons}
        expenseTypes={expenseTypes}
        userId={userId}
        group={group}
        addExpense={handleDataAddExpense}
      />
    </div>
  );
};

export default Dashboard;
