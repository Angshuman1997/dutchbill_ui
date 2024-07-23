import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/SideBar/SideBar";
import DashBoardContent from "./DashBoardContent";
import "./Dashboard.css";

const Dashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

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
          <Sidebar />
        </div>
        <div className="dashboard-content">
          <DashBoardContent />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
