import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/SideBar/SideBar";
import DashBoardContent from "./DashBoardContent";
import AddExpense from "../../components/AddExpense/AddExpense";
import "./Dashboard.css";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { setTabSelect, setUserData } from "../../redux/actions/actionTypes";
import { fetchUserCreds } from "../../api/apiFunc";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const expenseTypes = [
  { expenseType: "Food" },
  { expenseType: "Shopping" },
  { expenseType: "Movie" },
  { expenseType: "Travel" },
  { expenseType: "Borrow" },
  { expenseType: "Others" },
];

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [openAddExpense, setOpenAddExpense] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const tabSelect = useSelector((state) => state.tabSelect);

  const handleOpenAddExpense = () => setOpenAddExpense(true);
  const handleCloseAddExpense = () => setOpenAddExpense(false);

  // Add an effect to handle initial sidebar state based on screen width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setShowSidebar(false);
      } else {
        setShowSidebar(true);
      }
    };

    handleResize(); // Set initial state
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const refreshAction = async () => {
      let flag = true;
      const sessionActiveToken = localStorage.getItem("sessionToken");
      const sessionActiveEmail = localStorage.getItem("userEmail");
      if (sessionActiveToken && sessionActiveEmail) {
        const fetchUser = await fetchUserCreds({
          userEmail: sessionActiveEmail,
        });
        if (fetchUser && fetchUser.status === 200) {
          flag = false;
          dispatch(setUserData(fetchUser));
        }
      }

      if (flag) {
        localStorage.setItem("sessionToken", "");
        localStorage.setItem("userEmail", "");
        toast.info("Session ended please, Re-Login");
        navigate("/");
      }
    };
    refreshAction();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="dashboard-layout">
      <Header />
      <div className="dashboard-container">
        {showSidebar && (
          <div className={`sidebar open`}>
            <Sidebar handleOpenAddExpense={handleOpenAddExpense} />
          </div>
        )}
        <div className="dashboard-content-layout">
          <div className="dashboard-content-title">{tabSelect}</div>
          <div className="dashboard-content">
            <DashBoardContent />
          </div>
        </div>
      </div>
      {!showSidebar && (
        <div className="btns-small-screen">
          <Button
            onClick={() => dispatch(setTabSelect("Summary"))}
            sx={{
              color: "#ffffff",
              background: "transparent",
              border: "2px solid white",
              borderRadius: "2rem",
              width: "6rem",
              height: "2.5rem",
              fontSize: "0.8rem",
              "&:hover": {
                color: "#ffffff",
                background: "transparent",
                border: "2px solid white",
                borderRadius: "2rem",
              },
            }}
          >
            Home
          </Button>
          <Button
            onClick={handleOpenAddExpense}
            sx={{
              background: "#ffffff",
              borderRadius: "5rem",
              width: "2rem",
              height: "4rem",
              color: "black",
              "&:hover": {
                background: "#ffffff",
                borderRadius: "5rem",
              },
            }}
          >
            <AddIcon />
          </Button>
          <Button
            onClick={() => dispatch(setTabSelect("Expenses"))}
            sx={{
              color: "#ffffff",
              background: "transparent",
              border: "2px solid white",
              borderRadius: "2rem",
              width: "6rem",
              height: "2.5rem",
              fontSize: "0.8rem",
              "&:hover": {
                color: "#ffffff",
                background: "transparent",
                border: "2px solid white",
                borderRadius: "2rem",
              },
            }}
          >
            Expenses
          </Button>
        </div>
      )}
      <AddExpense
        open={openAddExpense}
        onClose={handleCloseAddExpense}
        expenseTypes={expenseTypes}
      />
    </div>
  );
};

export default Dashboard;
